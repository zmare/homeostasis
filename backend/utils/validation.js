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
        .withMessage('Street address is required'),
    check('city', 'City is required')
        .exists({ checkFalsy: true })
        .isAlpha()
        .withMessage('Please enter a valid city'),
    check('state', 'State is required')
        .exists({ checkFalsy: true })
        .isAlpha()
        .withMessage('Please enter a valid State'),
    check('country', "Country is required")
        .exists({ checkFalsy: true })
        .isAlpha()
        .withMessage('Please enter a valid Country'),
    check('lat', 'Latitude is required')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng', 'Longitude is required')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
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

const today = new Date().toDateString();

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('startDate is required')
        .isDate()
        .withMessage('Please enter a valid date')
        .custom((value, { req }) => {
            value = new Date(value.replace(/-/g, '\/')).toDateString();
            startDate = new Date(value).getTime();

            endDateVal = new Date(req.body.endDate.replace(/-/g, '\/')).toDateString();
            endDate = new Date(endDateVal).getTime();

            if (endDate - startDate < 0) {
                throw new Error("endDate cannot be on or before startDate");
            }
        }),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('End date is required')

]






module.exports = {
    handleValidationErrors,
    validateNewSpot,
    validateBooking
};
