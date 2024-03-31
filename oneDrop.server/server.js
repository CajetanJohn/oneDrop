// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { connectDb, disconnectDb, sessionStore } = require('./mongodb/connect');

//session code
const session = require('express-session');
const cookieParser = require('cookie-parser');

//api functions
const fetchMusicRequestRoute = require('./apiActions/routes/get/fetchMusicRequest');
const loginUserRoute = require('./apiActions/routes/get/signIn');
const signUpUserRoute = require('./apiActions/routes/post/signUp');
const uploadFileRoute = require('./apiActions/routes/post/uploadFile');
const songsRoute = require('./apiActions/routes/post/songs');
const createEvent = require('./apiActions/routes/post/createEvent');
const findEvent = require('./apiActions/routes/get/findEvent');
const addGuest = require('./apiActions/routes/post/addGuest');
const findGuest = require('./apiActions/routes/get/findGuest');
const logout = require('./apiActions/routes/post/logout');

const checkSession = require('./middleware/checkSession')

const bodyParser = require('body-parser');





const app = express();
app.use(bodyParser.urlencoded({extended:true}))
const server = http.createServer(app);


const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Use cors middleware
app.use(cors());
// Add JSON parsing middleware
app.use(express.json());

app.use(cookieParser())


//session establishment
app.use(
  session({
    key:'user_sid',
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store:sessionStore,
    cookie: {
      expires: 18 * 60 * 60 * 1000, // 18 hours in milliseconds
      secure: false, // Set to true if using HTTPS
    },
  })
);

// Connect to MongoDB
const databaseName = 'zone';
connectDb(databaseName);

// API endpoint to initiate socket connection
app.use('/fetchMusicRequests',fetchMusicRequestRoute(io));
app.use('/signup', signUpUserRoute);
app.use('/login', loginUserRoute);
app.use('/upload', checkSession, uploadFileRoute);
app.use('/song',checkSession, songsRoute);
app.use('/createEvent', createEvent);
app.use('/findEvent', findEvent);
app.use('/addGuest',checkSession, addGuest);
app.use('/findGuest',checkSession, findGuest);
app.use('/logout', logout)

// Enable CORS for all routes
app.use(cors());

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Disconnect from MongoDB on server exit
process.on('exit', () => {
  disconnectDb();
});








