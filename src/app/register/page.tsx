"use client"
import { useState } from "react" // adicione esse import

import { Button } from "@/components/ui/button"
import {
    Form,
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

import Image from "next/image"


const formSchema = z.object({
    name: z
        .string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    cpf: z
        .string()
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00")
        .regex(/^\d{11}$/, "CPF deve conter 11 números"),
    phone: z
        .string()
        .regex(/^\d{11}$/, "Celular deve conter 11 números (com DDD)"),
    registration: z
        .string(),
    email: z
        .string()
        .min(1, "O e-mail é obrigatório")
        .email("Formato de e-mail inválido"),
    password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "Deve conter pelo menos um número"),
    confirmPassword: z
        .string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"], // mostra o erro no campo de confirmação
});

function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
}

const LoginPage = () => {
    const [noRegistration, setNoRegistration] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
            phone: "",
            registration: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    return (
        <div className="w-auto h-screen flex flex-col items-center  px-4 py-8 gap-12">
            <div className="flex gap-5 items-center">
                <h1 className="text-3xl">Registrar-se</h1>
                <Image src={"/Brasao.png"} alt={"Brasao da turma"} width={80} height={80} />
            </div>
            <Form {...form}>
                <form className="space-y-8 gap-12 flex" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8 w-sm flex flex-col">
                        <h1 className="text-2xl text-center">1. Dados pessoais:</h1>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Informe seu nome completo" {...field} className="h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Informe seu CPF" {...field} className="h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Celular</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Informe seu telefone" {...field} className="h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="registration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Matrícula UNIRV</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Digite sua matrícula"
                                            {...field}
                                            className="h-12"
                                            disabled={noRegistration} // desabilita se checkbox estiver marcado
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <label className="flex items-center gap-2 text-sm text-muted-foreground mt-[-1rem]">
                            <input
                                type="checkbox"
                                checked={noRegistration}
                                onChange={(e) => {
                                    setNoRegistration(e.target.checked)
                                    if (e.target.checked) {
                                        form.setValue("registration", "")
                                    }
                                }}
                            />
                            Não tenho matrícula
                        </label>
                    </div>

                    <div className="space-y-8 w-sm flex flex-col">
                        <h1 className="text-2xl text-center">2. Dados de acesso:</h1>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu e-mail" {...field} className="h-12" />
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
                                        <Input placeholder="Digite sua senha" {...field} className="h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar senha</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirme sua senha" {...field} className="h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full h-12 mt-5.5">Cadastrar</Button>
                        <p className="text-center">Já tem uma conta? <Link href={"/login"} className="text-primary underline hover:text-dark-gray transition duration-250">Logar</Link></p>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default LoginPage;