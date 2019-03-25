// first require pg promise
// call it immediately, which gives us configured database connector
const pgp = require('pg-promise')();
const options = {
    host: 'localhost',
    database: 'restaurants-app'
}

// make a connection to the database, specified by the options object
const db = pgp(options);

module.exports = db;