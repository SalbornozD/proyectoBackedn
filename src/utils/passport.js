// passport.js
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../dao/models/userModel');
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256']
};

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    // Buscar el usuario en la base de datos con el ID extraído del JWT
    const user = await User.findById(jwt_payload.userId);
    if (user) {
      return done(null, user);  // Usuario encontrado
    } else {
      return done(null, false);  // No se encontró el usuario
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
