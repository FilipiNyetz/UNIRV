import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const orders = await db.order.findMany({
            include: {
                user: true,
                ticket: true
            }
        });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
        return NextResponse.json(
            { message: "Falha ao buscar pedidos" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { userId, ticketId, paymentId } = await request.json();

        if (!userId || !ticketId) {
            return NextResponse.json({ message: "Dados incompletos para criar o pedido" }, { status: 400 });
        }

        // Busca o ticket para pegar o batchId
        const ticket = await db.ticket.findUnique({
            where: { id: ticketId },
            select: { batchId: true }
        });

        if (!ticket || !ticket.batchId) {
            return NextResponse.json({ message: "Ticket ou lote inválido" }, { status: 400 });
        }

        // // Cria o pedido usando o batchId do ticket
        // const newOrder = await db.order.create({
        //     data: {
        //         userId,
        //         ticketId,
        //         batchId: ticket.batchId,
        //         status: "PENDING",
        //         payment: "PIX",
        //         paymentId,
        //     },
        // });

        // Atualiza o lote reduzindo a quantidade de ingressos disponíveis
        await db.batch.update({
            where: { id: ticket.batchId },
            data: {
                availableTickets: {
                    decrement: 1
                }
            }
        });

        // return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar o pedido:", error);
        return NextResponse.json({ message: "Falha ao criar o pedido" }, { status: 500 });
    }
}
