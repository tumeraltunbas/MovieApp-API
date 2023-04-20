import passport from "passport";
import {Strategy} from "passport-google-oauth20";
import User from "../../models/User.js";

const googleStrategy = new Strategy({
    
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/callback"

    },

    //This is what's gonna happen when a user successfully authenticated
    async (accessToken, refreshToken, profile, done) => {
        
        const currentUser = await User.findOne({
            where: {
                googleId: profile.id
            }
        });

        if(currentUser){
            done(null, currentUser)
        }
        else{

            const newUser = await User.create({
                googleId: profile.id,
                firstName: profile.name.givenName, 
                lastName: profile.name.familyName, 
                email: profile.emails[0].value,
                isEmailVerified: profile.emails[0].verified,
                profileImage: profile.photos[0].value
            });

            done(null, newUser);
        }
    }
)

passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

    const user = await User.findByPk(id);

    done(null, user);

});