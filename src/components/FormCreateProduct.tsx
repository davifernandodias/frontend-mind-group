import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { createProduct } from "@/services/productService";
import { Toaster, toast } from "sonner"; // Importando toaster e toast
import { Product } from "@/interfaces/productInterfaces";

interface FormCreateProductProps {
  onAddProduct: (newProduct: Product) => void; // A função que será chamada ao adicionar um novo produto
}

export default function FormCreateProduct({ onAddProduct }: FormCreateProductProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct({ name, description, price, image });
      console.log(newProduct);
      
      // Adiciona o novo produto à lista
      onAddProduct(newProduct);
      
      // Exibe uma notificação de sucesso
      toast.success("Produto criado com sucesso!");
      
      // Limpa os campos do formulário
      setName('');
      setDescription('');
      setPrice(0);
      setImage(null);
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      
      // Exibe uma notificação de erro
      toast.error("Erro ao criar o produto. Tente novamente.");
    }
  };

  return (
    <div className="w-full lg:w-1/3">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
            Adicionar Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Digite o nome"
                className="mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Descrição */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Descrição
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Digite a descrição"
                className="mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Valor */}
            <div>
              <Label htmlFor="price" className="text-sm font-medium">
                Valor
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Digite o valor"
                className="mt-1"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            {/* Imagem */}
            <div>
              <Label htmlFor="image" className="text-sm font-medium">
                Imagem
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                className="mt-1"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            {/* Botão Salvar */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-gray-800"
            >
              Salvar Produto
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Renderizando o Toaster */}
      <Toaster />
    </div>
  );
}
