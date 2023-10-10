const { CronJob } = require("cron");
const { getEmails } = require("../components/schedular");

// 5 0 * * *

module.exports = {
  schedule: new CronJob(
    " */5 * * * * *",
    () => {
      getEmails();
    },
    null,
    true
  ),
};
