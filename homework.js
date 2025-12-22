import { 
    auth, 
    db 
} from "./firebase-config.js";

import { 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
    doc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ---------------------
// 🔥 CHECK LOGIN STATUS
// ---------------------
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("userName").innerText = user.displayName || "Student";

    // Load activity
    loadRecentActivity(user.uid);
});



// ---------------------
// 🔥 LOADING RECENT ACTIVITY FROM FIRESTORE
// ---------------------
async function loadRecentActivity(uid) {
    const activityBox = document.getElementById("activityList");
    activityBox.innerHTML = "Loading...";

    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();

            activityBox.innerHTML = `
                <p><b>Last Activity:</b> ${data.lastActivity || "No recent activity."}</p>
                <p><b>Last Login:</b> ${data.lastLogin || "N/A"}</p>
            `;
        } else {
            activityBox.innerHTML = "No recent activity recorded.";
        }

    } catch (error) {
        activityBox.innerHTML = "Error loading activity.";
    }
}



// ---------------------
// 🔥 NAVIGATION BUTTONS
// ---------------------
document.getElementById("aiChat").onclick = () => window.location.href = "ai-chat.html";
document.getElementById("homework").onclick = () => window.location.href = "homework.html";
document.getElementById("smartRevision").onclick = () => window.location.href = "revision.html";
document.getElementById("subjectNotes").onclick = () => window.location.href = "subject.html";
document.getElementById("quiz").onclick = () => window.location.href = "quiz.html";
document.getElementById("notesSummary").onclick = () => window.location.href = "summary.html";
document.getElementById("planner").onclick = () => window.location.href = "planner.html";
document.getElementById("progress").onclick = () => window.location.href = "progress.html";
document.getElementById("chatHistory").onclick = () => window.location.href = "history.html";



// ---------------------
// 🔥 LOGOUT
// ---------------------
document.getElementById("logoutBtn").onclick = async () => {
    await signOut(auth);
    window.location.href = "index.html";
};
