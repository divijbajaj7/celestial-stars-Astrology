import { predictKundliReading } from '../lib/astrologyService.js';

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

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const dob = typeof body.dob === 'string' ? body.dob.trim() : '';
  const tob = typeof body.tob === 'string' ? body.tob.trim() : '';
  const pob = typeof body.pob === 'string' ? body.pob.trim() : '';

  if (!name || !dob || !pob) {
    return res.status(400).json({
      error: 'Please provide Name, Date of Birth (DOB), and Place of Birth.',
    });
  }

  const result = await predictKundliReading({ name, dob, tob, pob });
  return res.status(200).json(result);
}
