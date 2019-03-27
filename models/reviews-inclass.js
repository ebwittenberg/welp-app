const db = require('./conn');

class ReviewsInClass {

    constructor(id, score, content, restaurant_id, user_id) {
        this.id = id;
        this.score = score;
        this.content = content;
        this.restaurantId = restaurant_id;
        this.userId = user_id;
    }

    static getById(id) {
        return db.one(`
        select * from reviews
        WHERE id=${id};
        `)
        .then(reviewData => {
            return new ReviewsInClass(reviewData.id, reviewData.score, reviewData.content, reviewData.restaurant_id, reviewData.user_id);
        })
    }

    static getAll() {
        return db.any(`
        select * from reviews;     
        `)
        .then(arrayOfReviews => {
            // console.log(arrayOfReviews);
            return arrayOfReviews.map(function(reviewData) {
                return new ReviewsInClass(reviewData.id, reviewData.score, reviewData.content, reviewData.restaurant_id, reviewData.user_id);
            });
        })
    }
}

// ReviewsInClass.getById(3);


module.exports = ReviewsInClass;