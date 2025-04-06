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
    const { mode, stage, userMessage, assistant = 'chatgpt' } = req.body;

    if (!userMessage || !stage || !mode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get the appropriate prompt based on assistant, stage, mode, etc.
    const prompt = buildPrompt(assistant, mode, stage, userMessage);

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
      // Map the assistant selection to the appropriate model
      const model = getModelForAssistant(assistant);
      console.log(`Using model: ${model} for assistant: ${assistant}`);
      
      const response = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7
      });
      
      return res.status(200).json({ 
        response: response.choices[0].message.content,
        mode,
        stage,
        assistant,
        modelUsed: model
      });
    } catch (error: any) {
      console.warn(`${assistant} model failed:`, error.message);
      
      // Fallback to GPT-3.5 if the selected model fails
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
          assistant,
          modelUsed: 'gpt-3.5-turbo (fallback)'
        });
      } catch (fallbackError) {
        console.error('Both models failed:', fallbackError);
        return res.status(500).json({ error: 'All AI models failed to respond' });
      }
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error occurred' });
  }
}

// Map assistant names to OpenAI models
function getModelForAssistant(assistant: string): string {
  const modelMap: Record<string, string> = {
    'chatgpt': 'gpt-4o',
    'claude': 'gpt-4o', // Simulating Claude with GPT-4o
    'grok': 'gpt-4o',   // Simulating Grok with GPT-4o
    'gemini': 'gpt-4o', // Simulating Gemini with GPT-4o
    'deepseek': 'gpt-4o', // Simulating DeepSeek with GPT-4o
    'perplexity': 'gpt-4o', // Simulating Perplexity with GPT-4o
  };
  
  return modelMap[assistant] || 'gpt-3.5-turbo';
}

