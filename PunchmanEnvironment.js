const NodeEnvironment = require('jest-environment-node');
const punchman = require('./punchman');

class PunchmanEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    await punchman.setupEnvironment(this);
  }

  async teardown() {
    await super.teardown();
    await punchman.teardownEnvironment(this);
  }
}

module.exports = PunchmanEnvironment;
