const db = require('./conn')

db.any('select * from users')
    .then(function(data) {
        // success;
        console.log(data);
    })
    .catch(function(error) {
        // error;
        console.log(error);
    });