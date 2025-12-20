function generateQuiz(){
    const sub = document.getElementById("subjectSelect").value;
    const topic = document.getElementById("topicInput").value;
    const diff = document.getElementById("difficulty").value;

    if(!topic) return alert("Enter a topic!");

    const box = document.getElementById("quizBox");
    box.classList.remove("hidden");
    box.innerText = "Generating Quiz… 🤖🎯";

    const prompt = `
    Create a quiz for:
    Subject: ${sub}
    Topic: ${topic}
    Difficulty: ${diff}

    Provide:
    - 5 MCQs (with A/B/C/D options)
    - 5 True/False
    - 5 Short questions
    - Answer key at the end
    `;

    getQuizFromAI(prompt);
}

async function getQuizFromAI(prompt){
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

        document.getElementById("quizBox").innerText =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Unable to generate quiz";
    }
    catch(e){
        document.getElementById("quizBox").innerText = "Error generating quiz!";
    }
}