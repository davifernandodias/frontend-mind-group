export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null; // Dependendo do seu modelo de dados, pode ser string ou null
}
