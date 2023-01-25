const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
        include: [
            {
                model: SpotImage
            },
            {
                model: Review,
                attributes: {
                    include: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]]
                }
            }
        ]
    })

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON());
    })

    spotsList.forEach(spot => {
        spot.Reviews.forEach(review => {
            spot.avgRating = review.avgRating;
        })
        delete spot.Reviews;

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        })

        if (spot.preview === false) {
            spot.previewImage = "no image found"
        }

        delete spot.SpotImages;

    })

    res.json({ spotsList });
})










module.exports = router;
