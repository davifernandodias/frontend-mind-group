"use client";

import { useState } from "react";
import { updateProduct } from "@/services/productService";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ModalEditProductProps {
  isUpdateDialogOpen: boolean;
  setUpdateDialogOpen: (value: boolean) => void;
  idProduct: number;
  name: string;
  description: string;
  price: number;
  onProductUpdated: () => void; // Callback para notificar o componente pai
}

export default function ModalEditProduct({
  isUpdateDialogOpen,
  setUpdateDialogOpen,
  idProduct,
  name: initialName,
  description: initialDescription,
  price: initialPrice,
  onProductUpdated,
}: ModalEditProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(initialPrice);

  const handleEditProduct = async () => {
    setIsLoading(true);
    try {
      await updateProduct(idProduct, name, description, price.toString());
      setUpdateDialogOpen(false); // Fecha o modal após sucesso
      onProductUpdated(); // Notifica o componente pai
      console.log("Produto atualizado com sucesso");
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isUpdateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <AlertDialogContent className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            Edição do produto
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preço
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </form>
        <AlertDialogFooter className="mt-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            variant="default"
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full sm:w-auto"
            onClick={() => setUpdateDialogOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleEditProduct}
            className={`bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Editando..." : "Editar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
