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
            }
        ]
    })

    res.json({ spots });
})










module.exports = router;
