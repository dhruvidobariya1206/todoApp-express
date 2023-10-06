const cron = require('node-cron');
const { get5DaysTodo } = require('../components/todo/service')

const schedule = cron.schedule(' */5 * * * * *', async () => {
    console.log('cron job schedular');
    try{
        const emails = await get5DaysTodo();
        console.log(emails);
    }
    catch(error) {
        next(error);
    }
});

module.exports = { schedule };