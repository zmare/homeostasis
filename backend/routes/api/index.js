const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { Spot, SpotImage, Review, ReviewImage } = require('../../db/models')

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);

// GET /api/restore-user
router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});


// GET /api/require-auth
router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);


router.get('/test/spot', async function (req, res) {
    let spots = await Spot.findAll(
        {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: SpotImage
        }
    )

    res.json({ spots })
});

router.get('/test/review', async function (req, res) {
    let reviews = await Review.findAll(
        {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: ReviewImage
        }
    )

    res.json({ reviews })
});


module.exports = router;
