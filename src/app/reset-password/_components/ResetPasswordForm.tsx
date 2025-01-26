"use client";

import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import { FormEvent, useState, useEffect } from "react";
import VerificationInput from "./ResetPasswordInput";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { isSignedIn, userId } = useAuth(); // Hook para verificar autenticação
  const { isLoaded, signIn } = useSignIn();
  
  const [email, setEmail] = useState("");
  const [verifyCode , setVerifyCode] = useState(false);

  useEffect(() => {
    if (isSignedIn && userId) {
      router.push(`/painel/${userId}`);
    }
  }, [isSignedIn, userId, router]);

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn.create({
        identifier: email,
        strategy: "reset_password_email_code"
      })
      setVerifyCode(true)
   
        // router.push(`/painel/${userId}`);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const error = err.errors[0]?.message;
        return toast.error(error);
      }
      toast.error("An error occurred. Please try again later.");
    }
  };

  if(verifyCode) {
    return (
      <VerificationInput />
    )
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Coloque seu email 
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Não tem uma conta?{" "}
            <a href={`/sign-up`} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Crie uma agora
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
