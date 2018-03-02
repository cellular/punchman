const path = require('path');
const punchman = require('./punchman');

const resolve = file => path.resolve(__dirname, file);

module.exports = Object.assign({}, punchman.config.jest, {
  rootDir: punchman.testDir,
  globalSetup: resolve('setup.js'),
  globalTeardown: resolve('teardown.js'),
  setupTestFrameworkScriptFile: path.resolve(
    __dirname,
    'setupTestFramework.js'
  ),
  testEnvironment: resolve('PunchmanEnvironment.js'),
  watchPlugins: [resolve('PunchmanWatchPlugin.js')],
});
