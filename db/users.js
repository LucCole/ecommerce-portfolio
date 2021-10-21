// ----- TODO -----
// what to do on conflict? username / email




const { client } = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser({ username, password, email }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  
  try {
    const {rows: [user]} = await client.query(`
    INSERT INTO users(username, password, email) 
    VALUES ($1, $2, $3)
    RETURNING id, username, email;
    `, [username, hashedPassword, email]);
    return user;
  } catch (error) {
    throw error;
  }
}

// only change things that have been changed (how did i do this?)
// async function editUser({publicName, location, bio, occupation, avatar, website, facebookLink, twitterLink, youtubeLink, pinterestLink, instagramLink, id }) {

//   // on conflict
//   try {
//     const {rows: [user]} = await client.query(`
//     UPDATE users
//     SET
//       "publicName"=$1, 
//       location=$2, 
//       bio=$3, 
//       occupation=$4, 
//       avatar=$5, 
//       website=$6, 
//       "facebookLink"=$7, 
//       "twitterLink"=$8, 
//       "youtubeLink"=$9, 
//       "pinterestLink"=$10, 
//       "instagramLink"=$11
//     WHERE id = $12;
//     `, [publicName, location, bio, occupation, avatar, website, facebookLink, twitterLink, youtubeLink, pinterestLink, instagramLink, id]);
//     return user;
//   } catch (error) {
//     throw error;
//   }
// }



async function getUser({username, password}) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);


    console.log('Is there a user: ', user);
    if(!user) return;

    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    console.log('Do the passwords match: ', passwordsMatch);
    if(!passwordsMatch) return;


    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
  
async function getUserById(userId) {
  try {
    const {rows: [user]} = await client.query(`
    SELECT id, username, email
    FROM users
    WHERE id=$1;
    `, [userId]);

    if (!user) return null;
    return user;  
  } catch (error) {
      throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {rows: [ user ] } = await client.query(`
    SELECT id, username, password, email
    FROM users
    WHERE username=$1;
    `, [username]);

  if (!user) return null;

  return user;
  } catch (error) {
    throw error;
  }
}









// ----- WORKING -----


async function getUserByEmail(email) {
  try {
    const {rows: [ user ] } = await client.query(`
    SELECT id, username, email
    FROM users
    WHERE email=$1;
    `, [email]);

  if (!user) return null;

  return user;
  } catch (error) {
    throw error;
  }
}

// Should this be get user? That would mess everything up but it might be better to do it now rather than later
async function getUserProfile(id) {
  try {
    const {rows: [user]} = await client.query(`
    SELECT "publicName", location, bio, occupation, avatar, website, "facebookLink", "twitterLink", "youtubeLink", "pinterestLink", "instagramLink"
    FROM users
    WHERE id=$1;
    `, [id]);
    return user;
  } catch (error) {
    throw error;
  }
}

// should not be returning all
async function editUserProfile({publicName, location, bio, occupation, avatar, website, facebookLink, twitterLink, youtubeLink, pinterestLink, instagramLink, id}) {
  try {
    const {rows: [user]} = await client.query(`
    UPDATE users
    SET
      "publicName"=$1, 
      location=$2, 
      bio=$3, 
      occupation=$4, 
      avatar=$5, 
      website=$6, 
      "facebookLink"=$7, 
      "twitterLink"=$8, 
      "youtubeLink"=$9, 
      "pinterestLink"=$10, 
      "instagramLink"=$11
    WHERE id=$12
    RETURNING*;
    `, [publicName, location, bio, occupation, avatar, website, facebookLink, twitterLink, youtubeLink, pinterestLink, instagramLink, id]);
    return user;
  } catch (error) {
    throw error;
  }
}

// should not be returning all
async function editUserPassword({newPassword, id}) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, SALT_COUNT);
    const {rows: [user]} = await client.query(`
    UPDATE users
    SET password=$1
    WHERE id=$2
    RETURNING*;
    `, [hashedPassword, id]);
    return user;
  } catch (error) {
    throw error;
  }
}

// should not be returning all
async function editUserEmail({newEmail, id}) {
  try {
    const {rows: [user]} = await client.query(`
    UPDATE users
    SET email=$1
    WHERE id=$2
    RETURNING*;
    `, [newEmail, id]);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createUser,
    // editUser,
    getUser,
    getUserById,
    getUserByUsername,
    getUserProfile,
    editUserProfile,
    editUserPassword,
    editUserEmail,
    getUserByEmail
}