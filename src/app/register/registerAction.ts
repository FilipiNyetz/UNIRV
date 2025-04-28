'use server'
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
    console.log("Recebido no server:", formData);

    axios.post('https://unirv-production.up.railway.app/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        phone: formData.phone,
        registration: formData.registration
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });



    // Aqui você faria o cadastro no banco de dados, por exemplo
}
