const db = require('./conn')

function getuserById(theId) {

    return db.any(`select * from users where id=${theId}`)
    .then(function(data) {
        // success;
        console.log(data);
    })
    .catch(function(error) {
        // error;
        console.log(error);
    });

}

function getUserByIdAwait(theId) {
    let promise = db.any(`select * from users where id=${theId}`);

    return promise;
}

getUserByIdAwait(2);

async function main() {
    let userId = 3;

    const user = await getUserByIdAwait(userId);
    console.log(user);
}

main();







function reviewsAndFavorites() {

    return db.any('select rests.name, rests.address, SUM(revs.score) / COUNT(revs.score) as average_score, COUNT(distinct revs.score) as total_reviews, COUNT(distinct favs.id) as total_favorites from reviews revs INNER JOIN restaurants rests ON rests.id = revs.restaurant_id INNER JOIN favorites favs ON rests.id = favs.restaurant_id GROUP BY rests.name, rests.address;')

}

function findRestaurantAverageScore(restaurant_name) {

    return db.any('select rests.name, rests.address, SUM(revs.score) / COUNT(revs.score) as average_score, COUNT(distinct revs.score) as total_reviews, COUNT(distinct favs.id) as total_favorites from reviews revs INNER JOIN restaurants rests ON rests.id = revs.restaurant_id INNER JOIN favorites favs ON rests.id = favs.restaurant_id GROUP BY rests.name, rests.address;')
        .then(function(response) {
            response.forEach(function(restaurant) {
                if (restaurant.name === restaurant_name) {
                    console.log(`${restaurant_name} average score is : ${restaurant.average_score}`);
                }
            })
        });
}

findRestaurantAverageScore('Ammazza');

async function findRestaurantAverageScoreAwait(restaurant_name) {
    // db.any returns a promise
    let promise = db.any('select rests.name, rests.address, SUM(revs.score) / COUNT(revs.score) as average_score, COUNT(distinct revs.score) as total_reviews, COUNT(distinct favs.id) as total_favorites from reviews revs INNER JOIN restaurants rests ON rests.id = revs.restaurant_id INNER JOIN favorites favs ON rests.id = favs.restaurant_id GROUP BY rests.name, rests.address');

    // once promise is done, save the data in result
    let result = await promise;

    result.forEach(restaurant => {
        if (restaurant.name === restaurant_name) {
            console.log(`Average score: ${restaurant.average_score}`);
        }
    })
}

// findRestaurantAverageScoreAwait('Ammazza');


function getReviewForRestaurant(restaurantId) {

    return db.any(`select count(*) as number_of_reviews, rests.name, revs.restaurant_id from restaurants rests INNER JOIN reviews revs ON revs.restaurant_id = rests.id WHERE rests.id = ${restaurantId} GROUP BY rests.name,
    revs.restaurant_id;`)
}