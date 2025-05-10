"use client"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import loginAction from "@/actions/signin"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z
        .string()
        .min(1, "Entre com seu e-mail")
        .email("Formato de e-mail inválido"),
    password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
})

const toastStyles = {
    error: {
        classNames: {
            title: "!text-base",
            icon: "!text-red-500"
        }
    },
    success: {
        classNames: {
            title: "!text-base",
            description: "!text-dark-gray",
            icon: "!text-green-500"
        }
    }
};

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })
    const { formState: { errors } } = form;
    

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);

            const result = await loginAction(null, formData);

            if (result?.error) {
                toast.error(result.error, {
                    duration: 3000,
                    ...toastStyles.error
                });
            } 
        } finally {
            setIsLoading(false);
        }
    }; 

    return (
        <>
        <div className="w-auto h-auto flex flex-col items-center px-4 py-8 gap-12">
            <h1 className="text-3xl">Login</h1>
            <form className="space-y-8 w-sm px-4 sm:px-0 flex flex-col" onSubmit={form.handleSubmit(onSubmit)} >
                <div className="flex flex-col gap-2">
                    <label>E-mail</label>
                    <Input placeholder="Digite seu e-mail" {...form.register("email")} className="h-12"/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div> 
                <div className="flex flex-col gap-2">
                    <label>Senha</label>
                    <Input placeholder="Digite sua senha" {...form.register("password")} className="h-12"/>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div> 
                    {/* <Link href={"#"} className="text-right underline hover:scale-103 hover:text-gray-700 transition duration-250">Esqueceu a senha?</Link> */}
                    <Button type="submit" className="w-full h-12 mt-7" disabled={isLoading}>
                        {isLoading && <Loader2 className="animate-spin" />}
                        Entrar
                    </Button>
                    <p className="text-center">Ainda não tem uma conta? <Link href={"/register"} className="text-primary underline hover:text-dark-gray transition duration-250">Registrar</Link></p>
            </form>
        </div>
        </>
        
    );
}
 
export default LoginPage;