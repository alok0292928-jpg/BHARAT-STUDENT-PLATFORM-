let IMAGE_URL = null;

// Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
    apiKey: "public_223k2XG77nda119Cf6ssD7yx4xrE"
});

// Upload image
async function uploadImage(event){
    const file = event.target.files[0];
    if(!file) return;

    document.getElementById("uploadStatus").innerText = "Uploading…";

    const { fileUrl } = await uploadManager.upload({ data:file });

    IMAGE_URL = fileUrl;

    document.getElementById("uploadStatus").innerText = "Image uploaded ✔";
    document.getElementById("preview").classList.remove("hidden");
    document.getElementById("preview").innerHTML = `<img src="${fileUrl}" />`;
}

// Solve homework
async function solveHomework(){
    if(!IMAGE_URL){
        return alert("Please upload an image first.");
    }

    const answerBox = document.getElementById("answerBox");
    answerBox.classList.remove("hidden");
    answerBox.innerText = "Reading question… 🤖📖";

    const prompt = `
    Solve the question in this image carefully:
    ${IMAGE_URL}

    Provide:
    1. Step-by-step explanation
    2. Correct final answer
    3. Easy summary
    4. If it's math → show proper steps
    5. If it's theory → simple explanation
    `;

    const ai = await askGeminiVision(prompt);

    answerBox.innerText = ai;
}

// Gemini Vision request
async function askGeminiVision(prompt){
    try {
        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=gen-lang-client-0755790144",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    contents:[{parts:[{text:prompt}]}]
                })
            }
        );

        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not solve the question.";
    }
    catch(e){
        return "Error solving homework.";
    }
}