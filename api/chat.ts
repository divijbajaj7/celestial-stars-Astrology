import { generateAstrologyChatReply } from '../lib/astrologyService.js';

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body: Record<string, unknown> = {};
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON request body.' });
    }
  } else if (req.body && typeof req.body === 'object') {
    body = req.body as Record<string, unknown>;
  }

  const message = typeof body.message === 'string' ? body.message : undefined;
  const messages = Array.isArray(body.messages)
    ? (body.messages as Array<{ role: string; content: string }>)
    : undefined;

  const userText =
    message ||
    (messages && messages.length > 0 ? messages[messages.length - 1]?.content : '');

  if (!userText || typeof userText !== 'string' || userText.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide a valid message.' });
  }

  const result = await generateAstrologyChatReply({ message, messages });
  return res.status(200).json(result);
}
