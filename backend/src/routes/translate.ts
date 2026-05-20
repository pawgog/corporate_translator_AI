import { Router } from 'express';
import OpenAI from 'openai';

import { translateSchema } from '../validation/translateSchema';

const router = Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async(req,res)=>{
 try{
   const {text,audience,tone}=translateSchema.parse(req.body);

   const completion = await client.chat.completions.create({
      model:'gpt-4o-mini',
      temperature:0.7,
      messages: [
        {
          role: "system",
          content: `
            You are a professional mediator and corporate communication expert.

            Your task:
            - Transform emotional feedback into diplomatic communication.
            - Keep the core meaning.
            - Remove aggression and insults.
            - Adjust the style strictly according to the parameters provided by the user:
              Recipient: ${audience} (available options: manager, peer, client, report)
              Tone: ${tone} (available options: professional, friendly, direct)

            IMPORTANT:
            Always answer in the SAME language as the user's message.

            Your primary task is to rewrite ONLY:
            - complaints
            - frustrations
            - criticism
            - negative feedback
            - emotionally charged workplace communication

            If the input does NOT contain:
            - dissatisfaction
            - frustration
            - criticism
            - conflict
            - complaint
            - workplace feedback

            DO NOT rewrite it.

            If the text is not feedback or a complaint (e.g., it is a food recipe or a random string of words), 
            respond with an equivalent message in the user's language.

            Examples:

            Input:
            "I prefer to spend holidays in Bali"

            Output:
            "This does not appear to be workplace feedback..."

            Input:
            "Recipe for pancakes"

            Output:
            "This does not appear to be workplace feedback..."

            Input:
            "My manager ignored deadlines and communication was terrible"

            → Rewrite

            Input:
            "The deployment was a disaster"

            → Rewrite            `,
        },
        {
          role: "user",
          content: text,
        },
      ]
   });
   res.json({ translatedText: completion.choices[0].message.content });
 } catch (err: unknown) {
   const message = err instanceof Error ? err.message : String(err);
   res.status(400).json({ error: message });
 }
});

export default router;
