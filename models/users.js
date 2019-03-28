// bring in database connection
const db = require('./conn');
const bcrypt = require('bcryptjs');
const ReviewsInClass = require('./reviews-inclass');
const Favorites = require('./favorites');
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

    static getAll() {
        return db.any(`select * from users`);
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

    setPassword(newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;

    }

    checkPassword(enteredPassword) {
        // this.password is where the hash is stored
        const isCorrect = bcrypt.compareSync(enteredPassword, this.password);
        return isCorrect;

    }



    // instance of User should be able to get their reviews
    getReviews() {
        // uses the user ID of the User instance that is calling this
        return db.any(`
        select * from reviews
        WHERE user_id=${this.id}   
        `).then(function(arrayOfReviews) {
            const arrayOfReviewInstances = [];
            arrayOfReviews.forEach(reviewData => {
                const newInstance = new ReviewsInClass(reviewData.id, reviewData.score, reviewData.content, reviewData.restaurant_id, reviewData.user_id);

                arrayOfReviewInstances.push(newInstance);
            })

            return arrayOfReviewInstances;

        })
    }

    getFavorites() {
        return db.any(`
        select * from favorites
        where user_id=${this.id}       
        `)
        .then(userFavoritesData => {
            // initialize empty array of instances
            const userInstancesFavoritesArray = [];

            userFavoritesData.forEach(favoriteData => {
                // create new instance of Favorites with the data from SQL query
                const newInstance = new Favorites(favoriteData.id, favoriteData.user_id, favoriteData.restaurant_id);
                // push that new instance to our array of instances, which will be returned
                userInstancesFavoritesArray.push(newInstance);
            });
            // return array of instances
            return userInstancesFavoritesArray;
        })
    }

    setFavorite(restId) {
        return db.result(`
        INSERT INTO favorites(user_id, restaurant_id)
        VALUES
        (${this.id}, ${restId});
        `)
    }
    // deletes anything matching criteria 
    deleteFavorite(restId) {
        return db.result(`
        DELETE FROM favorites
        WHERE restaurant_id=${restId};
        `)
    }


}


module.exports = User;

// export User model
