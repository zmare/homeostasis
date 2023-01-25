const express = require('express');
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
                model: Review
            }
        ]
    })

    let spotsList = [];

    spots.forEach(spot => {
        spotsList.push(spot.toJSON());
    })

    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewURL = image.url;
            }
        })

        if (spot.preview === false) {
            spot.previewURL = "no image found"
        }

        delete spot.SpotImages;
    })

    res.json({ spotsList });
})










module.exports = router;
