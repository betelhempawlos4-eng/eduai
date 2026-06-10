require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  const { messages, subject } = req.body;

  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_key_here') {
    return res.status(500).json({ error: 'Groq API key not configured. Please add your key to the .env file.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: `You are an expert AI tutor specialised in Computer Science and AI, helping a university student named Yonas who is studying CS & AI.

Your role is to:
- Explain concepts clearly with examples and analogies
- Break down complex topics step by step
- Use code examples when relevant (format with markdown code blocks)
- Be encouraging and supportive
- Keep responses concise but thorough (3-6 sentences for simple questions, more for complex ones)
- When explaining algorithms or code, always include a simple example

Current subject focus: ${subject || 'General CS & AI'}`
          },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Groq API request failed');
    }

    const text = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    res.json({ response: text });

  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅ EduAI is running!`);
  console.log(`👉 Open your browser and go to: http://localhost:${PORT}\n`);
});
