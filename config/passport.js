const LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
        //Load user model
    User = mongoose.model('users');


module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField:'email'},
        (email,password,done)=>{
        //match user
            User.findOne({
                email:email
            }).then((user)=>{
                if(!user) {
                    return done(null, false, {message:'No user found'})
                } else {
                //match password
                    bcrypt.compare(password,user.password
                        ,(err,isMatch)=>{
                        if(err){
                            console.log('error comparing passwords\n',err)
                        }
                        if(isMatch){
                            return done(null,user)
                        }else{
                            return done(null, false, {message:'Wrong password'})
                        }
                    })
                }
            })
        }
    ))
    //more about serialisation on http://www.passportjs.org/docs/
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};