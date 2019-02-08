const express = require('express'),
    router = express.Router(),

    idea = require('../controllers/idea');

//Ideas index pages
router.get('/',idea.ideas);

//Add Idea Form
router.get('/add',idea.addIdea);

//Edit Idea Form
router.get('/edit/:id',idea.editIdea);

//edit form process
router.put('/:id',idea.updateIdea)

//delete Idea
router.delete('/:id',idea.deleteIdea)

//create Idea
router.post('/',idea.postIdea)

module.exports = router;