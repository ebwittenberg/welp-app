// establish connection to database
const db = require('./conn');

// create Review class

class Review {
    constructor(id, score, content, restaurant_id, user_id) {
        this.id = id;
        this.score = score;
        this.content = content;
        this.restaurant_id = restaurant_id;
        this.user_id = user_id
    }

    // this will create a review instance based on info from restaurant
    static getByRestaurantId(restId) {
        return db.any(`
        select * from reviews
        WHERE restaurant_id = ${restId};
        `)
        // now create a new instance of Review
        .then(reviewData => {

            let reviewInstances = [];
            reviewData.forEach(review => {

                const reviewInstance = new Review(review.id, review.score, review.restaurant_id, review.user_id);

                reviewInstances.push(reviewInstance);
            })
            return reviewInstances;
        })
    }

    static getAverageByRestaurantName(restName) {
        return db.any(`
        select revs.score from reviews revs
        INNER JOIN restaurants rests
        ON rests.id = revs.restaurant_id
        WHERE rests.name = '${restName}';
        `)
        // now create a new instance of Review
        .then(reviewData => {
            let allScores = [];
            reviewData.forEach(reviewScore => {
                allScores.push(reviewScore.score);
            })
            const sum = allScores.reduce(function(accumulator, reducer) {
                return accumulator + reducer;
            })
            const average = sum / allScores.length;
            return average;
        })
    }
}

module.exports = Review;