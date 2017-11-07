import { browser, by, element } from 'protractor';

export class FogLAMPPage {
  navigateToHome() {
    return browser.get('/');
  }

  navigateToConfig() {
    return browser.get('/configuration');
  }

  navToScheduledTasks() {
    return browser.get('/scheduled-tasks');
  }

  navToAuditLogs() {
    return browser.get('/audit');
  }

  navToAssetReadings() {
    return browser.get('/assets');
  }

  navToServiceHealth() {
    return browser.get('/services-health');
  }

  navToSettings() {
    return browser.get('/settings');
  }

  getNavTitle() {
    browser.ignoreSynchronization = true;
    return element(by.css('.container .nav-item b')).getText();
  }

  getAppStatus() {
    browser.ignoreSynchronization = true;
    return element(by.css('#app .nav-right span')).getText();
  }

  getConfigTitles() {
    browser.ignoreSynchronization = true;
    return element(by.css('#app app-configuration-manager')).getText();
  }

  getSchedulesTitle() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-scheduled-process .is-parent > div > header p')).getText();
  }

  getCreateScheduleTitle() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-scheduled-process app-create-schedule header p')).getText();
  }

  getTasksTitle() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-scheduled-process app-list-tasks header > div')).getText();
  }

  getAuditLogsTitle() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-audit-log nav small')).getText();
  }

  getAuditLogsSelectTag() {
    browser.ignoreSynchronization = true;
    return element.all(by.css('app-audit-log div:nth-child(1) select')).count();
  }

  getAuditLogsInputTag() {
    browser.ignoreSynchronization = true;
    return element.all(by.css('app-audit-log input')).count();
  }

  getAssetsTitle() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-assets div:nth-child(1) > div > article > h5 > small')).getText();
  }

  getAssetReadingsTitle() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-assets div:nth-child(2) > div > article > h5 > small')).getText();
  }

  getServiceStatusTitle() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-services-health div:nth-child(1) strong')).getText();
  }

  getRefreshButton() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-services-health button')).getText();
  }

  getServiceHealthColNames() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-services-health table tr')).getText();
  }

  getServiceHealthSelectTag() {
    browser.ignoreSynchronization = true;
    return element.all(by.css('app-settings .column div')).count();
  }

  getServiceHealthInputTag() {
    browser.ignoreSynchronization = true;
    return element.all(by.css('app-settings div input')).count();
  }

  getServiceHealthButton() {
    browser.ignoreSynchronization = true;
    return element(by.css('app-settings button')).getText();
  }
}