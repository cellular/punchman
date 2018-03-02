exports.setupPage = function(page) {
  page.pluginLoaded = true;
};

exports.setupTestFramework = function() {
  expect.pluginLoaded = true;
};
