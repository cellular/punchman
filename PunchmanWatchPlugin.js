//const punchman = require('./punchman');

// keep browser open
// watch for hot-updates

class PunchmanWatchPlugin {
  getUsageInfo() {
    return null;
  }

  // Old API
  getUsageRow() {
    return { hide: true, key: 0, prompt: '' };
  }
}

module.exports = PunchmanWatchPlugin;
