/* eslint-disable */
'use strict';

const db = require('./server/db');
const { User, Item, Location } = require('./server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      firstName: 'Brynn',
      lastName: 'Shepherd',
      email: 'brynn.shepherd@gmail.com',
      password: '123',
    }),
  ]);

  await Promise.all([
    Location.create({
      name: 'Westbourne',
      lat: '40.726804',
      lon: '-74.001822',
    }),
    Location.create({
      name: 'Whitney Museum',
      lat: '40.739588',
      lon: '-74.008863',
    }),
    Location.create({
      name: 'Guggenheim Museum',
      lat: '40.78298',
      lon: '-73.958971',
    }),
    Location.create({
      name: 'Stay Gold',
      lat: '40.740985',
      lon: '-73.981878',
    }),
  ]);

  const items = await Item.bulkCreate([
    {
      name: 'The Order of Time',
      link: 'https://www.amazon.com/Order-Time-Carlo-Rovelli/dp/073521610X',
      notes: 'Time is weird',
      categoryId: 1,
    },
    {
      name: 'Origin Story',
      isCompleted: true,
      completedDate: new Date(),
      categoryId: 1,
    },
    {
      name: 'The Happiness Project',
      notes: 'For book club on January 21',
      categoryId: 1,
    },
    {
      name: 'The Favourite',
      notes: 'In theaters until February 15',
      categoryId: 2,
    },
    {
      name: 'Crazy Rich Asians',
      notes: 'Watch on a Delta flight',
      categoryId: 2,
    },
    {
      name: 'My Brilliant Friend',
      notes: 'On HBO & based on the books',
      categoryId: 3,
    },
    {
      name: 'Schitt’s Creek',
      notes: 'Netflix',
      categoryId: 3,
    },
    {
      name: 'Killing Eve',
      notes: 'Hulu',
      categoryId: 3,
    },
    {
      name: 'ANNA Essential Mix',
      link:
        'https://soundcloud.com/anna-essential-mix/anna-essential-mix-2019-01-12',
      isCompleted: true,
      categoryId: 4,
    },
    {
      name: 'Indecent Noise EOYC 2018',
      link:
        'https://soundcloud.com/indecentnoise/indecent-noise-eoyc-2018-top-50-of-2018',
      categoryId: 4,
    },
    {
      name: 'Westbourne',
      link: 'https://www.westbourne.com/',
      notes: 'Healthy lunch place in Soho',
      isCompleted: true,
      completedDate: new Date(),
      categoryId: 5,
      locationId: 2,
    },
    {
      name: 'Stay Gold',
      link: 'https://staygoldnyc.com/',
      categoryId: 5,
      locationId: 4,
    },
    {
      name: 'Andy Warhol: From A to B and Back Again',
      link: 'https://whitney.org/Exhibitions/AndyWarhol',
      notes: 'At the Whitney Museum',
      expirationDate: new Date(2019, 4, 20),
      categoryId: 6,
      locationId: 1,
    },
    {
      name: 'Hilma af Klint: Paintings For the Future',
      link: 'https://www.guggenheim.org/exhibition/hilma-af-klint',
      notes: 'At the Guggenheim',
      categoryId: 6,
      locationId: 3,
    },
  ]).then(() => {
    // associate items with our (one) user
    return Item.update({ userId: users[0].id }, { where: {} });
  });

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
