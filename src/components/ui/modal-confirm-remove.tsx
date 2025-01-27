import { useState } from "react";
import { deleteProduct } from "@/services/productService";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";

interface ModalConfirmRemoveProps {
  isDeleteDialogOpen: boolean;
  setDeleteDialogOpen: (value: boolean) => void;
  idProduct: number;
  onProductDeleted: () => void; // Callback para notificar o componente pai
}

export default function ModalConfirmRemove({
  isDeleteDialogOpen,
  setDeleteDialogOpen,
  idProduct,
  onProductDeleted,
}: ModalConfirmRemoveProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      await deleteProduct(idProduct); // Deletando o produto
      setDeleteDialogOpen(false); // Fecha o modal após sucesso
      onProductDeleted(); // Notifica o componente pai
      
      // Obtendo o userId do localStorage
      const userId = JSON.parse(localStorage.getItem("user") || '{}')?.id;

      // Redirecionando para a página do painel do usuário após exclusão
      if (userId) {
        router.push(`/painel/${userId}`);  // Rota correta do painel com o userId
      } else {
        console.error("User ID not found in localStorage");
      }

    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent
        className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            Confirmar Exclusão
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600 mt-2">
            Tem certeza que deseja excluir este produto? Essa ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            variant="default"
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full sm:w-auto"
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteProduct}
            className={`bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Excluindo..." : "Excluir"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
