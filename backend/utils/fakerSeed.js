const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

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

const seedSpots = (num) => {
    let spots = new Array(num).fill('');

    for (const i in spots) {
        spots[i] = {
            ownerId: rNum(10),
            address: faker.address.streetAddress(),
            city: faker.address.cityName(),
            state: faker.address.state(),
            country: 'United States of America',
            lat: faker.address.latitude(90, -90, 7),
            lng: faker.address.longitude(180, -180, 7),
            name: faker.lorem.sentence(),
            description: faker.lorem.paragraph(rNum(10)),
            price: faker.commerce.price(100, 500)
        }
    }

    return spots;
}

const seedSpotImages = (num) => {
    let spotImages = new Array(num).fill('');

    for (const i in spotImages) {
        spotImages[i] = {
            spotId: rNum(15),
            url: faker.image.city(640, 480, true),
            preview: faker.datatype.boolean()
        }
    }

    return spotImages;
}

const seedReviews = (num) => {
    let reviews = new Array(num).fill('');

    for (const i in reviews) {
        reviews[i] = {
            spotId: rNum(15),
            userId: rNum(10),
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
            reviewId: rNum(15),
            url: faker.image.abstract(640, 480, true)
        }
    }

    return reviewImages;
}


const seedBookings = (num) => {
    let bookings = new Array(num).fill('');

    for (const i in bookings) {
        bookings[i] = {
            spotId: rNum(15),
            userId: rNum(10),
            startDate: faker.date.future(1),
            endDate: faker.date.future(1)
        }
    }

    return bookings;
}

module.exports = {
    seedUsers,
    seedSpots,
    seedSpotImages,
    seedReviews,
    seedReviewImages,
    seedBookings
}
