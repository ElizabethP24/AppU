import passport from "passport";
import {localStrategy} from './strategies/localStrategy.js';
localStrategy();

export default function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser((username, done)=> {
        done(null, username);
    });

    passport.deserializeUser((username, done)=> {
        done(null, username);
    });
}