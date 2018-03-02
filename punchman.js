const Url = require('url');
const path = require('path');
const puppeteer = require('puppeteer');
const cosmiconfig = require('cosmiconfig');
const debug = require('debug')('punchman');

const DEFAULT_URL = 'http://localhost:5000';

const result = cosmiconfig('punchman', { sync: true }).load();
const config = result ? result.config : {};
const puppeteerOpts = config.puppeteer || {};
const dir = result ? path.dirname(result.filepath) : '';
const plugins = config.plugins ? config.plugins.map(loadPlugin) : [];
const testDir = path.resolve(dir, config.testDir || 'e2e');
const keepOpen = !puppeteerOpts.headless;
const baseUrl = process.env.SERVER_URL || config.baseURL || DEFAULT_URL;

function loadPlugin(name) {
  const relative = /^\./.test(name);
  const file = relative ? path.resolve(dir, name) : name;
  const plugin = require(file);
  plugin.name = name;
  return plugin;
}

function applyPlugins(hook, target) {
  plugins.filter(plugin => hook in plugin).forEach(plugin => {
    debug(`applying ${plugin.name}.${hook}`);
    plugin[hook](target);
  });
}

let browser;

async function setup() {
  if (browser) return;
  const opts = {
    ignoreHTTPSErrors: true,
    ...puppeteerOpts,
  };
  debug('launching browser', opts);
  browser = await puppeteer.launch(opts);
  applyPlugins('setup');
}

async function open(path) {
  const page = await browser.newPage();
  applyPlugins('setupPage', page);
  const url = Url.resolve(baseUrl, path);
  debug('opening', url);
  await page.goto(url);
  return page;
}

async function setupEnvironment(env) {
  Object.assign(env.global, {
    browser,
    open,
  });
  applyPlugins('setupEnvironment');
}

function setupTestFramework() {
  applyPlugins('setupTestFramework');
}

async function teardownEnvironment() {
  applyPlugins('teardownEnvironment');
}

async function teardown() {
  applyPlugins('teardown');
  if (!keepOpen) await browser.close();
}

module.exports = {
  config,
  testDir,
  setup,
  setupEnvironment,
  setupTestFramework,
  teardownEnvironment,
  teardown,
};
