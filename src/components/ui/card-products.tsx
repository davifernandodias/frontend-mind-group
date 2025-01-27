import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import Link from "next/link";

interface CardProductsProps {
  name: string;
  description: string;
  price: number;
  src: string | null;
  seeIsActive?: boolean;
  userId: string;
  productId: number
}
export default function CardProducts({ name, description, price, seeIsActive, src, userId, productId }: CardProductsProps) {
  console.log("User ID no Card:", userId, typeof userId); // Verifique se o valor de userId está correto aqui

  
  return (
    <Card className="hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out p-4 bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-center font-semibold text-gray-800 dark:text-gray-200">{name}</CardTitle>
      </CardHeader>
      <div className="flex justify-center text-center">
        {src && (
          <img
            src={src}
            alt={name}
            className="w-40  h-40 object-cover rounded-lg mb-4"
          />
        )}
      </div>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
        <p className="mt-2 font-bold text-gray-800 dark:text-gray-200 text-xl">R$ {price.toFixed(2)}</p>
        {seeIsActive && (
          <Link href={`/painel/${userId}/produto/${productId}`}>
  <Button className="mt-4 w-full bg-primary hover:bg-primary-dark text-white">
    Ver
  </Button>
</Link>

        )}
      </CardContent>
    </Card>
  );
}
