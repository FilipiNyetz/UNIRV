// src/app/api/mercadopago/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { db } from '@/lib/prisma';

// Configuração do cliente Mercado Pago
const client = new MercadoPagoConfig({
    accessToken: process.env.ACESS_TOKEN!,
    options: { timeout: 5000 },
});

const payment = new Payment(client);

// Função que lida com notificações do Mercado Pago
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const url = new URL(req.url);
        const paymentIdOrder = url.searchParams.get("paymentId");

        console.log('🔔 PaymentID:', paymentIdOrder);

        if (!paymentIdOrder) {
            console.warn('⚠️ paymentIdOrder is null or undefined');
            return NextResponse.json({ error: 'Invalid paymentIdOrder' }, { status: 400 });
        }

        console.log('🔔 Notificação recebida do Mercado Pago:', body);
        
        const paymentId = body?.data?.id;

        if (!paymentId) {
            console.warn('⚠️ ID de pagamento ausente na notificação');
            return NextResponse.json({ error: 'ID de pagamento não encontrado' }, { status: 400 });
        }

        // Atualiza o paymentId na order com o paymentIdOrder
        const order = await db.order.update({
            where: { paymentId: paymentIdOrder },
            data: { paymentId },
        });

        // Recupera os dados detalhados do pagamento pelo ID
        const paymentData = await payment.get({ id: paymentId });
        const status = paymentData.status;
        const email = paymentData.payer?.email;

        // Aqui você pode salvar ou atualizar dados no seu banco de dados
        if (status === 'approved') {
            console.log(`✅ Pagamento aprovado para ${email} (ID: ${paymentId})`);

            // Atualiza a order com o STATUS COMPLETED
            await db.order.update({
                where: { id: order.id },
                data: { status: "COMPLETED" },
            });
        } else if (status === 'cancelled') {
            console.log(`ℹ️ Status do pagamento ${paymentId}: ${status}`);
                
            // Atualiza a order com o STATUS CANCELED
            await db.order.update({
                where: { id: order.id },
                data: { status: "CANCELED" },
            });
        } else {
            console.log(`ℹ️ Status do pagamento ${paymentId}: ${status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('❌ Erro no processamento do webhook:', error);
        return new NextResponse('Erro interno no servidor', { status: 500 });
    }
}

// Rejeita outros métodos HTTP
export function GET() {
    return new NextResponse('Método não permitido', { status: 405 });
}
