// bring in the database connection
const db = require('./conn');

class Favorite {
    constructor(id, user_id, restaurant_id) {
        this.id = id;
        this.userId = user_id;
        this.restaurantId = restaurant_id;
    }

    // given user id, create instance of Favorite
    static getByUserId(id) {
        // getting raw data from database
        return db.any(`
        select * from favorites
        where user_id=${id}       
        `)
        .then(favoritesData => {
            const arrayOfFavoriteInstances = [];

            favoritesData.forEach(favorite => {
                const newInstance = new Favorite(favorite.id, favorite.user_id, favorite.restaurant_id);
                arrayOfFavoriteInstances.push(newInstance);
            })
            return arrayOfFavoriteInstances;
        })
    }
}

module.exports = Favorite;