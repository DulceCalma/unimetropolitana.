import { useState, useEffect, useRef, useCallback } from "react";

const GUMMIES = ["🍬", "🍭", "🧁", "🍩", "🍪", "🎂", "🍰", "🍫", "🍡", "🍮"];
const GAME_DURATION = 30;

interface Gummy {
  id: number;
  emoji: string;
  x: number;
  y: number;
  popping: boolean;
}

const GummyGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gummies, setGummies] = useState<Gummy[]>([]);
  const [running, setRunning] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const nextId = useRef(0);
  const spawnRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const spawnGummy = useCallback(() => {
    const gummy: Gummy = {
      id: nextId.current++,
      emoji: GUMMIES[Math.floor(Math.random() * GUMMIES.length)],
      x: Math.random() * 85 + 5,
      y: Math.random() * 75 + 5,
      popping: false,
    };
    setGummies((prev) => [...prev.slice(-12), gummy]);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGummies([]);
    setRunning(true);
    nextId.current = 0;
  };

  const stopGame = useCallback(() => {
    setRunning(false);
    setGummies([]);
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setHighScore((h) => Math.max(h, score));
  }, [score]);

  useEffect(() => {
    if (!running) return;
    spawnRef.current = window.setInterval(spawnGummy, 800);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, spawnGummy, stopGame]);

  const catchGummy = (id: number) => {
    setGummies((prev) =>
      prev.map((g) => (g.id === id ? { ...g, popping: true } : g))
    );
    setScore((s) => s + 1);
    setTimeout(() => {
      setGummies((prev) => prev.filter((g) => g.id !== id));
    }, 300);
  };

  return (
    <div className="mt-8 rounded-3xl border-4 border-candy-coral bg-card p-8 shadow-lg">
      <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-primary mb-2">
        🎮 ¡Aplasta Gomitas!
      </h2>
      <p className="text-muted-foreground mb-4">
        Haz clic en los dulces antes de que se acumulen. ¡Libera tu estrés!
      </p>

      <div className="relative w-full h-72 rounded-2xl border-4 border-dashed border-candy-pink bg-muted/30 overflow-hidden mb-4">
        {gummies.map((g) => (
          <span
            key={g.id}
            onClick={() => !g.popping && catchGummy(g.id)}
            className={`absolute text-4xl md:text-5xl cursor-pointer select-none transition-transform hover:scale-125 ${
              g.popping ? "animate-pop" : ""
            }`}
            style={{ left: `${g.x}%`, top: `${g.y}%` }}
          >
            {g.emoji}
          </span>
        ))}
        {!running && gummies.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl animate-float">🍬</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
        <span className="font-bold text-lg text-primary">
          Puntuación: {score}
        </span>
        <span className="text-muted-foreground">|</span>
        <span className="font-bold text-lg text-foreground">
          Tiempo: {timeLeft}s
        </span>
        {highScore > 0 && (
          <>
            <span className="text-muted-foreground">|</span>
            <span className="font-bold text-lg text-secondary-foreground">
              🏆 Récord: {highScore}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {!running ? (
          <button
            onClick={startGame}
            className="rounded-full bg-gradient-to-r from-primary to-candy-pink px-8 py-3 text-base font-bold text-primary-foreground shadow-lg transition-all hover:scale-105"
          >
            ▶️ Iniciar Juego
          </button>
        ) : (
          <button
            onClick={stopGame}
            className="rounded-full border-2 border-primary bg-card px-8 py-3 text-base font-bold text-primary shadow transition-all hover:scale-105"
          >
            ⏹️ Detener
          </button>
        )}
      </div>
    </div>
  );
};

export default GummyGame;
