const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    let reviewImage = await ReviewImage.findByPk(req.params.imageId);

    if (!reviewImage) {
        res.statusCode = 404;
        res.json({
            message: "Review image couldn't be found",
            statusCode: res.statusCode
        })
    }

    let review = await reviewImage.getReview();
    review = review.toJSON();
    let owner = review.userId;

    //authorization check
    if (owner !== req.user.id) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: res.statusCode
        })
    } else {
        reviewImage.destroy();

        res.statusCode = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    }

})


module.exports = router;
