import { UserJSON } from "@clerk/nextjs/server";

  const urlApi = process.env.NEXT_PUBLIC_SECRET_URL_API;



  export const handleGetAllUsers = async () => {
    try {
      const urlApiPost = `${urlApi}/users`;  
      const response = await fetch(urlApiPost, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
      }

      const dataJson = await response.json();
      console.log(dataJson);

    } catch (err) {
      console.log('Erro ao buscar usuários:', err);
    }
  }



  export const handleUserCreated = async (data: UserJSON ) => {
    try {
      // Garantir que estamos acessando corretamente as propriedades do payload
      console.log(data);
      console.log("oooooooooooooooooooooooooooooooooooooooo")
      const user = {
        id: data.id,
        email: data.email_addresses[0]?.email_address, // Usar optional chaining para evitar erros
        firstName: data.first_name,
        lastName: data.last_name,
      };
  
      // Aqui você pode enviar o user para uma API ou banco de dados
      const response = await fetch('/api/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
  
      console.log('User created successfully');
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  