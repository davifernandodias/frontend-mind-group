"use client";

import CardProducts from "@/components/ui/card-products";
import { Button } from "@/components/ui/button";
import ModalConfirmRemove from "@/components/ui/modal-confirm-remove"; 
import { useState } from "react";

export default function ProductPage() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-50 rounded-md shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Editar Produto</h1>

      <CardProducts description="Descrição do produto" name="Machado" price={2000} />

      <div className="flex space-x-4">
        {/* Botão de Editar */}
        <Button variant="default" className="bg-blue-600 text-white hover:bg-blue-700">
          Editar
        </Button>

        {/* Botão de Deletar */}
        <Button
          variant="destructive"
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={() => setDeleteDialogOpen(true)}
        >
          Deletar
        </Button>
      </div>

      {/* Modal de confirmação de exclusão */}
      <ModalConfirmRemove
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
    </div>
  );
}
