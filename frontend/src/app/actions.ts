"use server";

import { handleInappropriateLanguage } from "@/ai/flows/handle-inappropriate-language";
import { explainMoodWithContext } from "@/ai/flows/explain-mood-with-context";
import { z } from "zod";

export interface MoodState {
  sentence?: string | null;
  emoji?: string | null;
  explanation?: string | null;
  error?: string | null;
}

async function detectSentiment(
  sentence: string
): Promise<{ sentiment: "happy" | "sad" | "neutral" | "inappropriate"; emoji: string }> {
  try {
    // Allow overriding the backend URL via environment variable when deployed
    // For Netlify set NEXT_PUBLIC_BACKEND_URL or BACKEND_URL in server env
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://127.0.0.1:8000'
    const response = await fetch(`${BACKEND_URL}/api/detect/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ text: sentence }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Server responded with:', await response.text());
      throw new Error('Failed to detect sentiment');
    }

    const data = await response.json();
    return { 
      sentiment: data.mood as "happy" | "sad" | "neutral",
      emoji: data.emoji as string
    };
  } catch (error) {
    console.error('Error in detectSentiment:', error);
    throw error;
  }
}

export async function detectMoodAction(
  prevState: MoodState,
  formData: FormData
): Promise<MoodState> {
  const schema = z.object({
    sentence: z
      .string({
        required_error: "Please enter a sentence.",
      })
      .min(1, { message: "Please enter a sentence." })
      .max(280, { message: "Sentence must be 280 characters or less." }),
  });

  const validatedFields = schema.safeParse({
    sentence: formData.get("sentence"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.sentence?.[0],
    };
  }

  const { sentence } = validatedFields.data;

  try {
    // const inappropriateResult = await handleInappropriateLanguage({ sentence });
    // if (inappropriateResult.emoji && inappropriateResult.explanation) {
    //   return {
    //     sentence,
    //     emoji: inappropriateResult.emoji,
    //     explanation: inappropriateResult.explanation,
    //   };
    // }

    const { sentiment, emoji } = await detectSentiment(sentence);
    let explanation = "";
    if (sentiment === "happy") explanation = "You seem to be feeling happy!";
    if (sentiment === "sad") explanation = "It sounds like you're feeling sad.";
    if (sentiment === "neutral") explanation = "You seem to be feeling neutral.";
    if (sentiment === "inappropriate") explanation = "Inappropriate content detected.";

    return {
      sentence,
      emoji,
      explanation,
    };
  } catch (e) {
    return {
      sentence,
      emoji: "😐",
      explanation: "Error connecting to the server.",
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
