const passport = require('passport');
const passportjwt = require('passport-jwt');
const {Strategy, ExtractJwt} = passportjwt;

module.exports = app =>{

    const params = {
        secretOrKey: process.env.authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params,(payload, done)=>{

        app.db("users")
            .where({id: payload.id})
            .first()
            .then(user => done(null, user ? {...payload} : false ))
            .catch(err => done(err,false))
    })

    passport.use(strategy)

    return {

        authenticate: () => passport.authenticate('jwt',{session: false})

    }

}