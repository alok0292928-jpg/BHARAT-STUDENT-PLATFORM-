import { 
    getAuth, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    getDatabase, ref, push, set, remove, onValue
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const auth = getAuth();
const db = getDatabase();

let USER_ID = null;
let FILE_URL = null;

// Bytescale setup
const uploadManager = new Bytescale.UploadManager({
    apiKey: "public_223k2XG77nda119Cf6ssD7yx4xrE"
});

onAuthStateChanged(auth, (user) => {
    if (!user) window.location="../auth.html";
    USER_ID = user.uid;
    loadNotes();
});

async function uploadFile(event){
    const file = event.target.files[0];
    if(!file) return;

    document.getElementById("uploadStatus").innerText = "Uploading…";

    const { fileUrl } = await uploadManager.upload({ data:file });

    FILE_URL = fileUrl;
    document.getElementById("uploadStatus").innerText = "File Uploaded ✔";
}

window.addTask = () => {};

// Save note
window.saveNote = () => {};

// Add note
async function addNote(){
    const title = document.getElementById("noteTitle").value.trim();

    if(!title) return alert("Enter title.");
    if(!FILE_URL) return alert("Upload a file first.");

    const id = push(ref(db, "notes/" + USER_ID)).key;

    set(ref(db, "notes/" + USER_ID + "/" + id), {
        title: title,
        url: FILE_URL
    });

    document.getElementById("noteTitle").value = "";
    document.getElementById("uploadStatus").innerText = "";
    FILE_URL = null;

    alert("Note saved!");
}

// Load notes list
function loadNotes(){
    const box = document.getElementById("notesList");

    onValue(ref(db, "notes/" + USER_ID), (snap)=>{
        box.innerHTML = "";

        if(!snap.exists()){
            box.innerHTML = "<p>No notes uploaded yet.</p>";
            return;
        }

        const data = snap.val();
        for(const id in data){
            const n = data[id];

            box.innerHTML += `
                <div class="note-item">
                    <b>${n.title}</b>

                    <div class="note-item-buttons">
                        <button class="btn view-btn" onclick="window.open('${n.url}')">
                            View
                        </button>

                        <button class="btn del-btn" onclick="deleteNote('${id}')">
                            Delete
                        </button>
                    </div>
                </div>
            `;
        }
    });
}

window.deleteNote = (id)=>{
    remove(ref(db, "notes/" + USER_ID + "/" + id));
};

window.addNote = addNote;