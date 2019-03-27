// establish connection to database
const db = require('./conn');

// create Restaurant class

class Restaurant {

    constructor(id, name, address, street) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.street = street;
    }

    static getAll() {
        return db.any(`select * from restaurants`);
    }

    static getById(id) {
        return db.one(`
        select * from restaurants
        WHERE id=${id}
        
        `)
        .then(restaurantData => {
            // create new instance of Restaurant with specific data returned from database
            const restaurantInstance = new Restaurant(restaurantData.id, restaurantData.name, restaurantData.address, restaurantData.street);
            return restaurantInstance;
        })
    }

    static getByName(name) {
        return db.one(`
        select * from restaurants
        WHERE name ILIKE '${name}'
        `)
        .then(restaurantData => {
            const restaurantInstance = new Restaurant(restaurantData.id, restaurantData.name, restaurantData.address, restaurantData.street);
            return restaurantInstance;   
        })
    }

    getReviewCount() {
        return db.one(`
        SELECT COUNT(revs.id)
        from reviews revs
        INNER JOIN restaurants rests
        ON rests.id = revs.restaurant_id
        WHERE rests.id = ${this.id};
        `)
    }

    save(id) {
        return db.result(`
        UPDATE restaurants
        SET name = '${this.name}',
        address = '${this.address}',
        street = '${this.street}'
        WHERE id=${id};
        `)
    }
}
// export Restaurant class

module.exports = Restaurant;

