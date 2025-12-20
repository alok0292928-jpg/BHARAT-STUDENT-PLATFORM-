import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} 
from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

import { firebaseConfig } from "./firebase-config.js";

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loader = document.getElementById("loader");
const authScreen = document.getElementById("authScreen");

window.onload = () => {
  setTimeout(() => {
    loader.classList.add("hidden");
    authScreen.classList.remove("hidden");
  }, 1000);
};

let isLogin = true;

window.toggleAuth = () => {
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText =
    isLogin ? "Login to BharatAI" : "Create Account";

  document.getElementById("authBtn").innerText =
    isLogin ? "Login" : "Register";

  document.getElementById("toggleAuth").innerText =
    isLogin ? "Don't have an account? Register" : "Already have an account? Login";
};

window.authAction = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if(isLogin){
    signInWithEmailAndPassword(auth, email, pass)
    .then(() => window.location.href = "/dashboard/dashboard.html")
    .catch(() => alert("Wrong email or password!"));
  } else {
    createUserWithEmailAndPassword(auth, email, pass)
    .then(() => window.location.href = "/dashboard/dashboard.html")
    .catch(() => alert("Registration failed"));
  }
};

window.googleLogin = () => {
  signInWithPopup(auth, provider)
  .then(() => window.location.href = "/dashboard/dashboard.html")
  .catch(() => alert("Google login failed"));
};

// Auto redirect if logged in
onAuthStateChanged(auth, (user) => {
  if(user){
    window.location.href = "/dashboard/dashboard.html";
  }
});