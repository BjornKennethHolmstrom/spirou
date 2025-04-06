import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ✅ CORS Headers - Allowing requests from any origin (including GitHub Pages)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for now
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // ✅ Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { mode, stage, userMessage } = req.body;

    if (!userMessage || !stage || !mode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = buildPrompt(mode, stage, userMessage);

    const messages = [
      {
        role: 'system',
        content: prompt
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0.7
      });
      
      return res.status(200).json({ 
        response: response.choices[0].message.content,
        mode,
        stage
      });
    } catch (error: any) {
      console.warn('GPT-4o failed, falling back to 3.5:', error.message);

      try {
        const fallback = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages,
          temperature: 0.7
        });
        
        return res.status(200).json({ 
          response: fallback.choices[0].message.content,
          mode,
          stage,
          modelUsed: 'gpt-3.5-turbo'
        });
      } catch (fallbackError) {
        console.error('Both models failed:', fallbackError);
        return res.status(500).json({ error: 'Both AI models failed to respond' });
      }
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error occurred' });
  }
}

function buildPrompt(mode: string, stage: string, message: string): string {
  return `You are Spirou, an AI aligned with Spiral Dynamics. You are responding in ${mode} mode, tuned to the ${stage} stage of consciousness.

Help the user from the perspective of this stage, using its language, values, and focus.
Use the Spiral Dynamics framework to guide your response, emphasizing the values and worldview of the ${stage} stage.

User asked: "${message}"`;
}
