import * as firebase from 'firebase';
console.log('apiKey: ', process.env.FIREBASE_API_KEY)
console.log('authDomain: ', process.env.FIREBASE_AUTH_DOMAIN)
console.log('databaseURL: ', process.env.FIREBASE_DATABASE_URL)
console.log('projectId: ', process.env.FIREBASE_PROJECT_ID)
console.log('storageBucket: ', process.env.FIREBASE_STORAGE_BUCKET)
console.log('messagingSenderId: ', process.env.FIREBASE_MESSAGING_SENDER_ID)
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };