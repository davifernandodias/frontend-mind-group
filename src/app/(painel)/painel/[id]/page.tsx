"use client"
import CardProducts from "@/components/ui/card-products";
import Graphics from "@/components/Graphics";
// import { handleUserCreated } from "@/services/userServices";



export default function Page() {
  const user  =  {
    id: "dakdak",
    email: "usua2rio2@example.com",
    firstName: "Jodada2hn",
    lastName: "Do222e",
    password: "senha2123"
  
  }

  const handleGetUsers = async () => {
    console.log(user)
    // handleUserCreated(user)
    console.log(user)
  }

  const products = [
    { name: "Produto 1", description: "Descrição do produto 1", price: 59.99 },
    { name: "Produto 2", description: "Descrição do produto 2", price: 99.99 },
    { name: "Produto 3", description: "Descrição do produto 3", price: 149.99 },
  ];

  return (
      <div className="container mx-auto p-6">
        {/* Linha de Gráficos */}
        <Graphics />

          <p className="text-center font-semibold text-2xl -mt-5" onClick={handleGetUsers} >Em alta</p>
        {/* Linha de Cards dos Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {products.map((product, index) => (
            <>
            <CardProducts
              key={index}
              name={product.name}
              description={product.description}
              price={product.price}
              seeIsActive={true}
              />
            </>
          ))}
        </div>
      </div>
  );
}
