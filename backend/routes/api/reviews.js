const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// GET Routes
router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.id;

    let reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']

                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt']
                }
            }
        ]
    })

    let Reviews = [];
    for (let review of reviews) {
        Reviews.push(review.toJSON());
    };

    for (let review of Reviews) {
        let spot = await Spot.findByPk(review.spotId, {
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

        review.Spot = spot;

    }

    res.json({ Reviews });
})

//POST Routes
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    //check if review exists
    let reviewPromise = await Review.findByPk(req.params.reviewId);

    if (!reviewPromise) {
        res.statusCode = 404;
        res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const review = reviewPromise.toJSON();
    const owner = review.userId;

    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    }

    // check number of images is valid
    let reviewImagesPromise = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    let reviewImagesArr = [];
    for (let image of reviewImagesPromise) {
        reviewImagesArr.push(image.toJSON());
    }

    let numOfImages = reviewImagesArr.length;
    console.log(numOfImages);

    if (numOfImages >= 10) {
        res.statusCode = 403;
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": res.statusCode
        })
    } else {
        const { url } = req.body;

        if (!url) {
            res.statusCode = 400;
            res.json({
                message: 'URL is required',
                statusCode: res.statusCode
            })
        } else {
            let newReviewImage = await ReviewImage.create({
                reviewId: req.params.reviewId,
                url: url
            });

            newReviewImage = newReviewImage.toJSON();
            delete newReviewImage.reviewId;
            delete newReviewImage.updatedAt;
            delete newReviewImage.createdAt;

            res.json(newReviewImage);
        }
    }

})

// PUT Routes
router.put('/:reviewId', requireAuth, async (req, res) => {
    //check if review exists
    let reviewPromise = await Review.findByPk(req.params.reviewId);

    if (!reviewPromise) {
        res.statusCode = 404;
        res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const review = reviewPromise.toJSON();
    const owner = review.userId;

    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        const { review, stars } = req.body;

        if (!review) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Review text is required"
            });
        } else if (!stars || Number.isInteger(stars) === false || stars < 1 || stars > 5) {
            res.statusCode = 400;
            res.json({
                message: "Validation Error",
                statusCode: res.statusCode,
                error: "Stars must be an integer from 1 to 5"
            });
        } else {
            reviewPromise.update({
                review: review,
                stars: stars
            });


            res.json(reviewPromise);
        }
    }
});


//DELETE Routes
router.delete('/:reviewId', requireAuth, async (req, res) => {
    //check if review exists
    let reviewPromise = await Review.findByPk(req.params.reviewId);

    if (!reviewPromise) {
        res.statusCode = 404;
        res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    //authorization check
    const review = reviewPromise.toJSON();
    const owner = review.userId;

    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        await reviewPromise.destroy();

        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }

})









module.exports = router;
