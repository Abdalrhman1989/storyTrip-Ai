const express = require('express');
const router = express.Router();
const { generateStory, generateVoiceover } = require('../services/ai');
const db = require('../db');

router.post('/', async (req, res) => {
    try {
        const { destination, dates, mood, platform } = req.body;

        const prompt = `Create a ${mood} travel story for a trip to ${destination} in ${dates}. Platform: ${platform}. Make it feel immersive and cinematic.`;

        // 1. Generate Story Metadata & Script
        const storyData = await generateStory(prompt);

        // 2. Generate Voiceover (using the first line as a sample for speed)
        // In production, you'd generate the full script or chunks.
        const voiceoverBuffer = await generateVoiceover(storyData.script[0].text);

        // Note: For MVP we aren't storing the audio buffer in DB to avoid bloat. 
        // In a real app, upload to S3 and store the URL. 
        // We will just return the fact that we generated it.

        const { title, genre, story, script, timeline, music, caption } = storyData;

        // 3. Save to Database
        const result = await db.query(
            `INSERT INTO stories (title, genre, story, script, timeline, music, caption) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING id`,
            [title, genre, story, JSON.stringify(script), JSON.stringify(timeline), music, caption]
        );

        const id = result.rows[0].id;

        res.json({ id, ...storyData });
    } catch (error) {
        console.error("Generation Error:", error);

        // Handle Gemini Rate Limits (429)
        if (error.status === 429 || (error.message && error.message.includes('429'))) {
            return res.status(429).json({ error: "AI Rate Limit Exceeded. Please wait 60 seconds and try again. (Free Tier Limit)" });
        }

        // Handle Overloaded (503)
        if (error.status === 503 || (error.message && error.message.includes('503'))) {
            return res.status(503).json({ error: "AI Service Overloaded. Please try again in a moment." });
        }

        res.status(500).json({ error: "Failed to generate story: " + (error.message || "Unknown error") });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM stories ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error("Fetch All Error:", error);
        res.status(500).json({ error: "Failed to fetch stories" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM stories WHERE id = $1', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Story not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch story" });
    }
});

module.exports = router;
