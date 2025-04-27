import axios from "axios";

// Criação da instância do axios com baseURL padrão
export const axiosInstance = axios.create({
    baseURL: "https://unirv-production.up.railway.app",
});

// Serviço para manipulação de usuários
export class RegisterService {
    async registrarUsuario(data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        phone: string;
        registration: string;
    }) {
        return axiosInstance.post('api/register', data);
    }
}
