import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET_ORDERS() {
    try {
        const orders = await db.order.findMany();
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
        return NextResponse.json(
            { message: "Falha ao buscar pedidos" },
            { status: 500 }
        );
    }
}

export async function GET_USER_ORDERS(userId: string) {
    try {
        const orders = await db.order.findMany({
            where: { userId },
        });
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar os pedidos do usuário:", error);
        return NextResponse.json(
            { message: "Falha ao buscar pedidos do usuário" },
            { status: 500 }
        );
    }
}

