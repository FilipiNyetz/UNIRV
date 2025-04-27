export default async function registerAction(data: { [key: string]: string }) {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Envia como JSON
            },
            body: JSON.stringify(data),  // Envia os dados como JSON
        });

        const result = await response.json();
        console.log("Usuário registrado com sucesso:", result);
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
    }
}
