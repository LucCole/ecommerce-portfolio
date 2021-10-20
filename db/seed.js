const { 
  createUser
} = require('./index');

const { 
  client
} = require('./client');


async function buildTables() {
try {

  // Client
  console.log('Connecting to client');

  client.connect();

  console.log('Connected to client');

  // Drop tables
  console.log('Dropping all tables...');
    
  await  client.query(`
      DROP TABLE IF EXISTS users;
  `)

  console.log('finished to dropping tables')

  // Build Tables
  console.log('Starting to build tables')

  await  client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        publicName VARCHAR(255),
        location VARCHAR(255),
        bio VARCHAR(500),
        occupation VARCHAR(255),
        avatar TEXT,
        website TEXT,
        facebookLink TEXT,
        twitterLink TEXT,
        youtubeLink TEXT,
        pinterestLink TEXT,
        instagramLink TEXT
      );
  `)

  console.log('users done')

  console.log('Finished building tables')
  
} catch (error) {
  console.error("Error building tables!");
  throw error;
}
}

async function populateInitialData() {
  console.log('Starting to create users...');
  try {
    // users
    const usersToCreate = [
        { username: 'albert', password: 'bertie99', email:'albert@coffeemail.com' },
        { username: 'sandra', password: 'sandra123', email:'sandra@coffeemail.com' },
        { username: 'glamgal', password: 'glamgal123', email:'glamgal@coffeemail.com' },
        { username: 'pruplebarny', password: 'barney123', email:'barney@coffeemail.com' },
        { username: 'lauren', password: 'lauren123', email:'lauren@coffeemail.com' },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');

    
  } catch (error) {
    console.error("Error building tables!", error)
    throw error;
  }
}

buildTables()
.then(populateInitialData)
.catch(console.error)
.finally(() => client.end());
