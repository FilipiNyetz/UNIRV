import axios from "axios";

// Criação da instância do axios com baseURL padrão
export const api = axios.create({
    baseURL: "http://localhost:3000/api",
});