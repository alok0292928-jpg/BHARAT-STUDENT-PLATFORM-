import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    getDatabase, ref, onValue
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const auth = getAuth();
const db = getDatabase();

onAuthStateChanged(auth, (user)=>{
    if(!user) location="auth.html";

    const name = user.email.split("@")[0];
    document.getElementById("welcomeUser").innerText = `Hello ${name} 👋`;

    loadActivity(user.uid);
});

function go(page){
    window.location = "../" + page;
}

function logout(){
    signOut(auth);
}

function loadActivity(uid){
    onValue(ref(db, "recent/" + uid), (snap)=>{
        const box = document.getElementById("recentBox");

        if(!snap.exists()){
            box.innerText = "No activity yet.";
            return;
        }

        const data = Object.values(snap.val()).reverse().slice(0,5);

        box.innerHTML = "";
        data.forEach(a=>{
            box.innerHTML += `• ${a.text}\n`;
        });
    });
}