// =============================
//  FIREBASE AUTH SETUP
// =============================

import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


// ====================================
//  YOUR FIREBASE CONFIG (paste yours)
// ====================================
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

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();


// =============================
//  REGISTER (Email + Password)
// =============================
window.registerUser = function () {
    let email = document.getElementById("registerEmail").value;
    let pass = document.getElementById("registerPassword").value;
    let name = document.getElementById("registerName").value;

    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCred) => {
            let uid = userCred.user.uid;

            // Save user to DB
            set(ref(db, "users/" + uid), {
                name: name,
                email: email
            });

            alert("Registration successful!");
        })
        .catch((err) => {
            alert("Error: " + err.message);
        });
};


// =============================
//  LOGIN  (Email + Password)
// =============================
window.loginUser = function () {
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            console.log("Login success");
        })
        .catch((err) => {
            alert("Error: " + err.message);
        });
};


// =============================
//  GOOGLE LOGIN
// =============================
window.googleLogin = function () {
    signInWithPopup(auth, provider)
        .then(() => {
            console.log("Google Login Success");
        })
        .catch((err) => {
            alert("Google Login Error: " + err.message);
        });
};


// =============================
//  AUTO REDIRECT AFTER LOGIN
// =============================
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in → Redirecting...");
        window.location.href = "dashboard.html";   // 🔥 MOST IMPORTANT FIX
    }
});
