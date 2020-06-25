const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();//to start express we hv to initialize
// Bodyparser middleware-it resolves the incoming request and allow are in specified form of request and populate request into req.body
app.use(//appilication-level middleware,it executes all requests
  bodyParser.urlencoded({//it is allowing url encoded data-it checks the content type of request to server
    extended: false//it allow the string or array not a object
  })
);
app.use(bodyParser.json());//all request made to application will pass.... and body parser returns a function 
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true }//current url parser doesnot support format
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);//it matches all the request which start with that url 

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));