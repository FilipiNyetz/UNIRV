import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const batchId = searchParams.get("batchId");

        if (!batchId) {
            return NextResponse.json(
                { message: "batchId é obrigatório" },
                { status: 400 }
            );
        }

        const tickets = await db.ticket.findMany({
            where: { batchId },
        });
        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar os ingressos:", error);
        return NextResponse.json(
            { message: "Falha ao buscar ingressos" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { batchId, ...rest } = data;

        const batchExists = await db.batch.findUnique({
            where: { id: batchId },
        });

        if (!batchExists) {
            return NextResponse.json(
                { message: "batchId inválido ou não encontrado" },
                { status: 400 }
            );
        }

        const newTicket = await db.ticket.create({ data: { batchId, ...rest } });
        return NextResponse.json(newTicket, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar o ingressos:", error);
        return NextResponse.json(
            { message: "Falha ao criar ingressos" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, ...data } = await request.json();
        const updateTicket = await db.ticket.update({
            where: { id },
            data,
        });
        return NextResponse.json(updateTicket, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar o ingressos:", error);
        return NextResponse.json(
            { message: "Falha ao atualizar ingressos" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await db.ticket.delete({
            where: { id },
        });
        return NextResponse.json(
            { message: "ingresso removido com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao remover o ingresso:", error);
        return NextResponse.json(
            { message: "Falha ao remover ingresso" },
            { status: 500 }
        );
    }
}