export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null; // O tipo pode ser string, ou null, dependendo de como o backend retorna a imagem
}
