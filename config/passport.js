const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");
const opts = {};
//jwtFromRequest- Function that accepts a request as the only parameter and returns either the JWT as a string or null. 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//reads the JWT from the http Authorization header with the scheme 'bearer':
//creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
opts.secretOrKey = keys.secretOrKey;
//is a string or buffer containing the secret (symmetric) or PEM-encoded public key
module.exports = passport => {
  passport.use(//Configure Strategy
    new JwtStrategy(opts, (jwt_payload, done) => {//done is a passport error first callback accepting arguments done(error, user, info)
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};