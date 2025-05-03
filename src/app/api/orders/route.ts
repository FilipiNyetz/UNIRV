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