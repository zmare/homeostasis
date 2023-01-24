const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImages } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
        include: {

        }
    })

    let spotImage = await spots[0].getSpotImages();
    let previewURL = spotImage[0].url;

    spots[0].previewURL = 'image URL';

    res.json({ spots });
})










module.exports = router;
