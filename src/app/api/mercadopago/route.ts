// src/app/api/mercadopago/route.ts
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: process.env.ACESS_TOKEN!,
    options: { timeout: 5000 },
});

const payment = new Payment(client);

function generateIdempotencyKey() {
    return 'key-' + Math.random().toString(36).substring(2, 15)
        + Math.random().toString(36).substring(2, 15);
}

// 👇 Aqui está a exportação correta para um handler POST
export async function POST(req: Request) {
    const { data } = await req.json();
    try {
        const body = {
            transaction_amount: data.amount,
            description: data.description,
            payment_method_id: "pix",
            payer: {
                email: data.payer.email,
                first_name: data.payer.first_name,
                identification: {
                    type: "CPF",
                    number: data.payer.identification.number,
                }
            },
            notification_url: 'https://unirv-app.qtcojd.easypanel.host/api/mercadopago/webhook',
        };

        const requestOptions = {
            idempotencyKey: generateIdempotencyKey(),
        };

        const result = await payment.create({ body, requestOptions });

        const qrCode = result.point_of_interaction?.transaction_data?.qr_code;

        return new Response(
            JSON.stringify({ pix_code: qrCode ?? null }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Erro Mercado Pago:", error);
        return new Response(
            JSON.stringify({ error: "Erro ao criar pagamento" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
