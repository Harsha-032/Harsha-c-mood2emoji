'use server';
/**
 * @fileOverview Handles the detection of inappropriate language and provides a kid-safe response.
 *
 * - handleInappropriateLanguage - A function that takes a sentence as input and returns an emoji and explanation.
 * - HandleInappropriateLanguageInput - The input type for the handleInappropriateLanguage function.
 * - HandleInappropriateLanguageOutput - The return type for the handleInappropriateLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HandleInappropriateLanguageInputSchema = z.object({
  sentence: z.string().describe('The sentence to analyze for inappropriate language.'),
});
export type HandleInappropriateLanguageInput = z.infer<typeof HandleInappropriateLanguageInputSchema>;

const HandleInappropriateLanguageOutputSchema = z.object({
  emoji: z.string().describe('The emoji to display (😐 if inappropriate).'),
  explanation: z.string().describe('The explanation text (Let’s use kind words if inappropriate).'),
});
export type HandleInappropriateLanguageOutput = z.infer<typeof HandleInappropriateLanguageOutputSchema>;

export async function handleInappropriateLanguage(input: HandleInappropriateLanguageInput): Promise<HandleInappropriateLanguageOutput> {
  return handleInappropriateLanguageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'handleInappropriateLanguagePrompt',
  input: {schema: HandleInappropriateLanguageInputSchema},
  output: {schema: HandleInappropriateLanguageOutputSchema},
  prompt: `You are a safety assistant for a children's application.

  Analyze the following sentence and determine if it contains offensive, inappropriate, or unkind language.

  If the sentence is appropriate return an object with empty strings for the emoji and explanation.

  If the sentence contains inappropriate language, return the neutral emoji \"😐\" and the explanation \"Let’s use kind words.\".

  Sentence: {{{sentence}}} `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const handleInappropriateLanguageFlow = ai.defineFlow(
  {
    name: 'handleInappropriateLanguageFlow',
    inputSchema: HandleInappropriateLanguageInputSchema,
    outputSchema: HandleInappropriateLanguageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
