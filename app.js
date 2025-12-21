import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { firebaseConfig } from "../firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// SHOW REGISTER
window.showRegister = function () {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
};

// SHOW LOGIN
window.showLogin = function () {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
};

// REGISTER USER
window.registerUser = function () {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Registration Successful!");
            window.location.href = "../dashboard/dashboard.html";
        })
        .catch(err => alert(err.message));
};

// LOGIN USER
window.loginUser = function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "../dashboard/dashboard.html";
        })
        .catch(err => alert(err.message));
};
