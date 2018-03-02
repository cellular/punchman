#!/usr/bin/env node

const { run } = require('jest');

run(['-c', require.resolve('../jest.config.js')].concat(process.argv.slice(2)));
