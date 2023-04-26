const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { spotImages } = require('../utils/spot_image_data')

//simple random number generator
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)

const seedUsers = (num) => {
    let users = new Array(num).fill('');

    for (const i in users) {
        users[i] = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            hashedPassword: bcrypt.hashSync(faker.internet.password())
        }
    }

    return users;
}

// const seedSpots = (num) => {
//     // let spots = new Array(num).fill('');

//     for (const i in spots) {
//         spots[i] = {
//             ownerId: rNum(4),
//             address: faker.address.streetAddress(),
//             city: faker.address.cityName(),
//             state: faker.address.state(),
//             country: 'United States of America',
//             lat: faker.address.latitude(90, -90, 7),
//             lng: faker.address.longitude(180, -180, 7),
//             name: faker.lorem.sentence(),
//             description: faker.lorem.paragraph(rNum(10)),
//             price: faker.commerce.price(100, 500)
//         }
//     }

//     return spots;
// }

const seedSpotImages = (num) => {
    let mySpotImages = new Array(num).fill('');

    for (const i in mySpotImages) {
        mySpotImages[i] = {
            spotId: rNum(20),
            url: spotImages[rNum(119)],
            preview: true
        }
    }

    return mySpotImages;
}

const seedReviews = (num) => {
    let reviews = new Array(num).fill('');

    for (const i in reviews) {
        reviews[i] = {
            spotId: rNum(20),
            userId: rNum(4),
            review: faker.lorem.paragraph(rNum(3)),
            stars: rNum(5)
        }
    }

    return reviews;
}

const seedReviewImages = (num) => {
    let reviewImages = new Array(num).fill('');

    for (const i in reviewImages) {
        reviewImages[i] = {
            reviewId: rNum(10),
            url: faker.image.abstract(640, 480, true)
        }
    }

    return reviewImages;
}


const seedBookings = (num) => {
    let bookings = new Array(num).fill('');

    for (const i in bookings) {
        const startDate = new Date(faker.date.between('2023-02-01T00:00:00.000Z', '2023-03-01T00:00:00.000Z'));
        const endDate = new Date(faker.date.between('2023-04-01T00:00:00.000Z', '2023-05-01T00:00:00.000Z'));

        bookings[i] = {
            spotId: rNum(20),
            userId: rNum(4),
            startDate: startDate,
            endDate: endDate,
        }
    }

    return bookings;
}

const seedFavorites = (num) => {
    let favorites = new Array(num).fill('');

    for (const i in favorites) {
        favorites[i] = {
            userId: 1,
            spotId: rNum(20)
        }
    }

    return favorites;
}

module.exports = {
    seedUsers,
    //seedSpots,
    seedSpotImages,
    seedReviews,
    seedReviewImages,
    seedBookings,
    seedFavorites
}
