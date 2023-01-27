const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    let spotImage = await SpotImage.findByPk(req.params.imageId);

    if (!spotImage) {
        res.statusCode = 404;
        res.json({
            message: "Spot image couldn't be found",
            statusCode: res.statusCode
        })
    }

    let spot = await spotImage.getSpot();
    spot = spot.toJSON();
    let owner = spot.ownerId;

    //authorization check
    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        spotImage.destroy();

        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }

    res.json('success')





})


module.exports = router;
