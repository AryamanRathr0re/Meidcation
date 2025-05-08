import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Replace with your Firebase config object
  apiKey: "AIzaSyAazWgpz6zChTUwNxmjGAsvgQtL-VwFH48",
  authDomain: "niche-community-77cc0.firebaseapp.com",
  databaseURL: "https://niche-community-77cc0-default-rtdb.firebaseio.com",
  projectId: "niche-community-77cc0",
  storageBucket: "niche-community-77cc0.firebasestorage.app",
  messagingSenderId: "688260636420",
  appId: "1:688260636420:web:fa2bd5082ee3c050637a51",
  measurementId: "G-7QQ1L605F4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Database
const auth = getAuth(app);
const database = getDatabase(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Add auth state observer for debugging
auth.onAuthStateChanged(
  (user) => {
    if (user) {
      console.log("User is signed in:", user.email);
    } else {
      console.log("User is signed out");
    }
  },
  (error) => {
    console.error("Auth state change error:", error);
  }
);

export { auth, database };
export default app;
