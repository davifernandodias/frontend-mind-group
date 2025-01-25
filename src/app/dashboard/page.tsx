import DashboardPage from "@/templates/dashboard";
import CardProducts from "@/components/ui/card-products";
import { PieCharData } from "@/components/ui/pie-char";
import { BarCharData } from "@/components/ui/bar-char";

export default function Page() {
  const products = [
    { name: "Produto 1", description: "Descrição do produto 1", price: 59.99 },
    { name: "Produto 2", description: "Descrição do produto 2", price: 99.99 },
    { name: "Produto 3", description: "Descrição do produto 3", price: 149.99 },
  ];

  return (
    <DashboardPage>
      <div className="container mx-auto p-6">
        {/* Linha de Gráficos */}
        <div className="container mx-auto  p-4">
          {/* Linha de Gráficos */}
          <div className="flex flex-col lg:flex-row  gap-4 mb-6">
            {/* Gráfico de Pizza */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-2 shadow">

              <PieCharData />
            </div>

            {/* Gráfico de Barras */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-2 shadow">
              <BarCharData />
            </div>
          </div>
        </div>

        {/* Linha de Cards dos Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <CardProducts
              key={index}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </DashboardPage>
  );
}
