import axios from "axios";

// Criação da instância do axios com baseURL padrão
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});