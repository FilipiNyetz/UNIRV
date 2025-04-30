import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const events = await db.event.findMany();
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar os eventos:", error);
        return NextResponse.json(
            { message: "Falha ao buscar eventos" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newEvent = await db.event.create({ data });
        return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar o evento:", error);
        return NextResponse.json(
            { message: "Falha ao criar evento" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, ...data } = await request.json();
        const updatedEvent = await db.event.update({
            where: { id },
            data,
        });
        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar o evento:", error);
        return NextResponse.json(
            { message: "Falha ao atualizar evento" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await db.event.delete({
            where: { id },
        });
        return NextResponse.json(
            { message: "Evento removido com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao remover o evento:", error);
        return NextResponse.json(
            { message: "Falha ao remover evento" },
            { status: 500 }
        );
    }
}