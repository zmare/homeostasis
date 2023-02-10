const express = require('express');
const { requireAuth, requireAuthorization, doesSpotExist, requireAuthBooking, doesReviewExist } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { validateNewSpot, validateBooking, validateReview } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize')


// GET routes

// Route to get spots owned by current user
router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.id;

    let spotsList = await Spot.findAll({
        where: {
            ownerId: userId
        },
        include: [
            {
                model: SpotImage
            },
            {
                model: Review,
            }
        ]
    })

    let Spots = [];
    spotsList.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }

            if (image.preview === false) {
                spot.previewImage = "no image found"
            }

        })

        delete spot.SpotImages;

        let reviews = spot.Reviews

        if (reviews.length) {
            let sum = 0;
            for (let review of reviews) {
                sum += review.stars;
            }
            let avg = sum / reviews.length;
            let avgRounded = Math.round(avg * 10) / 10;
            spot.avgRating = avgRounded;
            sum = 0;
        }

        if (!reviews.length) {
            spot.avgRating = 'no reviews yet'
        }

        delete spot.Reviews;

    })

    res.json({ Spots });
})

// Route to find all reviews for a spot
router.get('/:spotId/reviews', doesSpotExist, async (req, res) => {

    let Reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']

            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt']
                }
            },
        ]
    })

    res.json({ Reviews });

})

// Route to get bookings for a spot based on spot ID
router.get('/:spotId/bookings', [requireAuth, doesSpotExist], async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    spot = spot.toJSON();
    const owner = spot.ownerId;

    //authorization check
    if (owner !== req.user.id) {
        let Bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })

        res.json({ Bookings });
    } else {
        let Bookings = await Booking.findAll({
            where: {
                spotId: spot.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        })
        res.json({ Bookings })
    }
})


// Route to get details of a spot by ID
router.get('/:spotId', doesSpotExist, async (req, res, next) => {
    let spotPromise = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: {
                    exclude: ['spotId', 'createdAt', 'updatedAt']
                }
            }
        ]
    })

    let spot = spotPromise.toJSON();

    let spotOwnerPromise = await spotPromise.getUser();
    let spotOwner = spotOwnerPromise.toJSON();
    delete spotOwner.username;
    spot.Owner = spotOwner;

    let spotReviewsPromise = await spotPromise.getReviews();
    let reviews = []
    spotReviewsPromise.forEach(review => {
        reviews.push(review.toJSON());
    })


    if (reviews.length) {
        spot.numReviews = reviews.length;

        let sum = 0;
        for (let review of reviews) {
            sum += review.stars;
        }

        let avg = sum / reviews.length;
        let avgRounded = Math.round(avg * 10) / 10;
        spot.avgStarRating = avgRounded;

    }

    res.json(spot)
})


// Route to get all spots with query
router.get('/', async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    let pagination = {};

    if (!size || isNaN(size)) size = 1;
    if (!page || isNaN(page)) page = 1;

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    let query = {
        where: {},
        include: [],
        ...pagination
    }
    query.include.push({ model: SpotImage }, { model: Review });

    if (page < 1 || page > 10) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: "Page must be greater than or equal to 1"
        })
    }

    if (size < 1 || size > 20) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: "Size must be greater than or equal to 1"
        })
    }

    // check for min and max latitude
    if (minLat && maxLat) {
        if (minLat < -90 || minLat > 90) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Minimum latitude is invalid"
            })
        } else if (maxLat < -90 || maxLat > 90) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Maximum latitude is invalid"
            })
        } else {
            query.where.lat = { [Op.between]: [minLat, maxLat] }
        }

    } else if (minLat) {
        if (minLat < -90 || minLat > 90) {

        } else {
            query.where.lat = { [Op.gte]: minLat }
        }
    } else if (maxLat) {
        if (maxLat < -90 || maxLat > 90) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Minimum latitude is invalid"
            })
        } else {
            query.where.lat = { [Op.lte]: maxLat }
        }
    }


    //check for min and max longitude
    if (minLng && maxLng) {
        if (minLng < -180 || minLng > 180) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Minimum latitude is invalid"
            })
        } else if (maxLng < -180 || maxLng > 180) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Maximum latitude is invalid"
            })
        } else {
            query.where.lng = { [Op.between]: [minLng, maxLng] }
        }

    } else if (minLng) {
        if (minLng < -180 || minLng > 180) {
        } else {
            query.where.lng = { [Op.gte]: minLng }
        }
    } else if (maxLng) {
        if (maxLng < -90 || maxLng > 90) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Minimum latitude is invalid"
            })
        } else {
            query.where.lng = { [Op.lte]: maxLng }
        }
    }

    //check for min and max price
    if (minPrice && maxPrice) {
        if (minPrice < 0) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Minimum price must be greater than or equal to zero"
            })
        } else if (maxPrice < 0) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Maximum price must be greater than or equal to zero"
            })
        } else {
            query.where.price = { [Op.between]: [minPrice, maxPrice] }
        }

    } else if (minPrice) {
        if (minPrice < 0) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Minimum price must be greater than or equal to zero"
            })
        } else {
            query.where.price = { [Op.gte]: minPrice }
        }
    } else if (maxPrice) {
        if (maxPrice < 0) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: "Maximum price must be greater than or equal to zero"
            })
        } else {
            query.where.price = { [Op.lte]: maxPrice }
        }
    }

    let spotsList = await Spot.findAll(query)

    let Spots = [];
    spotsList.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach(spot => {
        if (!spot.SpotImages.length) {
            spot.previewImage = 'no image found';
        }

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }

            if (image.preview === false) {
                spot.previewImage = "no image found"
            }

        })

        delete spot.SpotImages;

        let reviews = spot.Reviews

        if (reviews.length) {
            let sum = 0;
            for (let review of reviews) {
                sum += review.stars;
            }
            let avg = sum / reviews.length;
            let avgRounded = Math.round(avg * 10) / 10
            spot.avgRating = avgRounded;
            sum = 0;
        }

        if (!reviews.length) {
            spot.avgRating = 'no reviews yet'
        }

        delete spot.Reviews;


    })

    res.json({ Spots, page, size });
})

