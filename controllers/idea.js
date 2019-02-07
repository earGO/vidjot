const mongoose = require('mongoose')

require('../models/Idea')

const Idea = mongoose.model('ideas'),

    addIdea = function (req,res) {
    res.render('ideas/add')
},

    postIdea = function(req,res) {
        let errors = [];
        if (!req.body.title) {
            errors.push({text: 'please add some title'})
        }
        if (!req.body.details) {
            errors.push({text: 'please add some details'})
        }
        if (errors.length > 0) {
            res.render('ideas/add', {
                errors: errors,
                title: req.body.title,
                details: req.body.details
            })
        } else {
            const newIdea = {
                title: req.body.title,
                details: req.body.details
            }
            new Idea(newIdea)
                .save()
                .then(idea => {
                    console.log(idea)
                    res.redirect('/ideas')
                })
        }
    },

    ideas = function (req,res) {
    Idea.find({})
        .sort({date:'desc'})
        .then((ideas)=>{
                res.render('ideas/ideas',{
                    ideas:ideas
                });
        })
        .catch(err=>{
        console.log('error fetching ideas from Mongodb\n',err)
    })
    },

    editIdea = function (req,res) {
    Idea.findOne({
        _id:req.params.id})
        .then(idea=>{
            console.log(idea)
            res.render('ideas/edit',{
                idea:idea
            })
        })
    },

    updateIdea = function (req,res) {
        Idea.findOne({
            _id:req.params.id
        })
            .then(idea=>{
                idea.title = req.body.title;
                idea.details = req.body.details;
                idea.save()
                console.log(idea)
            })
            .then(idea=>{
                res.redirect('/ideas')
            })
    },
    deleteIdea = function (req,res) {
        Idea.remove({
            _id:req.params.id
        })
            .then(idea=>{
                res.redirect('/ideas')
            })
    }

module.exports={
    addIdea,
    postIdea,
    ideas,
    editIdea,
    updateIdea,
    deleteIdea
};