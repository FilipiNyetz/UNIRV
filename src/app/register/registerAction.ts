// 'use server'
import axios from "axios";



interface FormDataProps {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    registration: string;
}

export default async function registerAction(formData: FormDataProps) {
    try {
        const response = await axios.post('https://unirv-production.up.railway.app/api/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
            phone: formData.phone,
            registration: formData.registration
        });

        console.log("Sucesso:", response.data);
        return { success: true, message: "Cadastro realizado com sucesso!" };
    } catch (error: any) {
        console.error("Erro no cadastro:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Erro ao cadastrar." };
    }
}
