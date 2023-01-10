import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { usuariosDao } from '../daos/factoryDao.js';

const keyJwt = process.env.PRIVATE_KEY || 'miclavesecreta'

const cookieExtractor = function (req) {
  let token = null; 
  if (req && req.cookies) token = req.cookies['access_Token']
  return token;
};
const opts = {
  jwtFromRequest : cookieExtractor,
  secretOrKey : keyJwt
}
const strat = new JwtStrategy(opts, async (jwt_payload, done) =>{
  try {
    const user = await usuariosDao.getbyField({email: jwt_payload.data[0].email})
    if(!user) return done(null, false)
      return done(null, user[0])
  } catch (error) {
    console.log('fallo la estrategia')
  }
})  
passport.use('login', strat)

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) =>{
  const user = await usuariosDao.getbyField({_id: id})
  done(null, user)
})

export default passport