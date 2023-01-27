const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//GET routes
router.get('/current', requireAuth, async (req, res) => {
    let bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot
            }
        ]
    })
    let Bookings = [];
    for (let booking of bookings) {
        Bookings.push(booking.toJSON());
    };

    for (let booking of Bookings) {
        let spot = await Spot.findByPk(booking.spotId, {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            }
        });
        spot = spot.toJSON();

        let spotImages = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['url', 'preview']
        })

        for (let image of spotImages) {
            image = image.toJSON();

            if (image.preview === true) {
                spot.previewImage = image.url;
            } else {
                spot.previewImage = 'no image found'
            }
        }

        booking.Spot = spot;
    }

    res.json({ Bookings });
});


module.exports = router;
