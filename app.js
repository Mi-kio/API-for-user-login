const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./userprofilelogging.json');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // or any port you prefer


app.use(bodyParser.json());
app.use(express.static(__dirname, { 'Content-Type': 'application/javascript' }));


    // Import the functions you need from the SDKs you need
// const initializeApp = require("firebase/app");
const firebase = require('firebase/app');

// Get the initializeApp function
const { initializeApp } = firebase;
// const getAnalytics= require("firebase/analytics");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "*****.firebaseapp.com",
  projectId: "****",
  storageBucket: "*****.appspot.com",
  messagingSenderId: "*******",
  appId: "*****",
  measurementId: "********"
};

// Initialize Firebase
// const app1 = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app1);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'YOUR DB URL'
   // replace with your Firebase project URL
});

const db = admin.database();

app.get('/', (req, res) => {
  console.log("get method app.js")
  res.sendFile('index.html');
});


// Define a route for user profile creation
app.post('/api/createUserProfile', async (req, res) => {
  try {
    const { username, password, gender, preferredCategory } = req.body;

    // Check if the username already exists
    const usernameExists = await checkIfUsernameExists(username);

    if (usernameExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    // Save user details to Firebase
    await saveUserDetails(username, hashedPassword, gender, preferredCategory);

    // Send success response
    res.status(200).json({ success: 'User profile created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to check if the username exists
// async function checkIfUsernameExists(username) {
//   const userDoc = await db.collection('userDetails').doc(username).get();
//   return userDoc.exists;
// }

async function hashPassword(password) {
  console.log("hash called");
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function checkIfUsernameExists(username) {
  const snapshot = await db.ref('userDetails/' + username).once('value');
  return snapshot.exists();
}


// Helper function to save user details to Firebase
// async function saveUserDetails(username, password, gender, preferredCategory) {
//   await db.collection('userDetails').doc(username).set({
//     username,
//     password,
//     gender,
//     preferredCategory,
//   });
// }
async function saveUserDetails(username, password, gender, preferredCategory) {
  await db.ref('userDetails/' + username).set({
    username,
    password,
    gender,
    preferredCategory,
  });
}



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

