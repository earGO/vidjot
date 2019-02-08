
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

require('../models/User');

const User = mongoose.model('users');


//contorollers functions
const
    showRegister = function (req,res) {
        res.render('users/register')
    },
    //register form POST method
    register = function (req,res){
        let errors=[]
        if(req.body.password != req.body.confirmPassword){
            errors.push({text:'Passwords do not match'})
        }
        if(req.body.password.length <4){
            errors.push({text:'Password too short'})
        }
        if(req.body.password == req.body.email){
            errors.push({text:'Please do not use email as password'})
        }
        if(errors.length>0){
            res.render('users/register',{
                errors:errors,
                name:req.body.name,
                email:req.body.email
            })
        } else {
            User.findOne({
                email:req.body.email})
                .then(user=>{
                if(user){
                    req.flash('error_msg','User with this email already registered');
                    res.redirect('/users/login')
                } else {
                    let newUser = {
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password
                    }
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) console.log('error hashing password\n',err)
                            else {
                                newUser.password = hash;
                                new User(newUser)
                                    .save()
                                    .then(user=>{
                                        console.log(user)
                                        req.flash('success_msg','Registration successfull! You can login now.')
                                        res.redirect('/users/login')
                                    })
                                    .catch(err=>{
                                        console.log('error adding new user\n',err)
                                    })
                            }
                        });
                    });
                }
            })

        }
    };


module.exports={
    showRegister,
    register
};