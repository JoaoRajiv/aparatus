import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    // O z-[9999] garante que fique por cima de tudo (até do Header z-50)
    // bg-background/80 dá 80% de opacidade usando a cor de fundo do seu tema
    // backdrop-blur-sm embaça o que estiver no layout por baixo
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
      <Loader2 className="size-10 animate-spin text-primary" />
      <p className="text-muted-foreground text-sm font-semibold animate-pulse uppercase tracking-widest">
        Carregando
      </p>
    </div>
  );
}
