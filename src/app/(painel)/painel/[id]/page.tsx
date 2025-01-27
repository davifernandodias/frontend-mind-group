"use client"

import { useEffect, useState } from "react";
import CardProducts from "@/components/ui/card-products";
import Graphics from "@/components/Graphics";
import { Product } from "@/interfaces/productInterfaces";
import { fetchProducts } from "@/services/productService"; // Importando o serviço de produtos


export default function Page() {
  const [products, setProducts] = useState<Product[]>([]); // Definindo o tipo como Product[]

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const data = await fetchProducts();  // Usando o serviço para buscar os produtos
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndSetProducts();
  }, []); // Esse efeito vai rodar apenas uma vez, ao carregar a página

  return (
    <div className="container mx-auto p-6">
      {/* Linha de Gráficos */}
      <Graphics />

      <p className="text-center font-semibold text-2xl -mt-5" >Em alta</p>

      {/* Linha de Cards dos Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.slice(0, 3).map((product) => ( // Limitando para 3 produtos
          <CardProducts
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            seeIsActive={true}
          />
        ))}
      </div>
    </div>
  );
}
