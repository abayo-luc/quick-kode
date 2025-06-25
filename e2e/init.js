const config = require('../.detoxrc.js');

beforeAll(async () => {
  await detox.init(config, { launchApp: true });
  //await device.launchApp()
    //{
  //   newInstance: true,
  //   permissions: { notifications: 'YES' },
  //   launchArgs: { 
  //     detoxPrintBusyIdleResources: 'YES',
  //     detoxDebugVisibility: 'YES'
  //   },
  //   launchTimeout: 120000, // 2 minutes
  // }

}, 180000); // 3 minutes for beforeAll