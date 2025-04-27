'use server'

import { RegisterService } from "../../../service/RegisterService"; // ajuste o caminho se necessário

export default async function registerAction(formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries);

    console.log("Dados que estou enviando:", data);
    console.log("Essa funcao é chamada")

    const service = new RegisterService();

    try {
        const response = await service.registrarUsuario({
            name: data.name as string,
            email: data.email as string,
            password: data.password as string,
            password_confirmation: data.password_confirmation as string,
            phone: data.phone as string,
            registration: data.registration as string
        });

        console.log("Usuário registrado com sucesso:", response.data);
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
    }
}
