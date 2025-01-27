"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { createUser } from "@/services/userService";

export default function CreateUserForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Verificar se o usuário já tem um token, e redirecionar caso tenha
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token && user?.id) {
      router.push(`/painel/${user.id}`); // Redireciona para o painel com o ID do usuário
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newUser = await createUser({ email, firstName, lastName, password });
      localStorage.setItem("token", newUser.token);  // Salva o token após criar o usuário
      localStorage.setItem("user", JSON.stringify(newUser.user));  // Salva o usuário no localStorage
      router.push(`/painel/${newUser.user.id}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erro ao criar o usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Crie sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                Primeiro nome
              </label>
              <div className="mt-2">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="David"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                Sobrenome
              </label>
              <div className="mt-2">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Dias"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder="joel@gmail.com"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Senha
            </label>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
            >
              {loading ? "Carregando..." : "Criar conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
