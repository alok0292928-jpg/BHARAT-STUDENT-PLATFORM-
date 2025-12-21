import { firebaseConfig } from "../firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getDatabase, ref, push, set, get, child 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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

// REGISTER (save to DB)
window.registerUser = async function () {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const pass = document.getElementById("registerPassword").value;

    if (!email || !pass) {
        alert("Please fill all fields!");
        return;
    }

    const userRef = ref(db, "users/");
    const newUser = push(userRef);

    await set(newUser, {
        name: name,
        email: email,
        password: pass // (Simple version, hashing later)
    });

    alert("Registration Successful!");

    localStorage.setItem("userId", newUser.key);

    window.location.href = "../dashboard/dashboard.html";
};

// LOGIN CHECK
window.loginUser = async function () {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;

    const dbRef = ref(db);

    const snapshot = await get(child(dbRef, "users"));

    if (!snapshot.exists()) {
        alert("No users found!");
        return;
    }

    let found = false;

    snapshot.forEach((user) => {
        const data = user.val();

        if (data.email === email && data.password === pass) {
            found = true;

            localStorage.setItem("userId", user.key);

            window.location.href = "../dashboard/dashboard.html";
        }
    });

    if (!found) {
        alert("Invalid email or password!");
    }
};