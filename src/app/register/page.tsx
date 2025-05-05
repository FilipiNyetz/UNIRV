"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import registerAction from "@/actions/register";
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const isValidCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }
  
    let firstCheckDigit = (sum * 10) % 11;
    if (firstCheckDigit === 10) firstCheckDigit = 0;
    if (firstCheckDigit !== parseInt(cpf[9])) return false;
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }
  
    let secondCheckDigit = (sum * 10) % 11;
    if (secondCheckDigit === 10) secondCheckDigit = 0;
  
    return secondCheckDigit === parseInt(cpf[10]);
};

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [noStudentId, setNoStudentId] = useState(false)
    const router = useRouter();

    const formSchema = z.object({
        name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
        cpf: z.string().nonempty("CPF é obrigatório")
            .refine((val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val), {
                message: "CPF deve estar no formato 000.000.000-00",
            })
            .refine((val) => isValidCPF(val), {
                message: "CPF inválido",
            }),
        phone: z.string()
            .regex(/^\d{11}$/, "Celular deve conter 11 números (com DDD)"),
        studentId: z.string().superRefine((val, ctx) => {
            if (!noStudentId && val.length === 0) {
                ctx.addIssue({
                code: z.ZodIssueCode.too_small,
                minimum: 1,
                type: "string",
                inclusive: true,
                message: "Digite sua matrícula",
                });
            }
        }),
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
        path: ["confirmPassword"],
    });
      
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            cpf: "",
            studentId: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const { formState: { errors } } = form;
    
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key as keyof typeof data] ?? "");
            }

            const result = await registerAction(null, formData);

            if (result?.error) {
                toast.error(result.error, {
                    duration: 3000,
                    classNames: {
                        title: "!text-base !font-bold", // Adicione ! antes para forçar
                        icon: "!text-red-500"
                    }
                });
            } else if (result?.success) {
                toast.success("Conta criada com sucesso! Faça login para continuar. ", {
                    description: "Você será redirecionado em instantes...",
                    duration: 3000,
                    classNames: {
                      title: "!text-base !font-bold", // Adicione ! antes para forçar
                      description: "!text-dark-gray",
                      icon: "!text-green-500"
                    }
                });
                setTimeout(() => router.push("/login"), 2000);
            }
        } finally {
            setIsLoading(false);
        }
    }; 

    return (
        <div className="w-auto h-auto flex flex-col items-center px-4 py-8 gap-12">
            <div className="flex gap-5 items-center">
                <h1 className="text-3xl">Registrar-se</h1>
                <Image src={"/Brasao.png"} alt={"Brasão da turma"} width={80} height={80} />
            </div>

            <form className="space-y-8 gap-14 w-96 px-4 flex flex-col lg:flex-row lg:w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-8 flex flex-col lg:w-sm">
                    <h1 className="text-2xl text-center">1. Dados pessoais:</h1>

                    {/* Campos */}
                    <div className="flex flex-col gap-2">
                        <label>Nome Completo</label>
                        <Input placeholder="Informe seu nome completo"  {...form.register("name")} className="h-12" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>CPF</label>
                        <Input placeholder="Informe seu CPF"  {...form.register("cpf")} className="h-12" />
                        {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Telefone</label>
                        <Input placeholder="Informe seu telefone"  {...form.register("phone")} className="h-12" />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Matrícula UNIRV</label>
                        <Input placeholder="Digite sua matrícula"  {...form.register("studentId")} className="h-12" disabled={noStudentId} />
                        {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId.message}</p>}
                    </div>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground mt-[-1rem]">
                        <input
                            type="checkbox"
                            className="cursor-pointer"
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

                <div className="space-y-8 flex flex-col lg:w-sm">
                    <h1 className="text-2xl text-center">2. Dados de acesso:</h1>

                    <div className="flex flex-col gap-2">
                        <label>E-mail</label>
                        <Input placeholder="Digite seu e-mail" {...form.register("email")} className="h-12" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Senha</label>
                        <Input placeholder="Digite sua senha" {...form.register("password")} className="h-12" type="password" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Confirmar Senha</label>
                        <Input placeholder="Confirme sua senha" {...form.register("confirmPassword")} className="h-12" type="password" />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    <Button type="submit" className="w-full h-12 mt-8" disabled={isLoading}>
                        {isLoading && <Loader2 className="animate-spin" />}
                        Cadastrar
                    </Button>

                    <p className="text-center">
                        Já tem uma conta?{" "}
                        <Link href={"/login"} className="text-primary underline hover:text-dark-gray transition duration-250">
                            Logar
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
