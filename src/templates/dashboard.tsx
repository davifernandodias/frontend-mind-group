import Footer from "@/components/Footer";
import { DashboardHeader } from "@/components/Header";

interface DashboardProps {
  children: React.ReactNode;
}

export default function DashboardPage({ children }: DashboardProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <DashboardHeader />

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
