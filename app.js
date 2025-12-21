import { auth, provider } from "./firebase-config.js";
import {
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// LOGIN WITH GOOGLE
window.googleLogin = function () {
    signInWithPopup(auth, provider)
        .then(() => {
            window.location.href = "./dashboard/dashboard.html";
        })
        .catch((err) => alert(err.message));
};

// AUTO-LOGIN: USER LOGIN HAI → DASHBOARD PE BEJO
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "./dashboard/dashboard.html";
    }
});

// LOGOUT
window.logoutUser = function () {
    signOut(auth).then(() => {
        window.location.href = "../index.html";
    });
};