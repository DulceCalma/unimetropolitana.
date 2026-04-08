import QuoteBox from "@/components/QuoteBox";
import BreathingExercise from "@/components/BreathingExercise";
import GummyGame from "@/components/GummyGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-candy-pink/20 via-background to-accent/30 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="font-display text-6xl md:text-8xl text-primary drop-shadow-lg">
            Dulce Calma
          </h1>
          <p className="font-serif-display text-xl md:text-2xl font-semibold text-muted-foreground">
            Vamos a derretir tu estrés 🍫
          </p>
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
