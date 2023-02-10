const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review, Booking } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};


const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = ['Authentication required'];
    err.status = 401;
    return next(err);
}

// Check if spot exists
const doesSpotExist = async function (req, _res, next) {
    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        _res.statusCode = 404;
        _res.json({
            message: "Spot couldn't be found",
            statusCode: _res.statusCode
        })
    }

    return next();
}

const doesReviewExist = async function (req, _res, next) {
    const review = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })

    if (review) {
        _res.statusCode = 403;
        _res.json({
            message: "User already has a review for this spot",
            statusCode: _res.statusCode
        })
    }

    return next();
}

const doesBookingExist = async function (req, _res, next) {
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        _res.statusCode = 404;
        _res.json({
            message: "Booking couldn't be found",
            statusCode: _res.statusCode
        })
    }

    return next();
}




// Check if user is owner of spot
const requireAuthorization = async function (req, _res, next) {

    let spot = await Spot.findByPk(req.params.spotId);
    spot = spot.toJSON();
    const owner = spot.ownerId;

    //authorization check
    if (owner !== req.user.id) {
        _res.statusCode = 403;
        _res.json({
            message: 'Forbidden',
            statusCode: _res.statusCode
        })
    }

    return next();
}

const requireAuthBooking = async function (req, _res, next) {

    let spot = await Spot.findByPk(req.params.spotId);
    spot = spot.toJSON();
    const owner = spot.ownerId;

    //authorization check
    if (owner === req.user.id) {
        _res.statusCode = 403;
        _res.json({
            message: 'Forbidden',
            statusCode: _res.statusCode
        })
    }

    return next();
}




module.exports = {
    setTokenCookie,
    restoreUser,
    requireAuth,
    requireAuthorization,
    doesSpotExist,
    requireAuthBooking,
    doesReviewExist,
    doesBookingExist
};
