import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import Link from "next/link";

  interface CardProductsProps {
    name: string; 
    description: string; 
    price: number; 
    seeIsActive?: boolean;
  }

  export default  function CardProducts({ name, description, price, seeIsActive }: CardProductsProps) {

    return (
      <Card className="hover:shadow-lg hover:scale-105 transform transition duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
          <p className="mt-2 font-bold text-gray-800 dark:text-gray-200">R$ {price.toFixed(2)}</p>
          { seeIsActive &&  <Button className="mt-4"><Link href={"/"}>Ver</Link></Button> }
        </CardContent>
      </Card>
    );
  }
