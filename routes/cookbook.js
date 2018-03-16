const express = require('express');
const router = express.Router();

const Cookbook = require('../server/db/models/Cookbook');



router.route('/:userId/:recipeId')

  .delete((req, res) => {
    let user_id = req.params.userId;
    let recipe_id = req.params.recipeId;
    return new Cookbook()
      .where({ user_id: user_id, recipe_id: recipe_id })
      .destroy()
      .then(result => {
        console.log('Deleted!');
      })
      .catch(err => {
        console.log({ err: err.message });
        return res.json({ err: err.message });
      })
  })


router.route(`/:userId`)
  .get((req, res) => {

    let id = req.params.userId;
    return new Cookbook()
      .where({ id: id })
      .fetch({withRelated:['users','recipes']})
      .then(result => {
        return res.json(result.toJSON());
      })
      .catch(err => {
        console.log({ err: err.message });
      })

  })

module.exports = router;