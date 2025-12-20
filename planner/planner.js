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

onAuthStateChanged(auth, (user) => {
    if (!user) window.location="../login.html";
    USER_ID = user.uid;
    loadTasks();
});

function addTask(){
    const sub = document.getElementById("subjectInput").value.trim();
    const task = document.getElementById("taskInput").value.trim();

    if(!sub || !task) return alert("Please fill both fields.");

    const id = push(ref(db, "planner/" + USER_ID)).key;

    set(ref(db, "planner/" + USER_ID + "/" + id), {
        subject: sub,
        task: task,
        completed: false
    });

    document.getElementById("subjectInput").value = "";
    document.getElementById("taskInput").value = "";
}

function loadTasks(){
    const box = document.getElementById("taskList");

    onValue(ref(db, "planner/" + USER_ID), (snap)=>{
        box.innerHTML = "";

        if(!snap.exists()){
            box.innerHTML = "<p>No tasks added yet.</p>";
            return;
        }

        const data = snap.val();

        for(const id in data){
            const item = data[id];

            box.innerHTML += `
                <div class="task-box">
                    <div class="task-header">
                        <b>${item.subject}</b>
                        <button class="done-btn" onclick="markDone('${id}')">
                            ${item.completed ? "Completed ✔" : "Mark Done"}
                        </button>
                    </div>
                    <div class="task-text">${item.task}</div>
                </div>
            `;
        }
    });
}

window.markDone = (id)=>{
    set(ref(db, "planner/" + USER_ID + "/" + id + "/completed"), true);
}