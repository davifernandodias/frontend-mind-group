"use client"
import { useState, useEffect } from "react";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/interfaces/productInterfaces";
import FormCreateProduct from "@/components/FormCreateProduct";
import UserDataTable from "./datatable/_components/users-datatable";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  // Carrega os produtos inicialmente
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();  // Função para buscar os produtos
      setProducts(data);
    };

    loadProducts();
  }, []);  // Apenas carrega os produtos uma vez ao montar o componente

  // Função para adicionar um produto à lista
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);  // Adiciona o novo produto na lista existente
  };

  return (
    <div className="flex space-x-4">
      {/* Formulário de criação de produto */}
      <FormCreateProduct onAddProduct={handleAddProduct} />

      {/* Tabela de produtos */}
      <UserDataTable product={products} />
    </div>
  );
}