//POST routes
router.post('/:spotId/bookings', [requireAuth, doesSpotExist, requireAuthBooking, validateBooking], async (req, res) => {

    let { startDate, endDate } = req.body;
    startDate = new Date(startDate.replace(/-/g, '\/')).toDateString();
    let userStartDate = new Date(startDate).getTime();

    endDate = new Date(endDate.replace(/-/g, '\/')).toDateString();
    let userEndDate = new Date(endDate).getTime();

    let bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    let Bookings = [];
    for (let booking of bookings) {
        Bookings.push(booking.toJSON());
    }

    for (let booking of Bookings) {
        let existingStart = booking.startDate.toDateString();
        existingStart = new Date(existingStart).getTime();

        let existingEnd = booking.endDate.toDateString();
        existingEnd = new Date(existingEnd).getTime();

        let startCheck = userStartDate - existingStart;
        let endCheck = userEndDate - existingEnd;

        if (startCheck === 0) {
            res.statusCode = 403;
            res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": "Start date conflicts with an existing booking"
            })
        } else if (endCheck === 0) {
            res.statusCode = 403;
            res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": 'End date conflicts with an existing booking'
            })
        };
    }

    const newBooking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    })
    res.statusCode = 200;
    res.json(newBooking);


})

// Route to create a new review for a spot
router.post('/:spotId/reviews', [requireAuth, doesSpotExist, validateReview, doesReviewExist], async (req, res) => {
    const { review, stars } = req.body

    let newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review: review,
        stars: stars
    })

    res.json(newReview);


})

// Route to create a new spot image based on spot id
router.post('/:spotId/images', [requireAuth, doesSpotExist, requireAuthorization], async (req, res, next) => {

    const { url, preview } = req.body;

    // create a new image
    let newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url: url,
        preview: preview
    })

    // convert to JSON to get id of new image
    newImage = newImage.toJSON();

    // find the newly created image with certain attributes
    newImage = await SpotImage.findByPk(newImage.id, {
        attributes: {
            exclude: ['spotId', 'createdAt', 'updatedAt']
        }

    })

    // return new image
    res.json(newImage)

})



// Route to create a new spot
router.post('/', [requireAuth, validateNewSpot], async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const existingSpot = await Spot.findOne({
        where: {
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng
        }
    })

    if (!existingSpot) {
        const newSpot = await Spot.create({
            ownerId: req.user.id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        })
        res.statusCode = 201;
        res.json(newSpot)
    } else {
        res.json({
            message: 'Spot already exists',
        })
    }

})


// PUT routes
router.put('/:spotId', [requireAuth, doesSpotExist, requireAuthorization, validateNewSpot], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.findByPk(req.params.spotId);

    spot.update({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    });

    res.json(spot);

})

//DELETE Routes
router.delete('/:spotId', [requireAuth, doesSpotExist, requireAuthorization], async (req, res) => {

    const spotPromise = await Spot.findByPk(req.params.spotId);
    await spotPromise.destroy();

    res.statusCode = 200;
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
})



module.exports = router;
