const { get5DaysTodo } = require('./todo/service');
const { transporter } = require('../lib/nodeMailer');
require('dotenv').config({path: '../../.env'});


const sendMail = async (todo) => {
    const mail = {
        from: process.env.SMTP_EMAIL,
        to: todo.email,
        subject: 'Todo Reminder',
        html: `Dear user,<br> Your task titled ${todo.title} is pending.`
    };
    transporter.sendMail(mail, (err, info) => {
        if(err) {
            console.log(err);
        }
        // else{
        //     // console.log(info.messageId);
        // }
    })
    
}

module.exports = {
    getEmails : async() => {
        // console.log('cron job schedular');
        try{
            const todos = await get5DaysTodo();
            // console.log(emails);
            todos.forEach(todo => {
                sendMail(todo);
            });
        }
        catch(error) {
            console.log(error);
        }
    },
}

