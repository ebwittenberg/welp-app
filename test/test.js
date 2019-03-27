// const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const User = require('../models/users');
const Restaurant = require('../models/restaurants');
const Reviews = require('../models/reviews');

describe('Users model', () => {
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
            .then(async report => {
                // console.log(report);
                const theUpdatedUser = await User.getById(2);
                expect(theUpdatedUser.email).to.equal('newemail@new.com');
            })
        // re-grab the user, expect the email to be equal to the new value
    });
})

// add a describe block for restaurants
describe('Restaurants model', () => {
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
describe('Reviews model', () => {
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
})

