import { firebaseConfig } from "../firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getAuth, 
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
    getDatabase, ref, set 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Switch Forms
window.showRegister = () => {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
};

window.showLogin = () => {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
};

// Email REGISTER
window.registerUser = () => {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const pass = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCred) => {
        const uid = userCred.user.uid;

        set(ref(db, "users/" + uid), {
            name: name,
            email: email
        });

        localStorage.setItem("uid", uid);
        window.location.href = "../dashboard/dashboard.html";
    })
    .catch(err => alert(err.message));
};

// Email LOGIN
window.loginUser = () => {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, pass)
    .then((userCred) => {
        localStorage.setItem("uid", userCred.user.uid);
        window.location.href = "../dashboard/dashboard.html";
    })
    .catch(err => alert(err.message));
};

// Google LOGIN
window.googleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
        const uid = result.user.uid;
        localStorage.setItem("uid", uid);
        window.location.href = "../dashboard/dashboard.html";
    })
    .catch(err => alert(err.message));
};

// Google REGISTER
window.googleRegister = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;

        set(ref(db, "users/" + user.uid), {
            name: user.displayName,
            email: user.email
        });

        localStorage.setItem("uid", user.uid);
        window.location.href = "../dashboard/dashboard.html";
    })
    .catch(err => alert(err.message));
};
