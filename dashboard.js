import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const auth = getAuth();
const db = getDatabase();

// LOGIN CHECK + USER NAME + RECENT ACTIVITY
onAuthStateChanged(auth, (user)=>{
    if(!user) {
        location = "index.html";
        return;
    }

    const username = user.email.split("@")[0];
    document.getElementById("welcomeUser").innerText = `Hello ${username} 👋`;

    loadActivity(user.uid);
});

// ---------------------------
// ⭐ FIXED NAVIGATION
// ---------------------------
function go(page){
    window.location = page + ".html";  // GitHub-safe
}

// ---------------------------
// ⭐ FIXED LOGOUT
// ---------------------------
function logout(){
    signOut(auth).then(()=>{
        window.location = "index.html";
    });
}

// ---------------------------
// ⭐ RECENT ACTIVITY
// ---------------------------
function loadActivity(uid){
    onValue(ref(db, "recent/" + uid), (snap)=>{
        const box = document.getElementById("recentBox");

        if(!snap.exists()){
            box.innerText = "No activity yet.";
            return;
        }

        const items = Object.values(snap.val()).reverse().slice(0,5);

        box.innerHTML = "";
        items.forEach(a=>{
            box.innerHTML += `• ${a.text}\n`;
        });
    });
}
