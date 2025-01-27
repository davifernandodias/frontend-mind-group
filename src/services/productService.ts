const urlApi = process.env.NEXT_PUBLIC_SECRET_URL_API;


// productService.ts
export const token = localStorage.getItem("token");

export const fetchProducts = async () => {
  try {
    console.log("Token no front:", token); // Verificando o token

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return []; // Retorna um array vazio caso o token não seja encontrado
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL_API}/products`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("Status da resposta:", response.status);
    console.log("Cabeçalhos da resposta:", response.headers);

    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Produtos:", data);
    return data;  
    
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    throw err;
  }
};
export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  image: File | null;
}) => {
  try {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.id : undefined;  // Pegando o ID do usuário
    const token = localStorage.getItem("token") || undefined;
    


    const response = await fetch(`${urlApi}/products/${userId}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Certifique-se de enviar como JSON
      },
      body: JSON.stringify({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image ? productData.image : null,
      }),
    });
    

    if (!response.ok) {
      throw new Error(`Erro ao criar o produto: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Retorna o produto criado, incluindo o ID gerado
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    throw err;
  }
};


