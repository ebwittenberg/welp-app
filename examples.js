const db = require('./conn')

db.any('select rests.name, rests.address, SUM(revs.score) / COUNT(revs.score) as average_score, COUNT(distinct revs.score) as total_reviews, COUNT(distinct favs.id) as total_favorites from reviews revs INNER JOIN restaurants rests ON rests.id = revs.restaurant_id INNER JOIN favorites favs ON rests.id = favs.restaurant_id GROUP BY rests.name, rests.address;')
    .then(function(data) {
        // success;
        console.log(data);
    })
    .catch(function(error) {
        // error;
        console.log(error);
    });