const { CronJob } = require("cron");

// 5 0 * * *

module.exports = {
  schedule: (expression, func) => {
    const job = new CronJob(expression, func, null, true);
    return job;
  }
};
