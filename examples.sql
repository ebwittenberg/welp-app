-- Example queries
-- User Profile
-- Favorited restaurants: Search for specific user ID in favorites, find all matches. That then gets passed to restaurants to get the restaurant names
-- Reviewed restaurants: Pass user ID through reviews table, output content, score, and also get restaurant name from restaurants table
-- Restaurant Profile
-- Total reviews: Take restaurant ID, pass through to reviews table, return count of that restaurant ID
-- Average review: Take restaurant ID, pass through to reviews table, take sum of scores, divide by number of reviews

-- user profile queries below
select * from users;
select concat(usrs.first_name, ' ', usrs.last_name) as user, rests.name, revs.score, revs.content
from users usrs
INNER JOIN reviews revs
ON revs.user_id = usrs.id
INNER JOIN restaurants rests
ON rests.id = revs.restaurant_id;

-- restaurant profile queries below
select * from restaurants;

-- outputs review count for all restaurants
select rests.name, rests.address, count(revs.restaurant_id)
from restaurants rests
INNER JOIN reviews revs
ON revs.restaurant_id = rests.id
GROUP BY rests.name, rests.address;

-- outputs review count for specific restaurant
select count(*) as number_of_reviews, rests.name, revs.restaurant_id
from restaurants rests
INNER JOIN reviews revs
ON revs.restaurant_id = rests.id
WHERE rests.id = 1
GROUP BY rests.name, revs.restaurant_id;

-- output review average for all restaurants
select rests.name, rests.address, SUM(revs.score) / COUNT(revs.score) as average_score, COUNT(distinct revs.score) as total_reviews, COUNT(distinct favs.id) as total_favorites from reviews revs
INNER JOIN restaurants rests
ON rests.id = revs.restaurant_id
INNER JOIN favorites favs
ON rests.id = favs.restaurant_id
GROUP BY rests.name, rests.address;