"use client";
import { useSignUp } from "@clerk/nextjs";
import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";




export default function VerificationInput() {
  const [ code, setCode ] = useState("");
  const { isLoaded, setActive, signUp } = useSignUp();
  const router = useRouter();
  if(!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      })
      if (completeSignUp.status === "complete") {
        await setActive({
          session: completeSignUp.createdSessionId
        })
        router.push("/painel")
      }
    }catch(err){
      if(isClerkAPIResponseError(err)){
        const error = err.errors[0]?.message;
        return toast.error(error);
      }
    }
    toast.error("An error occurred. Please try again later.");  
  }


  const resendCode = async () => {  
    try{
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code"
        })

    }catch(err){
      if(isClerkAPIResponseError(err)){
        const error = err.errors[0]?.message;
        return toast.error(error);
      }
    }
    toast.error("An error occurred. Please try again later."); 
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">

      <p>O codigo foi enviado para seu email</p>
    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="p-4 border" placeholder="Verificar codigo" />
    <div className="flex  gap-2">
      <button onClick={resendCode} type="button" className="border border-black">Reenviar código</button>
      <button className="border border-black">confirmação de email</button>
    </div>
      </form>
    </div>
  )
}
