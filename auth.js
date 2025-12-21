// ==========================
// FIREBASE IMPORTS
// ==========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


// ==========================
// FIREBASE CONFIG
// ==========================
const firebaseConfig = {
    apiKey: "AIzaSyDmToqWOaBjODzAauhpxriCg-imiAKg-aQ",
    authDomain: "bharat-student-platform.firebaseapp.com",
    databaseURL: "https://bharat-student-platform-default-rtdb.firebaseio.com",
    projectId: "bharat-student-platform",
    storageBucket: "bharat-student-platform.firebasestorage.app",
    messagingSenderId: "390311052094",
    appId: "1:390311052094:web:93234b2311c1a44a87226f",
    measurementId: "G-NDBKSP54N4"
};


// ==========================
// INIT FIREBASE SERVICES
// ==========================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();


// ==========================
// EMAIL REGISTRATION
// ==========================
document.getElementById("registerBtn").addEventListener("click", () => {
    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let pass = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, pass)
        .then((cred) => {
            set(ref(db, "users/" + cred.user.uid), {
                name,
                email,
                created: Date.now()
            });

            alert("Registration Successful!");
        })
        .catch((err) => alert(err.message));
});


// ==========================
// EMAIL LOGIN
// ==========================
document.getElementById("loginBtn").addEventListener("click", () => {
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, pass)
        .catch((err) => alert(err.message));
});


// ==========================
// GOOGLE LOGIN (MOBILE SAFE)
// ==========================
document.getElementById("googleBtn").addEventListener("click", () => {
    signInWithRedirect(auth, googleProvider);
});

// Check Google Redirect result
getRedirectResult(auth)
    .then((result) => {
        if (result && result.user) {
            console.log("Google Login Success (Redirect)");
        }
    })
    .catch((err) => alert("Google Login Error: " + err.message));


// ==========================
// AUTO-REDIRECT AFTER LOGIN
// ==========================
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in → Sending to dashboard...");
        window.location.href = "dashboard.html";
    }
});
