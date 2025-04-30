"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { signIn } from "../../auth"

export default async function loginAction(_prevstate: any, formData: FormData) {
    try {
        await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirect: true,
            redirectTo: "/perfil"
        })
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error
        }
        if (error.type === "CredentialsSignin") {
            return { success: false, error: "Credenciais inválidas" }
        }

        return { success: false, error: "Ops, ocorreu algum erro inesperado!" }
    }
}