import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import Link from "next/link";

interface CardProductsProps {
  name: string; 
  description: string; 
  price: number; 
  seeIsActive?: boolean;
}

export default function CardProducts({ name, description, price, seeIsActive }: CardProductsProps) {
  return (
    <Card className="hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out p-4 bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
        <p className="mt-2 font-bold text-gray-800 dark:text-gray-200 text-xl">R$ {price.toFixed(2)}</p>
        {seeIsActive && (
          <Button className="mt-4 w-full bg-primary hover:bg-primary-dark text-white">
            <Link href={"/"}>Ver</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
