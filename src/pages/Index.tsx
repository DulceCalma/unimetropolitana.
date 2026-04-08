import { useEffect, useRef, useState } from "react";
import QuoteBox from "@/components/QuoteBox";
import BreathingExercise from "@/components/BreathingExercise";
import GummyGame from "@/components/GummyGame";

const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e3.mp3";

const Index = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-candy-pink/20 via-background to-accent/30 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="font-display text-6xl md:text-8xl text-primary drop-shadow-lg">
            🍫 Dulce Calma 🍭
          </h1>
          <p className="font-serif-display text-xl md:text-2xl font-semibold text-muted-foreground">
            Vamos a derretir tu estrés 🍫
          </p>
          <button
            onClick={toggleMusic}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-candy-mint/60 px-6 py-2 text-sm font-semibold text-foreground transition-all hover:bg-candy-mint"
          >
            {musicPlaying ? "🔇 Pausar Música" : "🎵 Música Relajante"}
          </button>
        </header>

        {/* Main card */}
        <main className="rounded-[2rem] border-4 border-border bg-card p-8 md:p-12 shadow-2xl shadow-primary/10 space-y-8">
          <QuoteBox />
          <BreathingExercise />
          <GummyGame />
        </main>

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="font-serif-display text-lg text-muted-foreground">
            <span className="animate-float inline-block mr-2">🍫</span>
            Eres más dulce que cualquier chocolate
            <span className="animate-float inline-block ml-2">🍭</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
