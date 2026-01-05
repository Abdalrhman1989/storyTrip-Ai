const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

async function generateStory(prompt) {
    console.log("DEBUG: generateStory called with prompt length:", prompt.length);
    if (!genAI) {
        console.warn("DEBUG: genAI instance is null/undefined. Key present?", !!process.env.GEMINI_API_KEY);
        // ... return mock
        return {
            title: "Mock Trip (No API Key)",
            genre: "Simulation",
            music: "Cinematic Build - 100 BPM",
            story: "This is a simulated story because the Server does not have a GEMINI_API_KEY configured. Please check your .env file.",
            script: [{ time: "0:00", text: "Please configure your API keys." }],
            timeline: [],
            caption: "Configure keys in .env to unleash AI! 🚀"
        };
    }

    try {
        console.log("DEBUG: Initializing Gemini model gemini-2.0-flash");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        console.log("DEBUG: Calling generateContent...");

        const systemPrompt = `You are a cinematic travel storyteller and director. 
        Create a valid JSON response with the following keys:
        - title (string)
        - genre (string)
        - story (short emotive narrative string)
        - script (array of objects with 'time' and 'text')
        - timeline (array of objects with 'type' [video/image], 'duration', 'desc')
        - music (style/mood/bpm string)
        - caption (string for social media)
        
        Do not acknowledge. Output ONLY raw JSON. No markdown formatting.`;

        const result = await model.generateContent(`${systemPrompt}\n\nUser Input: ${prompt}`);
        console.log("DEBUG: generateContent result received.");
        const response = await result.response;
        let text = response.text();
        console.log("DEBUG: Raw text response:", text.substring(0, 100) + "...");

        // Clean up markdown code blocks if Gemini adds them
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("DEBUG: GEMINI GEN CONTENT ERROR:", error);
        throw error;
    }
}

async function generateVoiceover(text) {
    if (!process.env.ELEVENLABS_API_KEY || !process.env.ELEVENLABS_VOICE_ID) {
        console.warn("ElevenLabs keys missing, skipping voice generation.");
        return null;
    }

    try {
        const response = await axios({
            method: 'post',
            url: `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
            headers: {
                'Accept': 'audio/mpeg',
                'xi-api-key': process.env.ELEVENLABS_API_KEY,
                'Content-Type': 'application/json',
            },
            data: {
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            },
            responseType: 'arraybuffer'
        });
        return response.data;
    } catch (error) {
        console.error("Voiceover error:", error.message);
        return null;
    }
}

module.exports = { generateStory, generateVoiceover };
