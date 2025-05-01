// registerAction.ts
'use server'

import { db } from "@/lib/prisma"
import { hash } from "bcrypt"

export default async function registerAction(_: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const password = formData.get("password") as string
  const studentId = formData.get("studentId") as string | null

  if (!name || !email || !phone || !password) {
    return { error: "Preencha todos os campos obrigatórios." }
  }

  const existingUser = await db.user.findUnique({ where: { email } })
  if (existingUser) {
    return { error: "Este e-mail já está em uso." }
  }

  const hashedPassword = await hash(password, 10)

  await db.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      studentId: studentId || null,
    },
  })

  return { success: "Conta criada com sucesso! Faça login para continuar." }
}