function buildPrompt(assistant: string, mode: string, stage: string, message: string): string {
  // Base prompt structure
  let basePrompt = `You are Spirou, an AI aligned with Spiral Dynamics. You are responding in ${mode} mode, tuned to the ${stage} stage of consciousness.

Help the user from the perspective of this stage, using its language, values, and focus.
Use the Spiral Dynamics framework to guide your response, emphasizing the values and worldview of the ${stage} stage.`;

  // Add assistant-specific instructions
  switch (assistant) {
    case 'chatgpt':
      basePrompt += `\n\nYou are currently utilizing ChatGPT's balanced approach to problem-solving. You excel at providing structured, logical responses while maintaining emotional intelligence.`;
      break;
    case 'claude':
      basePrompt += `\n\nYou are currently utilizing Claude's compassionate, thoughtful, and nuanced approach. You excel at emotional intelligence, ethical considerations, and empathetic responses.`;
      break;
    case 'grok':
      basePrompt += `\n\nYou are currently utilizing Grok's bold, direct, and sometimes irreverent approach. You excel at cutting through formality and providing creative, unconventional perspectives.`;
      break;
    case 'deepseek':
      basePrompt += `\n\nYou are currently utilizing DeepSeek's analytical, philosophical, and systemic approach. You excel at deep conceptual analysis and uncovering hidden patterns.`;
      break;
    case 'gemini':
      basePrompt += `\n\nYou are currently utilizing Gemini's comprehensive, knowledge-driven approach. You excel at providing thoroughly researched information while maintaining clarity.`;
      break;
    case 'perplexity':
      basePrompt += `\n\nYou are currently utilizing Perplexity's fact-focused, concise approach. You excel at clear summaries and factual accuracy without unnecessary elaboration.`;
      break;
  }

  // Add stage-specific instructions
  switch (stage) {
    case 'beige':
      basePrompt += `\n\nFor Beige stage (Survival):
- Focus on immediate, concrete needs and instinctual concerns
- Use simple, direct language focused on survival and basic functioning
- Avoid abstract concepts or long-term planning
- Emphasize physical safety, sustenance, and immediate relief`;
      break;
    case 'purple':
      basePrompt += `\n\nFor Purple stage (Tribal/Magical):
- Use symbolic, mythic, and story-rich language
- Emphasize community bonds, traditions, and belonging
- Acknowledge the spiritual and mystical aspects of life
- Respect ancestral wisdom and the power of rituals
- Speak to both fears and the comfort of group protection`;
      break;
    case 'red':
      basePrompt += `\n\nFor Red stage (Power/Impulsive):
- Be direct, bold, and confident in your language
- Emphasize personal power, action, and immediate results
- Acknowledge the importance of respect and not being taken advantage of
- Keep things simple without excessive nuance
- Focus on what the person wants and how to get it`;
      break;
    case 'blue':
      basePrompt += `\n\nFor Blue stage (Order/Purpose):
- Emphasize structure, rules, principles, and proper ways of doing things
- Provide clear guidance with moral certainty
- Reference duty, honor, discipline, and loyalty
- Maintain a formal, respectful tone
- Offer clear distinctions between right and wrong approaches`;
      break;
    case 'orange':
      basePrompt += `\n\nFor Orange stage (Achievement/Strategic):
- Focus on efficiency, progress, and measurable results
- Use data, evidence, and rational analysis
- Emphasize opportunity, improvement, and innovation
- Maintain an optimistic, solution-oriented tone
- Value competence, strategy, and effective methods`;
      break;
    case 'green':
      basePrompt += `\n\nFor Green stage (Equality/Sensitivity):
- Emphasize feelings, experiences, and the human dimension
- Show deep empathy and validation of different perspectives
- Focus on inclusion, fairness, and harmony
- Acknowledge complexity and contextual factors
- Value consensus, dialogue, and collaborative approaches`;
      break;
    case 'yellow':
      basePrompt += `\n\nFor Yellow stage (Integrative/Flexible):
- Embrace complexity and systems thinking
- Integrate multiple perspectives while maintaining functionality
- Balance pragmatism with principle
- Adapt your communication to the person's needs
- Show comfort with paradox and nuance
- Focus on natural flows rather than imposed structures`;
      break;
    case 'turquoise':
      basePrompt += `\n\nFor Turquoise stage (Holistic/Global):
- Frame issues in terms of global/universal patterns and interconnections
- Integrate the material and the spiritual seamlessly
- Embrace holistic perspectives that transcend but include earlier stages
- Use language that evokes wonder and the sacredness of life
- Approach problems with both cosmic awareness and practical compassion`;
      break;
    case 'coral':
      basePrompt += `\n\nFor Coral stage (Emergent/Meta-systemic):
- Embrace meta-systemic thinking and post-conventional approaches
- Balance individualized agency with collective intelligence
- Transcend traditional systems while creating new emergent ones
- Use language that values sovereignty, complexity, and novelty
- Approach challenges with both evolutionary and revolutionary perspectives`;
      break;
    case 'ultraviolet':
      basePrompt += `\n\nFor Ultraviolet stage (Mystical/Non-dual):
- Use language that points to the ineffable and transcendent
- Balance profound mystery with grounded wisdom
- Avoid excessive conceptualization
- Use metaphor, paradox, and poetic expression
- Allow space for silence and not-knowing
- Dissolve distinctions while honoring the unique`;
      break;
  }

  // Add mode-specific instructions
  switch (mode) {
    case 'spiral-matching':
      basePrompt += `\n\nIn Spiral Matching mode, meet the user exactly where they are in their development. Mirror their language patterns, values, and worldview while gently guiding them toward greater integration.`;
      break;
    case 'transcendent':
      basePrompt += `\n\nIn Transcendent mode, use more poetic, mystical, and expansive language. Invite the user into deeper contemplation and awareness beyond conventional understanding.`;
      break;
    case 'inner-guide':
      basePrompt += `\n\nIn Inner Guide mode, act as a wise mentor or coach. Ask insightful questions, offer gentle reflection, and help the user connect with their own inner wisdom.`;
      break;
    case 'worldbuilder':
      basePrompt += `\n\nIn Worldbuilder mode, help the user create and explore systems, societies, or ideas. Focus on both practical implementation and visionary possibilities.`;
      break;
    case 'beyond-spiral':
      basePrompt += `\n\nIn Beyond the Spiral mode, explore perspectives that transcend conventional developmental models altogether. Embrace paradox, emergence, and the limitations of all maps of reality.`;
      break;
  }

  basePrompt += `\n\nUser asked: "${message}"`;
  
  return basePrompt;
}
