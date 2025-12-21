import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase Config
import { firebaseConfig } from "../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Switch Forms
window.showRegister = function () {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
};

window.showLogin = function () {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
};

// Register User
window.registerUser = function () {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Registered Successfully!");
            window.location.href = "../dashboard/dashboard.html";
        })
        .catch((error) => alert(error.message));
};

// Login User
window.loginUser = function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "../dashboard/dashboard.html";
        })
        .catch((error) => alert(error.message));
};
