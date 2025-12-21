import { firebaseConfig } from "./firebase-config.js";
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

// UI switching
document.getElementById("goRegister").onclick = () => {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
};

document.getElementById("goLogin").onclick = () => {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
};

// Email login
document.getElementById("loginBtn").onclick = () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            localStorage.setItem("uid", res.user.uid);
            window.location.href = "dashboard/dashboard.html";
        })
        .catch(err => alert(err.message));
};

// Email register
document.getElementById("registerBtn").onclick = () => {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            const uid = res.user.uid;

            set(ref(db, "users/" + uid), {
                name: name,
                email: email
            });

            localStorage.setItem("uid", uid);
            window.location.href = "dashboard/dashboard.html";
        })
        .catch(err => alert(err.message));
};

// Google login
document.getElementById("googleLoginBtn").onclick = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((res) => {
            localStorage.setItem("uid", res.user.uid);
            window.location.href = "dashboard/dashboard.html";
        })
        .catch(err => alert(err.message));
};

// Google register
document.getElementById("googleRegisterBtn").onclick = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((res) => {
            set(ref(db, "users/" + res.user.uid), {
                name: res.user.displayName,
                email: res.user.email
            });

            localStorage.setItem("uid", res.user.uid);
            window.location.href = "dashboard/dashboard.html";
        })
        .catch(err => alert(err.message));
};
