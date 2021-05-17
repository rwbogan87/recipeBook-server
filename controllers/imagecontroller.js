var express = require('express');
var router = express.Router();
var sequelize = require('../db');
let auth = require('../middleware/auth');
var Image = sequelize.import('../models/image');

// test
router.post("/upload", auth, (req, res) => {
    Image.create({
        url: req.body.url,
        note: req.body.note,
        uploadedBy: req.user.email
    })
        .then((image) => {
            res.status(200).json(image);
        })
        .catch((err) => res.status(500).json(
            {
                reason: "There was an error uploading your image :(",
                error: err
            }
        ));
});

router.get("/getall", auth, (req, res) => {
    Image.findAll(req.body)
        .then((images) => {
            res.status(200).json(images);
        })
        .catch((err) => res.status(500).json(
            {
                reason: "There was an error getting your images",
                error: err
            }
        ));
});

// router.delete("/:id", auth, (req, res) => {
//     // console.log(req)
//     Recipe.destroy({
//         where: {
//             id: req.params.id, userEmail: req.user.email
//         }
//     })
//         .then((response) => {
//             console.log(response)
//             response.status(200).json({
//                 message: "Successfully removed a recipe",
//                 rowsUpdated: response
//             })
//         })
//         .catch(err => res.status(401).json({
//             message: "There was an issue deleting your recipe",
//             error: err
//         }))
// });

// router.put("/:id", auth, (req, res) => {
//     Recipe.update(
//         {
//             name: req.body.recipe.name,
//             category: req.body.recipe.category,
//             creator: req.body.recipe.creator,
//             ingredients: req.body.recipe.ingredients,
//             instructions: req.body.recipe.instructions,
//             notes: req.body.recipe.notes,
//             userEmail: req.user.email
//         },
//         { where: { id: req.params.id, userEmail: req.user.email } }
//     )
//         .then((response) => {
//             res.status(200).json({
//                 message: "Successfully updated a recipe",
//                 rowsUpdated: response
//             })
//         })
//         .catch(err => res.json({
//             message: "There was an issue updating your recipe",
//             reqbody: req.body,
//             error: err
//         }))
// });



module.exports = router;