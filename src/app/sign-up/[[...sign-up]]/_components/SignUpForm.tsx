"use client";

import { useAuth, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import { FormEvent, useState, useEffect } from "react";
import VerificationInput from "./VerifyEmail";

export default function LoginForm() {
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();
  const { isLoaded, signUp } = useSignUp();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVerification, setEmailVerification] = useState(false);

  useEffect(() => {
    if (isSignedIn && userId) {
      router.push(`/painel/${userId}`);
    }
  }, [isSignedIn, userId, router]);

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp.create({
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setEmailVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const error = err.errors[0]?.message;
        return toast.error(error);
      }
      toast.error("An error occurred. Please try again later.");
    }
  };

  if (emailVerification) {
    return <VerificationInput />;
  }
  return (
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
      Entre com a sua conta
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="firstName"
            className="block text-sm/6 font-medium text-gray-900"
          >
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
              autoComplete="firstName"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="flex-1">
          <label
            htmlFor="lastName"
            className="block text-sm/6 font-medium text-gray-900"
          >
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
              autoComplete="lastName"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
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
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Senha
          </label>
          <div className="text-sm">
            <a
              href={`/reset-password`}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            required
            placeholder="********"
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Criar
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm/6 text-gray-500">
      Já tem uma conta?{" "}
      <a
        href={`/sign-up`}
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Entre nela agora
      </a>
    </p>
  </div>
</div>
  );
}
