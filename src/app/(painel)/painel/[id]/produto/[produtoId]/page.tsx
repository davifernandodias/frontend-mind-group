"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CardProducts from "@/components/ui/card-products";
import ModalConfirmRemove from "@/components/ui/modal-confirm-remove";
import { useParams } from "next/navigation";
import { Product } from "@/interfaces/productInterfaces";
import { fetchProductById } from "@/services/productService";
import ModalEditProduct from "@/components/ui/modal-edit";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const params = useParams<{ produtoId: string }>();
  const { produtoId } = params;

  const validId = produtoId ? Number(produtoId) : NaN;

  useEffect(() => {
    if (!isNaN(validId)) {
      fetchProductById(validId)
        .then((data) => setProduct(data))
        .catch((error) => console.error("Erro ao buscar produto:", error));
    } else {
      console.error("ID inválido:", produtoId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtoId]);

  const handleProductDeleted = () => {
    setProduct(null); // Remove o produto da exibição ao deletar
  };

  const handleProductUpdate = async () => {
    if (!isNaN(validId)) {
      const updatedProduct = await fetchProductById(validId); // Recarrega o produto
      setProduct(updatedProduct);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Produto não encontrado ou foi excluído.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-50 rounded-md shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Edita ou deletar produto</h1>

      <CardProducts
        description={product.description}
        name={product.name}
        price={product.price}
        src={`data:image/jpeg;base64,${product.image}`}
        seeIsActive={false}
      />



      <div className="flex space-x-4">
        <Button
          variant="default"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setUpdateDialogOpen(true)}
        >
          Editar
        </Button>

        <Button
          variant="destructive"
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={() => setDeleteDialogOpen(true)}
        >
          Deletar
        </Button>
      </div>

      <ModalConfirmRemove
        idProduct={validId}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        onProductDeleted={handleProductDeleted}
      />

      <ModalEditProduct
        idProduct={validId}
        onProductUpdated={handleProductUpdate}
        description={product.description}
        name={product.name}
        isUpdateDialogOpen={isUpdateDialogOpen}
        setUpdateDialogOpen={setUpdateDialogOpen}
        price={product.price}
      />
    </div>
  );
}
