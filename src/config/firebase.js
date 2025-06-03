const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Path to your Firebase service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://technest-da6a0-default-rtdb.firebaseio.com' // Replace with your Firebase Realtime Database URL
});

// Export the database instance for use in your resolvers
const database = admin.database();

module.exports = { database };
