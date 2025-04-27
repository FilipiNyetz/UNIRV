export default async function registerAction(data: { [key: string]: string }) {
    console.log("Chegou até aqui");

    // Ajuste para garantir que os campos correspondem ao que a API espera
    const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,  // Renomeando para corresponder ao campo esperado pela API
        phone: data.phone,
        registration: data.registration || "",  // A API pode aceitar um valor vazio para registro
    };

    try {
        const response = await fetch('https://unirv-production.up.railway.app/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Envia como JSON
            },
            body: JSON.stringify(formData),  // Envia os dados como JSON
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const result = await response.json();

        // Verifica se o resultado é um erro ou sucesso
        if (result.error) {
            console.error("Erro ao registrar usuário:", result.error);
        } else {
            console.log("Usuário registrado com sucesso:", result);
        }
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
    }
}
