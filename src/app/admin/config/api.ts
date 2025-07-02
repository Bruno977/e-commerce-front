import axios from "axios";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/actions/decrypt";

const API_BASE_URL = process.env.ADMIN_API_URL;

console.log("API_BASE_URL:", API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Adiciona um interceptador na requisição
api.interceptors.request.use(
  async function (config) {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    console.log("Session:", session?.access_token);

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  },
  function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
  }
);

// Adiciona um interceptador na resposta
api.interceptors.response.use(
  async function (response) {
    // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
    // Faz alguma coisa com os dados de resposta
    return response;
  },
  function (error) {
    // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
    // Faz alguma coisa com o erro da resposta
    return Promise.reject(error);
  }
);
