const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, Request, Favorite, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// ************************************ GET routes ************************************ //

/// GET FAVORITES FOR CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.id;

    let favorites = await Favorite.findAll({
        where: {
            userId: userId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'spotId']
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: SpotImage
                    },
                    {
                        model: Review
                    }
                ]
            }
        ]
    })

    let Favorites = [];
    for (let favorite of favorites) {
        Favorites.push(favorite.toJSON());
    };


    Favorites.forEach(favorite => {
        favorite.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                favorite.Spot.previewImage = image.url;
            }
        })

        delete favorite.Spot.SpotImages;

        let reviews = favorite.Spot.Reviews

        if (reviews.length) {
            let sum = 0;
            for (let review of reviews) {
                sum += review.stars;
            }
            let avg = sum / reviews.length;
            let avgRounded = Math.round(avg * 10) / 10;
            favorite.Spot.avgRating = avgRounded.toFixed(1);
        }

        if (!reviews.length) {
            favorite.Spot.avgRating = 'no reviews yet'
        }

        delete favorite.Spot.Reviews;

    })

    res.json(Favorites);
})


// ************************************ POST routes ************************************ //

/// CREATE A NEW FAVORITE SPOT
router.post('/:spotId', requireAuth, async (req, res) => {
    let userId = req.user.id;

    const newFavorite = await Favorite.create({
        userId: userId,
        spotId: +req.params.spotId
    })

    res.statusCode = 201;
    res.json(newFavorite)
})

// ************************************ DELETE routes ************************************ //

/// DELETE A FAVORITE
router.delete('/:spotId', requireAuth, async (req, res) => {
    let userId = req.user.id;

    //check if review exists
    let favoritePromise = await Favorite.findOne({
        where: {
            userId: userId,
            spotId: +req.params.spotId
        }

    })

    if (!favoritePromise) {
        res.statusCode = 404;
        res.json({
            message: "This spot is not favorited",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const favorite = favoritePromise.toJSON();

    if (favorite.userId !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        await favoritePromise.destroy();

        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }

})

module.exports = router;
