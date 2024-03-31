const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userModel = require('../models/userModel'); 

// Cargar las variables de entorno desde config.js o directamente
const { jwtSecret } = require('../config'); 

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret, 
};

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await userModel.findById(jwt_payload.sub);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

module.exports = passport;