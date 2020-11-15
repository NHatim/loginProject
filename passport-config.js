const { Authenticator, authenticate } = require('passport')

const LocalStrat = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
function initialize(passport,getUserByEmail){

    const authenticateUser =(email, password, done) =>{
        const user = getUserByEmail(email)

        if(user == null){
            return done(null, false, {message : `Pas d'email pour cet utilisateur`})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message : `Mauvais mot de passe`})
            }

        }catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrat({ usernameField : 'email'}), authenticateUser);
    passport.serializeUser((user, done) => { });
}   passport.deserializeUser((id, done) => { });

module.exports = initialize