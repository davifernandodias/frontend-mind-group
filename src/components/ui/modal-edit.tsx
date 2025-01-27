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
  image: unknown;
  onProductUpdated: () => void;
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
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState(initialPrice);

  const handleEditProduct = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());

      if (image) {
        formData.append("image", image);
      }

      await updateProduct(idProduct, formData);
      setUpdateDialogOpen(false);
      onProductUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isUpdateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <AlertDialogContent className="fixed left-1/2 top-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 dark:bg-black rounded-xl bg-white shadow-xl p-6 focus:outline-none border border-gray-200">
        <AlertDialogHeader className="pb-6">
          <AlertDialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
            Editar Produto
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form className="space-y-6 dark:text-white">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
              Nome do Produto
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-white">
              Imagem do Produto
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-white">
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-white">
              Preço
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </form>

        <AlertDialogFooter className="mt-6 flex justify-end space-x-4">
          <Button
            variant="default"
            className="w-full sm:w-auto bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={() => setUpdateDialogOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleEditProduct}
            className={`w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Atualizando..." : "Salvar Alterações"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
