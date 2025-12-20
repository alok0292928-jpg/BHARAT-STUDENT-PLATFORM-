import { 
    getAuth, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    getDatabase, ref, onValue
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const auth = getAuth();
const db = getDatabase();

let USER_ID = null;

onAuthStateChanged(auth, (user) => {
    if (!user) window.location="../auth.html";
    USER_ID = user.uid;
    loadWeeklyData();
});

function loadWeeklyData(){
    const start = getLast7Days();

    onValue(ref(db, "planner/" + USER_ID), (snap)=>{
        let data = { Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0, Sun:0 };

        if(snap.exists()){
            const tasks = snap.val();

            for(const id in tasks){
                const t = tasks[id];

                if(t.completed && t.time){
                    const day = getDayName(t.time);
                    if(data[day] !== undefined){
                        data[day]++;
                    }
                }
            }
        }

        drawGraph([
            data.Mon, data.Tue, data.Wed, data.Thu, data.Fri, data.Sat, data.Sun
        ]);
    });
}

function getDayName(timestamp){
    const d = new Date(timestamp);
    return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
}

function getLast7Days(){
    const today = new Date();
    today.setHours(0,0,0,0);
    return today.getTime() - 6 * 24 * 60 * 60 * 1000;
}

function drawGraph(values){
    const ctx = document.getElementById("progressChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            datasets: [{
                label: "Tasks Completed",
                data: values,
                backgroundColor: "#2563eb"
            }]
        },
        options: {
            plugins:{ legend:{ display:false }},
            scales:{
                y:{ beginAtZero:true }
            }
        }
    });
}