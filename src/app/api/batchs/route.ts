import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const batchs = await db.batch.findMany();
        return NextResponse.json(batchs, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar os lotes:", error);
        return NextResponse.json(
            { message: "Falha ao buscar lotes" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newBatch = await db.batch.create({ data });
        return NextResponse.json(newBatch, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar o lote:", error);
        return NextResponse.json(
            { message: "Falha ao criar lote" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, ...data } = await request.json();
        const updatedBatch = await db.batch.update({
            where: { id },
            data,
        });
        return NextResponse.json(updatedBatch, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar o lote:", error);
        return NextResponse.json(
            { message: "Falha ao atualizar lote" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await db.batch.delete({
            where: { id },
        });
        return NextResponse.json(
            { message: "Lote removido com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao remover o lote:", error);
        return NextResponse.json(
            { message: "Falha ao remover lote" },
            { status: 500 }
        );
    }
}