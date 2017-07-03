var config = require('../../nightwatch.conf.BASIC.js');

module.exports = {
  'Page Title': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .assert.title('FogLAMP Admin Dashboard')
      .saveScreenshot('page-title-test.png')
      .end();
  },

  'Success Login': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .setValue('input[type=text]', 'user')
      .setValue('input[type=password]', 'password')
      .click('button[name=login-btn]')
      .waitForElementVisible('.nav-item div b')
      .assert.containsText('.nav-item div b', 'Welcome')
      .saveScreenshot('success-login-test.png')
      .end();
  },

  'Unsuccessful Login': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .setValue('input[type=text]', 'user')
      .setValue('input[type=password]', 'wrongpassword')
      .click('button[name=login-btn]')
      .waitForElementVisible('.notification.is-danger ul li')
      .assert.containsText('.notification.is-danger ul li', 'Authentication failed')
      .saveScreenshot('unsuccessful-login-test.png')
      .end();
  }
};
