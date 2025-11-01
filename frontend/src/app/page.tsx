"use client";

import { useState, useEffect } from 'react';
import { MoodForm } from '@/components/mood-form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';

const StarField = () => {
  const [stars1, setStars1] = useState<{ top: string; left: string; animationDelay: string }[]>([]);
  const [stars2, setStars2] = useState<{ top: string; left: string; animationDelay: string }[]>([]);
  const [stars3, setStars3] = useState<{ top: string; left: string; animationDelay: string }[]>([]);

  useEffect(() => {
    // This needs to run only on the client to avoid hydration mismatch
    const generateStars = (count: number, setStars: Function) => {
      const newStars = [];
      for (let i = 0; i < count; i++) {
        newStars.push({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * -50}s`,
        });
      }
      setStars(newStars);
    };

    generateStars(50, setStars1);
    generateStars(30, setStars2);
    generateStars(10, setStars3);
  }, []);

  return (
    <>
      <div className="star-field star-field-1">
        {stars1.map((star, i) => (
          <div key={i} className="star" style={{ top: star.top, left: star.left, animationDelay: star.animationDelay }} />
        ))}
      </div>
      <div className="star-field star-field-2">
        {stars2.map((star, i) => (
          <div key={i} className="star" style={{ top: star.top, left: star.left, animationDelay: star.animationDelay }} />
        ))}
      </div>
      <div className="star-field star-field-3">
        {stars3.map((star, i) => (
          <div key={i} className="star" style={{ top: star.top, left: star.left, animationDelay: star.animationDelay }} />
        ))}
      </div>
    </>
  );
};


export default function Home() {
  const [teacherMode, setTeacherMode] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      <StarField />
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center space-x-2 z-10">
        <Label htmlFor="teacher-mode" className="font-semibold text-white/80 cursor-pointer flex items-center gap-2 text-xs sm:text-sm">
          <BookOpen className="h-4 w-4" />
          Teacher Mode
        </Label>
        <Switch
          id="teacher-mode"
          checked={teacherMode}
          onCheckedChange={setTeacherMode}
          className="data-[state=checked]:bg-green-400"
        />
      </div>

      <main className="w-full max-w-md z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">EmotiKids</h1>
          <p className="text-muted-foreground mt-2 text-base sm:text-lg">Kid-safe Text Mood Detector</p>
        </div>
        
        <MoodForm />
        
        {teacherMode && (
          <Card className="mt-8 bg-card/80 backdrop-blur-sm border-dashed animate-in fade-in-50 slide-in-from-bottom-5">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">How it works</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground font-semibold">
                <span>Input</span>
                <ArrowRight className="h-4 w-4" />
                <span>Sentiment</span>
                <ArrowRight className="h-4 w-4" />
                <span>Emoji</span>
                <ArrowRight className="h-4 w-4" />
                <span>Output</span>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="absolute bottom-4 text-center text-xs sm:text-sm text-muted-foreground/80 z-10">
        Built by Harsha C
      </footer>
    </div>
  );
}
