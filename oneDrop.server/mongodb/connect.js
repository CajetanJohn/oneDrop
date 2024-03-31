/*const mongoose = require('mongoose');
var session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

let user = (clientId) => {
  return user;
};

const sessionStore = new MongoDBStore({
  uri: `mongodb+srv://admin:outspoken@cluster0.skkkxr9.mongodb.net/zone?retryWrites=true&w=majority`,
  collection: 'mySessions'
});

let isConnected = false;

async function connectDb(database) {
  const mongoURI = `mongodb+srv://admin:outspoken@cluster0.skkkxr9.mongodb.net/${database}?retryWrites=true&w=majority`;
  try {
    if (!isConnected) {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoCreate: false, // Set autoCreate to false
      });
      isConnected = true;
      console.log(`Connected to MongoDB database: ${database}`);
    }
    //console.log(mongoose.connection.db);
    return mongoose.connection.db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function disconnectDb() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Disconnected from MongoDB');
  }
}

module.exports = { user, connectDb, disconnectDb, sessionStore };
*/

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

let user = (clientId) => {
  return user;
};

const sessionStore = new MongoDBStore({
  uri: `mongodb://localhost:27017/zone`, // Update to target the "zone" database
  collection: 'mySessions'
});

let isConnected = false;

async function connectDb(database) {
  const mongoURI = `mongodb://localhost:27017/${database}`; // Update to target the "zone" database
  try {
    if (!isConnected) {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoCreate: false, // Set autoCreate to false
      });
      isConnected = true;
      console.log(`Connected to MongoDB database: ${database}`);
    }
    //console.log(mongoose.connection.db);
    return mongoose.connection.db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function disconnectDb() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Disconnected from MongoDB');
  }
}

module.exports = { user, connectDb, disconnectDb, sessionStore };
