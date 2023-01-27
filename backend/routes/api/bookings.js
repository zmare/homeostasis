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

//PUT Routes
router.put('/:bookingId', requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        res.statusCode = 404;
        res.json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    }

    booking = booking.toJSON();
    const owner = booking.userId;

    //authorization check
    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        let { startDate, endDate } = req.body;

        if (!startDate) {
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": "startDate is required"
            })
        }

        if (!endDate) {
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": "endDate is required"
            })
        } else {

            startDate = new Date(startDate.replace(/-/g, '\/')).toDateString();
            userStartDate = new Date(startDate).getTime();

            endDate = new Date(endDate.replace(/-/g, '\/')).toDateString();
            userEndDate = new Date(endDate).getTime();

            let today = new Date().toDateString();
            compareToday = new Date(today).getTime();

            if (userEndDate - userStartDate < 0) {
                res.statusCode = 400;
                res.json({
                    "message": "Validation error",
                    "statusCode": 400,
                    "errors": "endDate cannot be on or before startDate"
                })
            } else if (compareToday - userEndDate > 0) {
                res.json({
                    "message": "Past bookings cannot be modified",
                    "statusCode": 403,
                })
            } else {
                let bookings = await Booking.findAll({
                    where: {
                        spotId: booking.spotId
                    }
                })

                let Bookings = [];
                for (let myBooking of bookings) {
                    Bookings.push(myBooking.toJSON());
                }

                for (let myBooking of Bookings) {
                    let existingStart = myBooking.startDate.toDateString();
                    existingStart = new Date(existingStart).getTime();

                    let existingEnd = myBooking.endDate.toDateString();
                    existingEnd = new Date(existingEnd).getTime();

                    let startCheck = userStartDate - existingStart;
                    let endCheck = userEndDate - existingEnd;

                    if (startCheck === 0) {
                        res.json({
                            "message": "Sorry, this spot is already booked for the specified dates",
                            "statusCode": 403,
                            "errors": "Start date conflicts with an existing booking"
                        })
                    };

                    if (endCheck === 0) {
                        res.json({
                            "message": "Sorry, this spot is already booked for the specified dates",
                            "statusCode": 403,
                            "errors": 'End date conflicts with an existing booking'
                        })
                    };
                }
                booking = await Booking.findByPk(req.params.bookingId)

                booking.update({
                    startDate: req.body.startDate,
                    endDate: req.body.endDate
                })

                res.json(booking)

            }

        }

    }
})

//DELETE Routes
router.delete('/:bookingId', requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        res.statusCode = 404;
        res.json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    } else {
        bookingJSON = booking.toJSON();
        let startDate = bookingJSON.startDate;
        startDate = new Date(startDate).toDateString();
        let start = new Date(startDate).getTime();

        let today = new Date().toDateString();
        compareToday = new Date(today).getTime();

        console.log(compareToday - start);

        if (compareToday - start > 0) {
            res.statusCode = 400;
            res.json({
                "message": "Bookings that have been started cannot be deleted",
                "statusCode": res.statusCode
            })
        } else {
            let bookingOwner = booking.userId;
            let spot = booking.spotId;

            let spotOwner = await Spot.findByPk(spot);
            spotOwner = await spotOwner.getUser();
            spotOwner = spotOwner.id;

            if (bookingOwner === req.user.id || spotOwner === req.user.id) {
                booking.destroy();
                res.json({
                    message: "Succesfully deleted",
                    statusCode: 200
                })
            } else {
                res.statusCode = 403
                res.json({
                    message: 'Forbidden',
                    statusCode: res.statusCode
                })
            }
        }
    }
});

module.exports = router;
