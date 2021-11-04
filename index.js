const drsService = require('./services/drs.service');

(async () => {
  const result = await drsService.releaseDroneOwnership("9999", ["bob@aol.com", "sue@aol.com"]);
  console.log(result);
})();


