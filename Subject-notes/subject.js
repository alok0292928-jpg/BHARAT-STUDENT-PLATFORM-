function generateNotes(){
    const subject = document.getElementById("subjectSelect").value;
    const topic = document.getElementById("topicInput").value.trim();

    if(!topic) return alert("Enter a topic!");

    const box = document.getElementById("notesBox");
    box.classList.remove("hidden");
    box.innerText = "Generating notes… 🤖📘";

    const prompt = `
    Create detailed study notes for the topic: ${topic}
    Subject: ${subject}

    Provide:
    - Simple explanation
    - Key points
    - Important formulas (if any)
    - Examples
    - Exam-focused questions
    - Final summary
    `;

    getNotesFromAI(prompt);
}

async function getNotesFromAI(prompt){
    try {
        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=gen-lang-client-0755790144",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const data = await res.json();

        document.getElementById("notesBox").innerText =
            data.candidates?.[0]?.content?.parts?.[0]?.text || "AI could not generate notes.";
    }
    catch(e){
        document.getElementById("notesBox").innerText = "Error generating notes!";
    }
}