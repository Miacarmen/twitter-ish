// require mongoose 
const { connect, connection } = require('mongoose');

// connect to local instance of MongoDB, including database name
const connectionString = 
process.env.MONGODB_URI || 'mongodb://localhost:27017/twitter-ishDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;