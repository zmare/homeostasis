const { faker } = require('@faker-js/faker');
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)

const spots = [
    {
        ownerId: rNum(4),
        address: "21901 County 49",
        city: "Akeley",
        state: "Minnesota",
        country: 'United States of America',
        lat: 45.99536,
        lng: -112.50578,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "17389 Brownsferry Rd",
        city: "Athens",
        state: "Alabama",
        country: 'United States of America',
        lat: 34.77898,
        lng: -87.01568,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "1719 College Street",
        city: "Atlanta",
        state: "Georgia",
        country: 'United States of America',
        lat: 33.849121,
        lng: -84.406921,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "4163 Woodhill Avenue",
        city: "Easton",
        state: "Maryland",
        country: 'United States of America',
        lat: 38.841347,
        lng: -75.990379,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "425 Driftwood Road",
        city: "San Jose",
        state: "California",
        country: 'United States of America',
        lat: 37.216309,
        lng: -121.823616,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "3389 Station Street",
        city: "San Jose",
        state: "California",
        country: 'United States of America',
        lat: 37.404716,
        lng: -122.034706,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "3692 Nutters Barn Lane",
        city: "Kamrar",
        state: "Iowa",
        country: 'United States of America',
        lat: 42.486103,
        lng: -93.772896,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "2284 Benson Street",
        city: "Lake Tomahawk",
        state: "Wisconsin",
        country: 'United States of America',
        lat: 45.690887,
        lng: -89.539909,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "1360 Roguski Road",
        city: "Natchitoches",
        state: "Louisiana",
        country: 'United States of America',
        lat: 31.700418,
        lng: -93.051628,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "4120 Hamill Avenue",
        city: "San Diego",
        state: "California",
        country: 'United States of America',
        lat: 32.799046,
        lng: -117.234001,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "2284 Kessla Way",
        city: "Conway",
        state: "South Carolina",
        country: 'United States of America',
        lat: 33.909843,
        lng: -78.956352,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "4576 Karen Lane",
        city: "Louisville",
        state: "Kentucky",
        country: 'United States of America',
        lat: 38.105019,
        lng: -85.675758,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "2912 Woodside Circle",
        city: "Panama City",
        state: "Florida",
        country: 'United States of America',
        lat: 30.175798,
        lng: -85.599541,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "1004 Granville Lane",
        city: "Whippany",
        state: "New Jersey",
        country: 'United States of America',
        lat: 40.904320,
        lng: -74.426888,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "1246 Watson Lane",
        city: "Asheville",
        state: "North Carolina",
        country: 'United States of America',
        lat: 35.617004,
        lng: -82.473640,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "1707 Farland Street",
        city: "Bolton",
        state: "Massachusetts",
        country: 'United States of America',
        lat: 42.489933,
        lng: -71.653603,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "4440 Coventry Court",
        city: "Baton Rouge",
        state: "Louisiana",
        country: 'United States of America',
        lat: 30.384689,
        lng: -91.062378,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "318 Rockford Mountain Lane",
        city: "Milwaukee",
        state: "Wisconsin",
        country: 'United States of America',
        lat: 42.954971,
        lng: -87.810104,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "3656 River Road",
        city: "Colorado Springs",
        state: "Colorado",
        country: 'United States of America',
        lat: 38.858067,
        lng: -104.790352,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    },
    {
        ownerId: rNum(4),
        address: "4919 Tuna Street",
        city: "Southfield",
        state: "Michigan",
        country: 'United States of America',
        lat: 42.498081,
        lng: -83.167686,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(rNum(10)),
        price: faker.commerce.price(100, 500)
    }
]

module.exports = {
    spots
}
