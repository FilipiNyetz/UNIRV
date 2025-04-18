"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
    email: z
        .string()
        .min(1, "")
        .email("Formato de e-mail inválido"),
    password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
})

function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
}

const LoginPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    return (
        <div className="w-auto h-screen flex flex-col items-center px-4 py-8 gap-12">
            <h1 className="text-3xl">Login</h1>
            <Form {...form}>
                <form className="space-y-8 w-sm flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite seu e-mail" {...field} className="h-12"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite sua senha" {...field} className="h-12"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full h-12">Entrar</Button>
                    <p className="text-center">Ainda não tem uma conta? <Link href={"register"} className="text-primary underline hover:text-primary-darker">Registrar</Link></p>
                </form>
            </Form>
        </div>
    );
}
 
export default LoginPage;