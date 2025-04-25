import axios from "axios";

// Criação da instância do axios com baseURL padrão
export const axiosInstance = axios.create({
    baseURL: "https://unirv-production.up.railway.app",
});

// Serviço para manipulação de usuários (ou lotes, pelo endpoint)
export class UsuarioService {
    listarTodos() {
        return axiosInstance.get("/api/lotes/show");
    }
}
