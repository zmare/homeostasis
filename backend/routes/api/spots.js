const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// GET routes
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

    let spots = [];
    spotsList.forEach(spot => {
        spots.push(spot.toJSON());
    })

    spots.forEach(spot => {
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

    res.json(spots);
})

router.get('/:id', requireAuth, async (req, res, next) => {
    let spotPromise = await Spot.findByPk(req.params.id, {
        include: [
            {
                model: SpotImage,
                attributes: {
                    exclude: ['spotId', 'createdAt', 'updatedAt']
                }
            }
        ]
    })

    if (!spotPromise) {
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

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


router.get('/', async (req, res) => {
    let spotsList = await Spot.findAll({
        include: [
            {
                model: SpotImage
            },
            {
                model: Review,
            }
        ]
    })

    let spots = [];
    spotsList.forEach(spot => {
        spots.push(spot.toJSON());
    })

    spots.forEach(spot => {
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

    res.json({ spots });
})

//POST routes
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const spotPromise = await Spot.findByPk(req.params.spotId);

    if (!spotPromise) {
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    const spot = await spotPromise.toJSON();
    const owner = spot.ownerId;

    //authorization check
    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        //add an image
        const { url, preview } = req.body;

        let newImage = await SpotImage.create({
            spotId: req.params.spotId,
            url: url,
            preview: preview
        })

        newImage = newImage.toJSON();

        newImage = await SpotImage.findByPk(newImage.id, {
            attributes: {
                exclude: ['spotId', 'createdAt', 'updatedAt']
            }

        })

        res.json(newImage)
    }

})


router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (!address) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "Street address is required"
        })
    } else if (!city) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "City is required"
        })
    } else if (!state) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "State is required"
        })
    } else if (!country) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "Country is required"
        })
    } else if (!lat || lat < -90 || lat > 90) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "Latitude is not valid"
        })
    } else if (!lng || lng < -180 || lng > 180) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "Longitude is not valid"
        })
    } else if (!name || name.length > 50) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "Name is required and must be less than 50 characters"
        })
    } else if (!description) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "Description is required"
        })
    } else if (!price) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            error: "Price per day is required"
        })
    } else {
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
        }

        res.json({
            message: 'Spot already exists',
        })
    }

})


// PUT routes
router.put('/:spotId', requireAuth, async (req, res) => {

    const spotPromise = await Spot.findByPk(req.params.spotId);

    if (!spotPromise) {
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    const spot = await spotPromise.toJSON();
    const owner = spot.ownerId;

    //authorization check
    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        const { address, city, state, country, lat, lng, name, description, price } = req.body

        if (!address) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Street address is required"
            })
        } else if (!city) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "City is required"
            })
        } else if (!state) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "State is required"
            })
        } else if (!country) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Country is required"
            })
        } else if (!lat || lat < -90 || lat > 90) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Latitude is not valid"
            })
        } else if (!lng || lng < -180 || lng > 180) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Longitude is not valid"
            })
        } else if (!name || name.length > 50) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Name is required and must be less than 50 characters"
            })
        } else if (!description) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Description is required"
            })
        } else if (!price) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Price per day is required"
            })
        } else {
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
        }
    }

})









module.exports = router;
