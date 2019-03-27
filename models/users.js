// bring in database connection
const db = require('./conn')
// create User class

// function User(_first_name, _last_name, email, password) {
//     const first_name = _first_name;
//     const last_name = _last_name;


//     this.getUserById() = function(userId) {
//         return db.any(`select * from users where id=${theId}`)
//             .then(data => {
//                 console.log(data);
//             })
//     }
// }

class User {

    // define constructor (this is what all instances will need during creation)
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
    }
    // static means the function is something that the class can do, but an instance cannot
    static getById(id) {
        // .any always returns an array
        return db.one(`select * from users where id=${id}`)
            .then((userData) => {
                const userInstance = new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password);
                console.log(userInstance);
                return userInstance
            })
            .catch(function(error) {
                return null;
            })
    }

    // user should be able to save their own data (it isn't static, it is an instance method). Belongs to the individual instance
    save() {
        // use .result when you might want a report about how many rows got affected
        return db.result(`
        UPDATE users 
        SET
        first_name = '${this.firstName}',
        last_name = '${this.lastName}',
        email = '${this.email}',
        password = '${this.password}'
        where id=${this.id}
        `)
    }

}


module.exports = User;

// export User model
