const { exec } = require("child_process");
const mongoose = require('mongoose');

const stringconnect = process.env.MONGODB_URI || 'mongodb://root:example@localhost/admin'
console.log(stringconnect)
mongoose.connect(stringconnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('\n✅ Connected database from mongodb.\n'))
    .catch((error) => console.error(`❌ Connect database is failed with error which is ${error}`))

const cron = require('node-cron');
let dbBackupTask = ''

// let dbBackupTask = cron.schedule('59 23 * * *', () => {
//     exec(`docker exec - i mongo mongodump - u ${config.user} - p ${config.pass} `, (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(` Backup db mongo: ${stderr} `);
//             return;
//         }
//         console.log(` Backup db mongo: $ {stdout} `);
//     });
// });

module.exports = { dbBackupTask, mongoose }