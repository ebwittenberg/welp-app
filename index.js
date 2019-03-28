const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Import my model class
const Restaurant = require('./models/restaurants');
const User = require('./models/users');

// 'helper function' === 'middleware'
// aka "request handler"
const server = http.createServer(async (req, res) => {

    const method = req.method;

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

        if (method === "GET") {

            if (parts.length === 3) {
    
                const id = parts[2];
                const aUser = await User.getById(id);
                const aUserJSON = JSON.stringify(aUser);
                res.end(aUserJSON);
    
            } else if (parts.length === 2) {
                const allUsers = await User.getAll();
                const allUsersJSON = JSON.stringify(allUsers);
                res.end(allUsersJSON);
            } else {
                res.statusCode = 404;
                res.end('Resource not found');
            }

        } else if (method === "POST") {
            res.end('{message: "sounds like you would like to create"}');
        } else if (method === "PUT") {
            res.end('{message: "you want to update"}');
        } else if (method === "DELETE") {
            res.end('{message: "you want to delete (remove the user)"}');
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