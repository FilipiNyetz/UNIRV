"use client"
import { useActionState, useState } from "react"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import registerAction from "@/actions/register";
import Form from "next/form"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    cpf: z.string()
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
    phone: z.string()
        .regex(/^\d{11}$/, "Celular deve conter 11 números (com DDD)"),
    studentId: z.string(),
    email: z.string()
        .min(1, "O e-mail é obrigatório")
        .email("Formato de e-mail inválido"),
    password: z.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "Deve conter pelo menos um número"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
});

const RegisterPage = () => {
    const [state, formAction, isPending] = useActionState(registerAction, null)
    const [noStudentId, setNoStudentId] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            studentId: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    return (
        <div className="w-auto h-screen flex flex-col items-center px-4 py-8 gap-12">
            <div className="flex gap-5 items-center">
                <h1 className="text-3xl">Registrar-se</h1>
                <Image src={"/Brasao.png"} alt={"Brasão da turma"} width={80} height={80} />
            </div>

            {state?.error && (
                <p className="text-red-500 text-sm">{state.error}</p>
            )}

            {state?.success && (
                <p className="text-green-600 text-sm">{state.success}</p>
            )}

            <Form className="space-y-8 gap-14 flex" action={formAction}>
                <div className="space-y-8 w-sm flex flex-col">
                    <h1 className="text-2xl text-center">1. Dados pessoais:</h1>

                    {/* Campos */}
                    <Input placeholder="Informe seu nome completo" name="name" className="h-12" />
                    {/* <Input placeholder="Informe seu CPF" name="cpf" className="h-12" /> */}
                    <Input placeholder="Informe seu telefone" name="phone" className="h-12" />
                    <Input placeholder="Digite sua matrícula" name="studentId" className="h-12" disabled={noStudentId} />
                    <label className="flex items-center gap-2 text-sm text-muted-foreground mt-[-1rem]">
                        <input
                            type="checkbox"
                            checked={noStudentId}
                            onChange={(e) => {
                                setNoStudentId(e.target.checked)
                                if (e.target.checked) {
                                    form.setValue("studentId", "")
                                }
                            }}
                        />
                        Não tenho matrícula
                    </label>
                </div>

                <div className="space-y-8 w-sm flex flex-col">
                    <h1 className="text-2xl text-center">2. Dados de acesso:</h1>

                    <Input placeholder="Digite seu e-mail" name="email" className="h-12" />
                    <Input placeholder="Digite sua senha" name="password" className="h-12" type="password" />
                    <Input placeholder="Confirme sua senha" name="confirmPassword" className="h-12" type="password" />

                    <Button type="submit" className="w-full h-12 mt-5.5" disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Cadastrar
                    </Button>

                    <p className="text-center">
                        Já tem uma conta?{" "}
                        <Link href={"/login"} className="text-primary underline hover:text-dark-gray transition duration-250">
                            Logar
                        </Link>
                    </p>
                </div>
            </Form>
        </div>
    );
}

export default RegisterPage;
