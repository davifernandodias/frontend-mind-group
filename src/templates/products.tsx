
interface ProductsProps {
  children: React.ReactNode;
}

export default function ProductsPage({ children }: ProductsProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Rodapé */}
    </div>
  );
}
