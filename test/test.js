// const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const User = require('../models/users');
const Restaurant = require('../models/restaurants');
const Reviews = require('../models/reviews');
const ReviewsInClass = require('../models/reviews-inclass');
const Favorite = require('../models/favorites');

// add describe block for users
describe('User model', () => {
    // happy path
    it('should be able to retrieve by id', async () => {
        const theUser = await User.getById(3);
        // console.log(theUser.firstName);
        theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    })
    // error catching 😔
    it('should error if no user by id', async () => {
        const theUser = await User.getById(37332928);
        expect(theUser).to.be.null;
    })

    it('should update the user', async () => {
        // grab a user with id 2
        const theUser = await User.getById(2);
        theUser.email = 'newemail@new.com';
        // update the email
        // save the user (won't work yet)
        theUser.save()
            .then(async () => {
                // console.log(report);
                const theUpdatedUser = await User.getById(2);
                expect(theUpdatedUser.email).to.equal('newemail@new.com');
            })
        // re-grab the user, expect the email to be equal to the new value
    });
    it('should encrypt the password', async () => {
        // get a user with id 1
        const theUser = await User.getById(1);
        // set their password field to "bacon", and encrypte it
        theUser.setPassword("bacon");
        // compare their password to "bacon"
        expect(theUser.password).not.to.equal("bacon");
        // it should be false
    })

    it('should be able to check for correct passwords', async () => {
        // get a user with id 1
        const theUser = await User.getById(1);
        // set their password field to "bacon", and encrypte it
        theUser.setPassword("bacon");
        // save them to the database
        await theUser.save();
        // get them back out of the database
        const theUpdatedUser = await User.getById(1);
        // ask them if their password is "bacon"
        const isCorrectPassword = theUpdatedUser.checkPassword("bacon");
        expect(isCorrectPassword).to.be.true;

        const isNotCorrectPassword = theUpdatedUser.checkPassword("tofu");
        expect(isNotCorrectPassword).to.be.false;
    })
})

// add a describe block for restaurants
describe('Restaurant model', () => {
    it('should be able to grab an array of restaurants', async () => {
        const restaurantArray = await Restaurant.getAll();
        // console.log(restaurantArray);
        expect(restaurantArray).to.be.instanceOf(Array);
    });


    it('should be able to return a specific restaurant by id', async () => {
        const theRestaurant = await Restaurant.getById(3);
        expect(theRestaurant).to.be.instanceOf(Restaurant);
    })



    it('should be able to return a specific restaurant when searched by name', async () => {
        const theRestaurant = await Restaurant.getByName('Ammazza');
        expect(theRestaurant).to.be.instanceOf(Restaurant);
    });



    it('An instance of Restaurant should be able to see number of reviews', async () => {
        const theRestaurant = await Restaurant.getById(3);
        // console.log(theRestaurant);
        const numberOfReviews = await theRestaurant.getReviewCount();
        expect(Number(numberOfReviews.count)).to.be.a('number');
    });


    it('A restaurant should be able to update its info', async () => {
        const theRestaurant = await Restaurant.getById(5);
        theRestaurant.address = '1234 Piedmont Rd NW, Atlanta, GA 30324';
        theRestaurant.save(5)
        .then(async () => {
            const updatedRestaurant = await Restaurant.getById(5);
            expect(updatedRestaurant.address).to.equal('1234 Piedmont Rd NW, Atlanta, GA 30324');
        })


    })
});

// adds describe block for reviews
describe('Review model', () => {
    it('should show all reviews and review details for specific restaurant', async () => {
        // gets all reviews by restaurant ID
        const reviews = await Reviews.getByRestaurantId(3);
        reviews.forEach(review => {
            // console.log(review);
            expect(review).to.be.instanceOf(Reviews);
        })
    })

    it('should show average score for restaurant given restaurant name', async () => {
        const reviews = await Reviews.getAverageByRestaurantName('Ammazza');
        expect(reviews).to.be.a('number');

    })

    // shows 10 most recent reviews for any restaurants
    // 
});

describe('Review model - in class', () => {
    // Can I get one review?
    it('should be able to retrieve a review by ID', async () => {
        // dream 
        const theReview = await ReviewsInClass.getById(4);
        expect(theReview).to.be.instanceOf(ReviewsInClass);
    });
    // Can I get all reviews?
    it('should be able to retrieve all reviews', async () => {
        const aBunchOfReviews = await ReviewsInClass.getAll();
        expect(aBunchOfReviews).to.be.instanceOf(Array);
        // and make sure each of them is an array
        for (let i = 0; i < aBunchOfReviews.length; i++) {
            // exception won't get swalled by a regular for loop, but might by the forEach
            expect(aBunchOfReviews[i]).to.be.instanceOf(ReviewsInClass);
        }

    });
});

describe('Users and Reviews', function() {
    it('A user instance should be able to retrieve all their reviews', async function() {
        // dream code
        // grab user by ID
        const theUser = await User.getById(5);
        // then get all their reviews
        const theReviews = await theUser.getReviews();
        // confirm that their reviews are in an array
        expect(theReviews).to.be.instanceOf(Array);
        // and that the array is the correct length
        expect(theReviews).to.have.lengthOf(2);
        // and that each one is an instance of Review
        for (let i=0; i < theReviews.length; i++) {
            expect(theReviews[i]).to.be.instanceOf(ReviewsInClass);
        }

    })
})

describe('Favorite model', () => {
    it('should get all favorites given a user id', async () => {

        const userFavorites = await Favorite.getByUserId(3);
        expect(userFavorites).to.be.instanceOf(Array);

        userFavorites.forEach(favorite => {
            expect(favorite).to.be.instanceOf(Favorite);
        })

    })
})

describe('Users and Favorites', () => {
    it('should allow user to get all their favorites given their id', async () => {
        // create new instance of User by id
        const theUser = await User.getById(3);
        // use instance of User to get that particular user's favorites
        const userFavorites = await theUser.getFavorites();
        expect(userFavorites).to.be.instanceOf(Array);
        userFavorites.forEach(favorite => {
            expect(favorite).to.be.instanceOf(Favorite);
        })
    })

    it('should allow user to set particular restaurant as a favorite', async () => {
        // create new instance of User by id
        const theUser = await User.getById(3);
        const userFavorites = await theUser.getFavorites();
        // store number of current favorites in a variable
        const currentNumberOfFavorites = userFavorites.length;
        // instance of User should be able to create a new favorite restaurant based on restaurant id (4 is rest id)
        await theUser.setFavorite(4);

        const updatedUserFavorites = await theUser.getFavorites();
        // check if number of favorites is different from old number of favorites
        expect(updatedUserFavorites.length).not.to.equal(currentNumberOfFavorites);

    });
    it('should allow user to unset a particular restaurant as a favorite', async () => {
        const theUser = await User.getById(3);

        const userFavorites = await theUser.getFavorites();
        const currentNumOfFavs = userFavorites.length;

        await theUser.deleteFavorite(4);

        const updatedUserFavs = await theUser.getFavorites();

        expect(updatedUserFavs.length).not.to.equal(currentNumOfFavs);


    })


})
