"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { detectMoodAction, type MoodState } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const initialState: MoodState = {
  emoji: null,
  explanation: null,
  sentence: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full text-base sm:text-lg py-5 sm:py-6 rounded-xl shadow-lg">
      {pending ? (
        "Detecting mood..."
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Detect Mood
        </>
      )}
    </Button>
  );
}

export function MoodForm() {
  const [state, formAction] = useFormState(detectMoodAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // This effect could be used to show a toast for errors, for example.
    if (!state.emoji && state.error) {
      // e.g. toast({ title: "Error", description: state.error, variant: "destructive" })
    }
  }, [state]);

  return (
    <Card className="shadow-2xl shadow-primary/10 rounded-2xl bg-card/90 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <form action={formAction} ref={formRef} className="space-y-4">
          <div className="relative">
            <Textarea
              name="sentence"
              placeholder="Type a sentence like 'I am so happy today!'"
              className="min-h-[100px] text-base resize-none rounded-lg pr-4"
              required
              aria-label="Sentence input for mood detection"
            />
          </div>
          {state.error && !state.emoji && (
            <p className="text-sm font-medium text-destructive px-1">{state.error}</p>
          )}
          <SubmitButton />
        </form>

        <AnimatePresence>
          {state.emoji && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-6 text-center"
            >
              <div className="text-7xl sm:text-8xl mb-2" aria-label={`Emoji: ${state.emoji}`}>{state.emoji}</div>
              <p className="font-semibold text-base sm:text-lg text-foreground px-2">{state.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
