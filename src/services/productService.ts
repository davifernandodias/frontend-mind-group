const urlApi = process.env.NEXT_PUBLIC_SECRET_URL_API;


// productService.ts

export const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return [];
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL_API}/products`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;  
    
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    throw err;
  }
};

export const createProduct = async (formData: FormData) => {
  try { 
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.id : undefined;  
    const token = localStorage.getItem("token") || undefined;
    console.log(userId)

    const response = await fetch(`${urlApi}/products/${userId}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        // Não defina 'Content-Type' como 'application/json' aqui
        // O fetch irá automaticamente ajustar o Content-Type para multipart/form-data
      },
      body: formData,  // Passa o FormData para o body da requisição
    });

    if (!response.ok) {
      const errorDetails = await response.text();  // Obtém o texto da resposta
      console.error("Erro ao criar produto:", errorDetails);
          throw new Error(`Erro ao criar o produto: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (err) {
    console.log(err)
    console.error("Erro ao criar produto:", err);
    throw err;
  }

};



export const fetchProductById = async (productId: number) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL_API}/products/${productId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar produto: ${response.statusText}`);
    }

    const data = await response.json();
    return data;  
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    throw err;
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SECRET_URL_API}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao excluir produto: ${response.statusText}`);
    }

    return { success: true }; // Retorno explícito indicando sucesso
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
    throw err;
  }
};


export const updateProduct = async (
  productId: number,
  formData: FormData
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SECRET_URL_API}/products/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Enviando FormData no corpo da requisição
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao atualizar produto: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};
