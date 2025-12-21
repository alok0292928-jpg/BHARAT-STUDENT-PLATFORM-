// ================= FIREBASE CONFIG ==================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDmToqWOaBjODzAauhpxriCg-imiAKg-aQ",
    authDomain: "bharat-student-platform.firebaseapp.com",
    databaseURL: "https://bharat-student-platform-default-rtdb.firebaseio.com",
    projectId: "bharat-student-platform",
    storageBucket: "bharat-student-platform.firebasestorage.app",
    messagingSenderId: "390311052094",
    appId: "1:390311052094:web:93234b2311c1a44a87226f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);