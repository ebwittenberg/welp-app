-- users, restaurants, reviews, favorites

-- create users
INSERT into users (first_name, last_name, email, password)
VALUES 
('Eric', 'Mauldin', 'emauldin@email.com', 'koa'),
('Eric', 'Wittenberg', 'ewittenberg@email.com', 'mav'),
('Caitie', 'Cirou', 'kcirou@email.com', 'koa2'),
('Maddie', 'Cohen', 'mfc@bu.edu', 'phd'),
('David', 'Byrne', 'dbyrne@th.com', 'pyschokiller');

DELETE FROM users where id > 5;

ALTER TABLE restaurants
ADD city varchar(200);

--create restaurants
INSERT INTO restaurants (name, address, street, state, phone, menu, picture, city)
VALUES
('JR Crickets', '129 North Ave NE, Atlanta, GA 30328', '129 North Ave NE', 'GA', '4043899464', 'https://www.sportsbaratlantaga.com/menu/', 'https://www.revlocal.com/f/278551', 'Atlanta'),
('Ammazza', '591 Edgewood Ave SE, Atlanta, GA 30312', '591 Edgewood Ave SE', 'GA', '4048352298', 'https://ammazza.com/food/', 'https://ammazza.com/wp-content/uploads/2018/08/Ammazza_A_Logo-WEBLEGACY.png', 'Atlanta'),
('Bell Street Burritos', '112 Krog St NE Suite 1A, Atlanta, GA 30307', '112 Krog St NE','GA', '6787329122', 'https://www.bellstreetburritos.com/menu', 'https://static1.squarespace.com/static/5375166ce4b02c5d204f311f/t/570ff5462fe1311a2477c737/1539362344046/?format=1500w', 'Atlanta'),
('Chipotle', '3424 Piedmont Rd NE, Atlanta, GA 30305', '3424 Piedmont Rd NE', 'GA', '4048697921', 'https://www.chipotle.com/nutrition-calculator.html#real-ingredients', 'https://www.chipotle.com/content/dam/chipotle/global-site-design/en/brand/logos/cmg-medallion-logo.svg', 'Buckhead'),
('Golden Eagle', '904 Memorial Dr SE, Atlanta, GA 30316', '904 Memorial Dr SE', 'GA', '4049631703', 'https://static1.squarespace.com/static/585824ec197aeaa5f2d69684/t/5c5b47004785d3da54d17e8a/1549485825046/ge_menu-food_20190206.pdf', 'https://static1.squarespace.com/static/585824ec197aeaa5f2d69684/t/5a0348d653450a590c73a0e0/1510164704230/golden-eagle_logo-cover.png?format=1000w', 'Atlanta');

INSERT INTO reviews (score, content, restaurant_id, user_id)
VALUES
('4', 'Tons of cheese, great pizza, excellent time.', '2', '1'),
('5', 'Wings are great', '1', '2'),
('5', 'Love the steak quesadilla', '3', '3'),
('3', 'Burritos are ok, but very filling.', '4', '4'),
('5', 'It is far out', '5', '5');

INSERT INTO reviews(score, content, restaurant_id, user_id)
VALUES
('3', 'Wings are ok', '1', '5');

INSERT INTO favorites (user_id, restaurant_id)
VALUES
('1', '2'),
('2', '1'),
('3', '3'),
('4', '5'),
('5','4');


