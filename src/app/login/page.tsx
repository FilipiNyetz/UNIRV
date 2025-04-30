"use client"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useActionState } from "react"
import loginAction from "@/actions/signin"
import Form from "next/form"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    email: z
        .string()
        .min(1, "")
        .email("Formato de e-mail inválido"),
    password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
})


const LoginPage = () => {
    const [state, formAction, isPending] = useActionState(loginAction, null)
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    return (
        <>
{state?.error && (
    <div className="mt-8 text-red-500 text-sm">{state.error}</div>
)}
        <div className="w-auto h-screen flex flex-col items-center px-4 py-8 gap-12">
            <h1 className="text-3xl">Login</h1>
            <Form className="space-y-8 w-sm flex flex-col" action={formAction} >
                <Input placeholder="Digite seu e-mail" name="email" className="h-12"/>
                <Input placeholder="Digite sua senha" name="password" className="h-12"/>
                    <Link href={"#"} className="text-right underline hover:scale-103 hover:text-gray-700 transition duration-250">Esqueceu a senha?</Link>
                    <Button type="submit" className="w-full h-12" disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Entrar
                    </Button>
                    <p className="text-center">Ainda não tem uma conta? <Link href={"/register"} className="text-primary underline hover:text-dark-gray transition duration-250">Registrar</Link></p>
            </Form>
        </div>
        </>
        
    );
}
 
export default LoginPage;