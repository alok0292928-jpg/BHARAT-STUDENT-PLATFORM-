function generateRevision(){
    const chapter = document.getElementById("chapterInput").value.trim();

    if(!chapter) return alert("Enter any chapter name!");

    const box = document.getElementById("revBox");
    box.classList.remove("hidden");
    box.innerText = "Preparing revision notes… 🧠📘";

    const prompt = `
    Create a 5-minute revision note for:
    ${chapter}

    Include:
    - Simple Definitions
    - Key Points
    - Important Formulas (if any)
    - Quick Examples
    - Exam Tips
    - Final Short Summary
    `;

    getRevisionFromAI(prompt);
}

async function getRevisionFromAI(prompt){
    try{
        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=gen-lang-client-0755790144",
            {
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({
                    contents:[{parts:[{text:prompt}]}]
                })
            }
        );

        const data = await res.json();

        document.getElementById("revBox").innerText =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Unable to create revision notes.";
    }
    catch(e){
        document.getElementById("revBox").innerText = "Error creating revision!";
    }
}