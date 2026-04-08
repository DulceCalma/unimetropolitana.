import { useState } from "react";

const quotes = [
  "Respira profundo... todo va a estar bien 💕",
  "Eres más fuerte de lo que crees 🌸",
  "Este momento difícil pasará, como siempre lo hace 🍬",
  "Mereces paz y tranquilidad 🦋",
  "Cada respiro te acerca a la calma 🌈",
  "No tienes que ser perfecto/a, solo tienes que ser tú 💗",
  "El chocolate no resuelve todo... pero ayuda mucho 🍫",
  "Eres más dulce que cualquier caramelo 🍭",
  "Permítete descansar, no todo es urgente 🌺",
  "Tu sonrisa es el mejor postre del mundo 😊",
  "Hoy es un buen día para ser amable contigo 🌷",
  "Las nubes pasan, el sol siempre vuelve ☀️",
  "Abraza tu momento presente con cariño 🤗",
  "Eres suficiente, tal como eres ahora 💐",
  "Un paso a la vez, sin prisa pero sin pausa 🐢",
];

const QuoteBox = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const newQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(random);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="min-h-[180px] rounded-3xl border-4 border-candy-coral bg-candy-cream p-10 shadow-lg flex items-center justify-center">
        <p
          className={`font-serif-display text-2xl md:text-3xl font-semibold leading-relaxed text-foreground transition-all duration-300 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {quote}
        </p>
      </div>
      <button
        onClick={newQuote}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-candy-pink px-10 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
      >
        🐝 Nueva Frase Dulce
      </button>
    </div>
  );
};

export default QuoteBox;
