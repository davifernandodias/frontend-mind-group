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
  const [loading, setLoading ] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se a imagem é maior que 20KB
    if (image && image.size > 60 * 1024) {
      toast.error("A imagem não pode exceder 60KB.");
      return;
    }

    // Validação do preço
    if (price <= 0 || price > 99999) {
      toast.error("O preço deve ser maior que 0 e até 5 dígitos.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      if (image) {
        console.log(image)
        formData.append("image", image); // Adiciona a imagem no FormData
      }

      // Enviar o FormData para o backend para criação do produto
      const newProduct = await createProduct(formData); // Passa o FormData para o backend

      // Adiciona o novo produto à lista
      onAddProduct(newProduct);

      // Exibe uma notificação de sucesso
      toast.success("Produto criado com sucesso!");
      setLoading(false)

      // Limpa os campos do formulário
      setName('');
      setDescription('');
      setPrice(0);
      setImage(null);
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      
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
                maxLength={100} // Limite de 100 caracteres
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
                maxLength={100} // Limite de 100 caracteres
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
              className="w-full  dark:bg-white dark:text-gray-800"
            >
              {
                !loading ? "Salvar Produto" : "Salvando..."

              }
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Renderizando o Toaster */}
      <Toaster />
    </div>
  );
}
