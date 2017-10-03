const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require('./config');
const bodyParser = require("body-parser");
const passport = require('passport');
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
const authCheckMiddleware = require('./middleware/auth-check');//manual middleware
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//passport middleware declared
app.use(passport.initialize());
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
app.use('/user', authCheckMiddleware);

//body parser middleware declared
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

const authRoutes = require("./controllers/auth.js");
const userRoutes = require("./controllers/user.js");
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || config.dbUri,
  {
    useMongoClient: true
  }
);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
