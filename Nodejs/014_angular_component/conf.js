// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
    binary: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    args: [],
    extensions: [],
    }
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['test/*.js'],

  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
}
