  import { Card, CardContent, CardHeader, CardTitle } from "./card";
  import { Button } from "./button";

  interface CardProductsProps {
    name: string; // Nome do produto
    description: string; // Descrição do produto
    price: number; // Preço do produto
  }

  export default function CardProducts({ name, description, price }: CardProductsProps) {
    return (
      <Card className="hover:shadow-lg hover:scale-105 transform transition duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
          <p className="mt-2 font-bold text-gray-800 dark:text-gray-200">R$ {price.toFixed(2)}</p>
          <Button className="mt-4">Ver</Button>
        </CardContent>
      </Card>
    );
  }
