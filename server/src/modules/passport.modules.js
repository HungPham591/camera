const GoogleStrategy = require('passport-google-oauth20').Strategy;

const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_secret;
const REDIRECT_URI = process.env.redirect_uris;

exports.setupPassport = (passport) => {
    passport.serializeUser((profile, done) => {
        done(null, profile);
    });

    passport.deserializeUser((profile, done) => {
        done(null, profile);
    });
    passport.use(
        new GoogleStrategy(
            {
                clientID: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                callbackURL: REDIRECT_URI,
                passReqToCallback: true
            },
            (req, accessToken, refreshToken, profile, done) => {
                console.log(refreshToken);
                return done(null, null);
            }
        )
    );

}