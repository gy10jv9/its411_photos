// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { us } from "firebase/database";
import {} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUmZtPaaOZLW99GKEflfn7shBeHs24a5g",
  authDomain: "its411-acfea.firebaseapp.com",
  projectId: "its411-acfea",
  storageBucket: "its411-acfea.appspot.com",
  messagingSenderId: "622003543241",
  appId: "1:622003543241:web:093fc2095ce5ee5701c118",
  measurementId: "G-F9HH2ZV6QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = Database(app)
// import { initializeApp } from 'firebase/app';

// // Optionally import the services that you want to use
// // import {...} from "firebase/auth";
// // import {...} from "firebase/database";
// // import {...} from "firebase/firestore";
// // import {...} from "firebase/functions";
// // import {...} from "firebase/storage";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'api-key',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://project-id.firebaseio.com',
//   projectId: 'project-id',
//   storageBucket: 'project-id.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: 'app-id',
//   measurementId: 'G-measurement-id',
// };

// const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
