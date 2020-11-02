const { exec } = require("child_process");
const mongoose = require('mongoose');
var stringconnect;
const config = {
    host: 'localhost',
    db: 'admin',
    user: 'root',
    pass: 'example'
};
if (process.env.NODE_ENV === 'production') {
    stringconnect = process.env.MONGODB_URI
} else {
    stringconnect = `mongodb://${config.user}:${config.pass}@${config.host}/${config.db}`
}
console.log(stringconnect)
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