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

        console.log('🔔 Notificação recebida do Mercado Pago:', body);

        const paymentId = body?.data?.id;
        if (!paymentId) {
            console.warn('⚠️ ID de pagamento ausente na notificação');
            return NextResponse.json({ error: 'ID de pagamento não encontrado' }, { status: 400 });
        }

        // Recupera os dados detalhados do pagamento pelo ID
        const paymentData = await payment.get({ id: paymentId });
        const status = paymentData.status;
        const email = paymentData.payer?.email;
        const orderId = paymentData.metadata?.orderId;

        if (!orderId) {
            console.warn("OrderId não encontrado nos metadados do pagamento.");
            return NextResponse.json({ error: "OrderId não encontrado" }, { status: 400 });
        }

        // Aqui você pode salvar ou atualizar dados no seu banco de dados
        if (status === 'approved') {
            await db.order.update({
                where: { id: orderId },
                data: { status: "COMPLETED" },
            });
            console.log(`✅ Pagamento aprovado para ${email} (ID: ${paymentId})`);
        } 
        else if (status === 'cancelled') {
            await db.order.update({
                where: { id: orderId },
                data: { status: "CANCELED" },
            });
            console.log(`❌ Pagamento cancelado para ${email} (ID: ${paymentId})`);
        }
        else {
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
