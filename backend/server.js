require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Backend is working' });
});

app.post('/api/breakdown', async (req, res) => {
  const { goal } = req.body;
  if (!goal) return res.status(400).json({ error: 'No goal provided' });

  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: `Break down this goal into clear steps: "${goal}"` }]
  });

  res.json({ breakdown: msg.content[0].text });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
