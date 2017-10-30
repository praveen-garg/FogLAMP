import { FogLAMPPage } from './app.po';

describe('foglampapp App', () => {
  let page: FogLAMPPage;

  beforeEach(() => {
    page = new FogLAMPPage();
  });

  it('Should Display Nav Title', () => {
    page.navigateToHome();
    expect(page.getNavTitle()).toEqual('FogLAMP Management');
  });

  it('Should Display App Status', () => {
    page.navigateToHome();
    expect(page.getAppStatus()).toEqual('service down');
  });

  it('Should Display Config Titles', () => {
    var ConfigTitles = [
      'Sensors and Device Interface',
      'Log Partitioning',
      'Streaming',
      'System Purge',
      'CoAP Device',
      'Scheduler configuration',
      'Device server configuration',
      'Configuration of the Sending Process',
      'Configuration of OMF types',
      'Purge the readings table',
      'Configuration of OMF Translator plugin'
    ];
    page.navigateToConfig();
    for (var ConfigTitle in ConfigTitles) {
      expect(page.getConfigTitles()).toContain(ConfigTitles[ConfigTitle]);
    }
  });

  it('Should Display Scheduled Tasks', () => {
    page.navToScheduledTasks();
    expect(page.getTitleSchedules()).toEqual('Schedules');
    expect(page.getTitleCreateSchedule()).toEqual('Create Schedule');
    expect(page.getTitleTasks()).toContain('Tasks');
  });

  it('Should Display Audits Logs', () => {
    page.navToAuditLogs();
    expect(page.getAuditLogsTitle()).toEqual('Audit Logs');
    expect(page.getSelectTag()).toEqual(2);
    expect(page.getInputTag()).toEqual(2);
  });

  it('Should Display Assets & Readings', () => {
    page.navToAssetReadings();
    expect(page.getAssetsTitle()).toEqual('Assets');
    expect(page.getAssetReadingsTitle()).toEqual('Asset Readings');
  });
});
