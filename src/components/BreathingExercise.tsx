import { useState, useEffect, useRef } from "react";

type Phase = "idle" | "inhale" | "hold" | "exhale";

const BreathingExercise = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<number | null>(null);

  const phaseConfig = {
    inhale: { duration: 4, label: "Inhala...", next: "hold" as Phase },
    hold: { duration: 7, label: "Mantén...", next: "exhale" as Phase },
    exhale: { duration: 8, label: "Exhala...", next: "inhale" as Phase },
  };

  useEffect(() => {
    if (phase === "idle") return;

    const config = phaseConfig[phase];
    setSeconds(config.duration);

    timerRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          if (phase === "exhale") setCycles((c) => c + 1);
          setPhase(config.next);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const start = () => {
    setCycles(0);
    setPhase("inhale");
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("idle");
    setSeconds(0);
  };

  const circleScale = phase === "inhale" ? "scale-150" : phase === "hold" ? "scale-150" : phase === "exhale" ? "scale-100" : "scale-100";
  const circleDuration = phase === "inhale" ? "duration-[4s]" : phase === "hold" ? "duration-[7s]" : phase === "exhale" ? "duration-[8s]" : "";

  return (
    <div className="mt-8 rounded-3xl border-4 border-candy-coral bg-card p-8 shadow-lg">
      <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-primary mb-6">
        🌬️ Respiración 4-7-8
      </h2>

      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center h-48 w-48">
          <div
            className={`absolute h-32 w-32 rounded-full bg-candy-mint/40 transition-transform ease-in-out ${circleScale} ${circleDuration}`}
          />
          <div
            className={`absolute h-24 w-24 rounded-full bg-candy-mint/60 transition-transform ease-in-out ${circleScale} ${circleDuration}`}
          />
          <span className="relative z-10 text-4xl">
            {phase === "idle" ? "🧘" : phase === "inhale" ? "🌸" : phase === "hold" ? "✨" : "🍃"}
          </span>
        </div>

        {phase !== "idle" && (
          <div className="text-center animate-fade-in">
            <p className="font-serif-display text-2xl font-semibold text-foreground">
              {phaseConfig[phase].label}
            </p>
            <p className="text-5xl font-bold text-primary mt-2">{seconds}</p>
            <p className="text-muted-foreground mt-1">Ciclos: {cycles}</p>
          </div>
        )}

        {phase === "idle" ? (
          <button
            onClick={start}
            className="rounded-full bg-gradient-to-r from-secondary to-candy-mint px-10 py-4 text-lg font-bold text-secondary-foreground shadow-lg transition-all hover:scale-105 hover:-translate-y-1"
          >
            🌬️ Comenzar Respiración
          </button>
        ) : (
          <button
            onClick={stop}
            className="rounded-full border-2 border-primary bg-card px-8 py-3 text-base font-bold text-primary shadow transition-all hover:scale-105"
          >
            ⏹️ Detener
          </button>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
