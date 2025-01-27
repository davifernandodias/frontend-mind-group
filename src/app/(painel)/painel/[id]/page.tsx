'use client'

import { useEffect, useState } from "react";
import CardProducts from "@/components/ui/card-products";
import Graphics from "@/components/Graphics";
import { Product } from "@/interfaces/productInterfaces";
import { fetchProducts } from "@/services/productService"; // Importando o serviço de produtos
import {  useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]); // Definindo o tipo como Product[]
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  
  const [error, setError] = useState<string | null>(null); // Estado para controlar erros
  // eslint-disable-next-line prefer-const
  const params = useParams<{ user: string }>();
  let userId = JSON.parse(localStorage.getItem("user") || '{}')?.id;

  const { id } = params
  const router = useRouter();

  useEffect(() => {
    if(id !== userId){
      router.push(`/painel/${userId}`);  
      console.log("rota errada")

    }else{

    
      


    
    const fetchAndSetProducts = async () => {
      try {
        const data = await fetchProducts();  // Usando o serviço para buscar os produtos
        // Ordenando os produtos por preço em ordem decrescente e pegando os 3 primeiros
        const sortedProducts = data
          .sort((a: Product, b: Product) => b.price - a.price) // Tipando explicitamente os parâmetros
          .slice(0, 3); // Pegando os 3 produtos mais caros
        setProducts(sortedProducts); // Atualizando o estado com os 3 produtos mais caros
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false); // Sempre executa, independentemente de sucesso ou falha
      }
    };

    fetchAndSetProducts();
    }
  }, []); // Esse efeito vai rodar apenas uma vez, ao carregar a página

  if (loading) {
    return <p>Carregando produtos...</p>; // Mensagem de carregamento
  }

  if (error) {
    return <p>{error}</p>; // Mensagem de erro
  }

  return (
    <div className="container mx-auto p-6">
      {/* Linha de Gráficos */}
      <Graphics />

      <p className="text-center font-semibold text-2xl -mt-5">Em alta</p>

      {/* Linha de Cards dos Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <CardProducts
            key={product.id}
            productId={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            src={`data:image/jpeg;base64,${product.image}`}
            seeIsActive={true}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}
