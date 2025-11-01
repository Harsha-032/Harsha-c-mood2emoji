'use server';

/**
 * @fileOverview A mood explanation AI agent that provides kid-friendly explanations
 * of detected moods, incorporating the original sentence for context.
 *
 * - explainMoodWithContext - A function that handles the mood explanation process.
 * - ExplainMoodWithContextInput - The input type for the explainMoodWithContext function.
 * - ExplainMoodWithContextOutput - The return type for the explainMoodWithContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainMoodWithContextInputSchema = z.object({
  sentence: z.string().describe('The sentence to analyze for mood.'),
  sentiment: z.string().describe('The detected sentiment of the sentence (e.g., happy, sad, neutral).'),
});
export type ExplainMoodWithContextInput = z.infer<typeof ExplainMoodWithContextInputSchema>;

const ExplainMoodWithContextOutputSchema = z.object({
  explanation: z.string().describe('A kid-friendly explanation of the detected mood, incorporating the original sentence.'),
});
export type ExplainMoodWithContextOutput = z.infer<typeof ExplainMoodWithContextOutputSchema>;

export async function explainMoodWithContext(input: ExplainMoodWithContextInput): Promise<ExplainMoodWithContextOutput> {
  return explainMoodWithContextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainMoodWithContextPrompt',
  input: {schema: ExplainMoodWithContextInputSchema},
  output: {schema: ExplainMoodWithContextOutputSchema},
  prompt: `You are a helpful AI assistant that explains the mood of a sentence in a kid-friendly way.

  Given the following sentence and its detected sentiment, provide a short explanation that helps a child understand why the app chose a particular emoji.

  Sentence: {{{sentence}}}
  Sentiment: {{{sentiment}}}

  Explanation:`,
});

const explainMoodWithContextFlow = ai.defineFlow(
  {
    name: 'explainMoodWithContextFlow',
    inputSchema: ExplainMoodWithContextInputSchema,
    outputSchema: ExplainMoodWithContextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
