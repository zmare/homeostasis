const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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










module.exports = router;
