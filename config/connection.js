// require mongoose 
const { connect, connection } = require('mongoose');

// connect to local instance of MongoDB, including database name
const connectionString = 
process.env.MONGODB_URI || 'mongodb://localhost:27017/twitter-ishDB';
// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;