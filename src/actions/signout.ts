"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { signOut } from "../../auth"

export default async function logoutAction() {
    try {
        await signOut({
            redirect: true,
            redirectTo: "/login"
        })

        return { success: true }
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error
        }

        console.error(error)
    }
}