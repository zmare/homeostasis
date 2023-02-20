const { query } = require('express');
const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street Address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    // check('lat')  *** custom error handler isn't needed ***
    //     // .exists()
    //     .isFloat({ min: -90, max: 90 })
    //     .withMessage('Latitude must be between -90 and 90'),
    // .custom((value, { req, res }) => {
    //     if (value === "" || (value >= -90 && value <= 90)) {
    //         return true;
    //     } else {
    //         throw new Error('Latitude must be between -90 and 90')
    //     }
    // }),
    // check('lng', 'Longitude is required')
    //     // .exists()
    //     .isFloat({ min: -180, max: 180 })
    //     .withMessage('Longitude must be between -180 and 180'),
    check('name', 'Name is required')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price', 'Price per day is required')
        .exists({ checkFalsy: true })
        .isCurrency()
        .withMessage('Please enter a valid price'),
    handleValidationErrors
];

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('startDate is required')
        .custom((value, { req, next }) => {
            value = new Date(value.replace(/-/g, '\/')).toDateString();
            startDate = new Date(value).getTime();

            endDateVal = new Date(req.body.endDate.replace(/-/g, '\/')).toDateString();
            endDate = new Date(endDateVal).getTime();

            if (endDate - startDate < 0) {
                throw new Error("endDate cannot be on or before startDate");
            } else {
                return value;
            }

        }),
    check('endDate')
        .exists()
        .withMessage('endDate is required'),
    handleValidationErrors
]

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars', 'Stars are required')
        .exists({ checkFalsy: true }),
    // .isInt({ min: 1, max: 5 })
    // .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

const validateSpotImage = [
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Image URL is required')
        .custom((value, { req, res }) => {
            if (value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.png')) {
                return true;
            } else {
                throw new Error('Image URL must end in .jpg, .jpeg. or .png')
            }
        }),
    handleValidationErrors
]






module.exports = {
    handleValidationErrors,
    validateNewSpot,
    validateBooking,
    validateReview,
    validateSpotImage
};
