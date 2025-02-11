const jwt =  require("jsonwebtoken");

const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        // put the user id onto the req for future requests to access
        req.userId = userId;
    }
    next();
});

server.start(
    {
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    },
    }, deets => {
        console.log(`Server is now running on port http://localhost:${deets.port}`);
    }
);