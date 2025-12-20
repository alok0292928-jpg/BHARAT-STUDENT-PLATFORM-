// Updated ai-chat.js for Component 11 (Chat History Support)

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

import { saveActivity } from "./firebase-actions.js";

const auth = getAuth(); const db = getDatabase();

let USER_ID = null; let CHAT_ID = localStorage.getItem("CHAT_ID");

onAuthStateChanged(auth, async (user) => { if (!user) window.location = "auth.html"; USER_ID = user.uid;

// Load previous chat if exists
if (CHAT_ID) {
    await loadOldMessages(CHAT_ID);
}

});

// Add message to UI function addMessage(sender, text) { const chat = document.getElementById("chatBox"); chat.innerHTML += <div class="msg ${sender}"> <div class="bubble">${text}</div> </div>; chat.scrollTop = chat.scrollHeight; }

// Typing animation handler function showTyping(show) { document.getElementById("typingIndicator").classListshow ? "remove" : "add"; }

// Send user message window.sendMsg = async () => { const input = document.getElementById("userInput"); const text = input.value.trim(); if (!text) return;

addMessage("user", text);
input.value = "";

saveActivity("Chatted with AI");
showTyping(true);

const aiReply = await askGemini(text);

showTyping(false);
addMessage("ai", aiReply);

// Save message in chat history
if (CHAT_ID) {
    saveMessageToChat(CHAT_ID, text, aiReply);
} else {
    createChatAndSave(text, aiReply);
}

};

// Create new chat if no CHAT_ID function createChatAndSave(userMsg, aiMsg) { CHAT_ID = push(ref(db, users/${USER_ID}/chats)).key; localStorage.setItem("CHAT_ID", CHAT_ID);

// First message becomes chat title
set(ref(db, `users/${USER_ID}/chats/${CHAT_ID}/title`), userMsg);

saveMessageToChat(CHAT_ID, userMsg, aiMsg);

}

// Save message inside existing chat function saveMessageToChat(id, userMsg, aiMsg) { push(ref(db, users/${USER_ID}/chats/${id}/messages), { user: userMsg, ai: aiMsg, time: Date.now() }); }

// Load old chat messages async function loadOldMessages(id) { const snap = await get(ref(db, users/${USER_ID}/chats/${id}/messages)); if (!snap.exists()) return;

const msgs = snap.val();

for (const key in msgs) {
    addMessage("user", msgs[key].user);
    addMessage("ai", msgs[key].ai);
}

}

// Gemini AI function async function askGemini(prompt) { try { const res = await fetch( "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=gen-lang-client-0755790144", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) } );

const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "AI error";
} catch (e) {
    return "Network error";
}

}