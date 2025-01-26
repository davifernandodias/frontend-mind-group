"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog"; // Certifique-se de que está importando o wrapper correto
import { Button } from "./button";

interface ModalConfirmRemoveProps {
  isDeleteDialogOpen: boolean;
  setDeleteDialogOpen: (value: boolean) => void;
}

export default function ModalConfirmRemove({
  isDeleteDialogOpen,
  setDeleteDialogOpen,
}: ModalConfirmRemoveProps) {
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
            Tem certeza que deseja excluir este produto? Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            variant="default"
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full sm:w-auto"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
          >
            Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
