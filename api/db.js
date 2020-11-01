const { exec } = require("child_process");
const mongoose = require('mongoose');
const config = {
    host: 'localhost',
    db: 'admin',
    user: 'root',
    pass: 'example'
};
const stringconnect = process.env.MONGODB_URI || 'mongodb+srv://25251325:2525132579@cluster0.puuua.mongodb.net/test'
    // setup connect mongodb by mongoose
    // const urli = `mongodb://${config.user}:${config.pass}@${config.host}/${config.db}`
mongoose.connect(stringconnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('✅ Connected database from mongodb.'))
    .catch((error) => console.error(`❌ Connect database is failed with error which is ${error}`))

const cron = require('node-cron');
let dbBackupTask = ''

// let dbBackupTask = cron.schedule('59 23 * * *', () => {
//     exec(`
//         docker exec - i mongo mongodump - u $ { config.user } - p $ { config.pass }
//         `, (error, stdout, stderr) => {
//         if (error) {
//             console.log(`
//         error: $ { error.message }
//         `);
//             return;
//         }
//         if (stderr) {
//             console.log(`
//         Backup db mongo: $ { stderr }
//         `);
//             return;
//         }
//         console.log(`
//         Backup db mongo: $ { stdout }
//         `);
//     });
// });

module.exports = { dbBackupTask }