import { 
    getAuth, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    getDatabase, ref, get, remove
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const auth = getAuth();
const db = getDatabase();

let USER_ID = null;

onAuthStateChanged(auth, (user)=>{
    if(!user) window.location="../auth.html";
    USER_ID = user.uid;
    loadHistory();
});

// LOAD CHAT LIST
async function loadHistory(){
    const box = document.getElementById("historyList");

    const snap = await get(ref(db, "users/" + USER_ID + "/chats"));

    if(!snap.exists()){
        box.innerHTML = "<p>No chats found.</p>";
        return;
    }

    const data = snap.val();
    box.innerHTML = "";

    for(const id in data){
        const title = data[id].title || "New Chat";

        box.innerHTML += `
            <div class="chat-card">
                <div class="chat-title">${title}</div>

                <div class="chat-card-buttons">
                    <button class="btn open-btn" onclick="openChat('${id}')">Open</button>
                    <button class="btn del-btn" onclick="deleteChat('${id}')">Delete</button>
                </div>
            </div>
        `;
    }
}

// OPEN CHAT (redirect with chat ID)
window.openChat = (id)=>{
    localStorage.setItem("CHAT_ID", id);
    window.location = "../ai-chat.html";
};

// DELETE CHAT
window.deleteChat = (id)=>{
    remove(ref(db, "users/" + USER_ID + "/chats/" + id));
    alert("Deleted!");
    loadHistory();
};