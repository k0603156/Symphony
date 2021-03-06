const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Models = require("../Models/tables");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
  try {
    // payload:{email,iat=>토큰이 발급 된 시간}
    const { dataValues } = await Models.user.findOne({
      where: {
        email: payload.email,
      },
    });
    return done(null, dataValues);
  } catch (error) {
    return done(error, false);
  }
};

exports.authenticateJwt = (req, res, next) => {
  passport.authenticate(
    "jwt",
    {
      sessions: false,
    },
    (error, user) => {
      if (user) {
        req.user = user;
      }
      next();
    },
  )(req, res, next);
};
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
