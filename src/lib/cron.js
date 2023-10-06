const { CronJob } = require('cron');
const { getEmails } = require('../components/schedular');

// 5 0 * * *
const schedule = new CronJob(' */10 * * * * *', () => {
    getEmails();
}, null, true);

module.exports = { schedule };