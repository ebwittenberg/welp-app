const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Import my model class
const Restaurant = require('./models/restaurants');
const User = require('./models/users');

// 'helper function' === 'middleware'
// aka "request handler"
const server = http.createServer(async (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');

    // if req.url is "/restaurants", send them all restaurants
    // if req.url is "/users", send them all users
    // else if it doesn't match either, send a welcome message

    if (req.url === "/restaurants") {
        const allRestaurants = await Restaurant.getAll();
        const restaurantJSON = JSON.stringify(allRestaurants);
        res.end(restaurantJSON);
    } else if (req.url.startsWith("/users")) {
        // /users/3
        const parts = req.url.split('/');
        console.log(parts);
        if (parts.length === 3) {

            const id = parts[2];
            console.log(id.length);
            if (id.length > 0) {
                const aUser = await User.getById(id);
                const aUserJSON = JSON.stringify(aUser);
                res.end(aUserJSON);
            } else {
                const allUsers = await User.getAll();
                const allUsersJSON = JSON.stringify(allUsers);
                res.end(allUsersJSON); 
            }
        } else if (parts.length === 2) {
            const allUsers = await User.getAll();
            const allUsersJSON = JSON.stringify(allUsers);
            res.end(allUsersJSON);
        } else {
            res.statusCode = 404;
            res.end('Resource not found');
        }
    }
    else {
        res.end(`{
            message: "Thank you for your patronage."
        }`)
    }


});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});