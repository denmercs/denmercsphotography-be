const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      // options for the google strat
      clientID: GOOGLE_API_ID,
      clientSecret: GOOGLE_API_SECRET,
      scope: ["read_public", "read_relationships"],
      callbackURL: "auth/pinterest/redirect",
      state: true
    },
    // passport callback function
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ pinterestId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);
