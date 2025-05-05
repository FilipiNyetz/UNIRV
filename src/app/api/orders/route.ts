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
        const { data } = await request.json();

        if (!data.userId || !data.ticketId) {
            return NextResponse.json(
                { message: "Dados incompletos para criar o pedido" },
                { status: 400 }
            );
        }

        const newOrder = await db.order.create({
            data: {
                userId: data.userId,
                ticketId: data.ticketId,
                status: "PENDING",
                payment: "PIX",
                paymentId: data.paymentId,
            },
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar o pedido:", error);
        return NextResponse.json(
            { message: "Falha ao criar o pedido" },
            { status: 500 }
        );
    }
}