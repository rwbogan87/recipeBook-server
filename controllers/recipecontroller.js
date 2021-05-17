var express = require('express');
var router = express.Router();
var sequelize = require('../db');
let auth = require('../middleware/auth');
var Recipe = sequelize.import('../models/recipe');

// test
router.post("/create", auth, (req, res) => {
    Recipe.create({
        name: req.body.recipe.name,
        category: req.body.recipe.category,
        creator: req.body.recipe.creator,
        ingredients: req.body.recipe.ingredients,
        instructions: req.body.recipe.instructions,
        notes: req.body.recipe.notes,
        userEmail: req.user.email
    })
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((err) => res.status(500).json(
            {
                reason: "There was an error creating your recipe :(",
                error: err
            }
        ));
});

router.get("/getall", auth, (req, res) => {
    Recipe.findAll(req.body)
        .then((recipes) => {
            res.status(200).json(recipes);
        })
        .catch((err) => res.status(500).json(
            {
                reason: "There was an error getting your recipes",
                error: err
            }
        ));
});

router.delete("/:id", auth, (req, res) => {
    // console.log(req)
    Recipe.destroy({
        where: {
            id: req.params.id, userEmail: req.user.email
        }
    })
        .then((response) => {
            console.log(response)
            response.status(200).json({
                message: "Successfully removed a recipe",
                rowsUpdated: response
            })
        })
        .catch(err => res.status(401).json({
            message: "There was an issue deleting your recipe",
            error: err
        }))
});

router.put("/:id", auth, (req, res) => {
    Recipe.update(
        {
            name: req.body.recipe.name,
            category: req.body.recipe.category,
            creator: req.body.recipe.creator,
            ingredients: req.body.recipe.ingredients,
            instructions: req.body.recipe.instructions,
            notes: req.body.recipe.notes,
            userEmail: req.user.email
        },
        { where: { id: req.params.id, userEmail: req.user.email } }
    )
        .then((response) => {
            res.status(200).json({
                message: "Successfully updated a recipe",
                rowsUpdated: response
            })
        })
        .catch(err => res.json({
            message: "There was an issue updating your recipe",
            reqbody: req.body,
            error: err
        }))
});



module.exports = router;