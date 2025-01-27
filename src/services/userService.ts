const urlApi = process.env.NEXT_PUBLIC_SECRET_URL_API;

export const createUser = async (userData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${urlApi}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar o usuário: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Retorna o usuário criado, incluindo o ID gerado
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    throw err;
  }
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${urlApi}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao fazer login: ${response.statusText}`);
    }

    const data = await response.json();
    // Armazenar o token e outros dados do usuário (como o ID) no localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user.id);

    return data; // Retorna o token e os dados do usuário
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    throw err;
  }
};
