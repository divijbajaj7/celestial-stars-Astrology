import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  predictKundliReading,
  generateAstrologyChatReply,
} from './lib/astrologyService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const val = parseInt(process.argv[portArgIndex + 1], 10);
    if (!isNaN(val)) return val;
  }
  const portEquals = process.argv.find((arg) => arg.startsWith('--port='));
  if (portEquals) {
    const val = parseInt(portEquals.split('=')[1], 10);
    if (!isNaN(val)) return val;
  }
  if (process.env.PORT) {
    const val = parseInt(process.env.PORT, 10);
    if (!isNaN(val)) return val;
  }
  return 3000;
}

const PORT = getPort();

const app = express();

app.use(express.json());

// Kundli Prediction API Route
app.post('/api/predict-kundli', async (req, res) => {
  const { name, dob, tob, pob } = req.body || {};

  if (!name || !dob || !pob) {
    return res.status(400).json({
      error: 'Please provide Name, Date of Birth (DOB), and Place of Birth.',
    });
  }

  const result = await predictKundliReading({ name, dob, tob, pob });
  return res.json(result);
});

// Astrology Chatbot API Route
app.post('/api/chat', async (req, res) => {
  const { messages, message } = req.body || {};
  const userText =
    message ||
    (Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1].content
      : '');

  if (!userText || typeof userText !== 'string' || userText.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide a valid message.' });
  }

  const result = await generateAstrologyChatReply({ message, messages });
  return res.json(result);
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  VITE v8.3.0  ready in dev mode\n`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${PORT}/\n`);
  });
}

startServer();
