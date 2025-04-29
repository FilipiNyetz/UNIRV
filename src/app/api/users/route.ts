import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await db.user.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                studentId: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await db.user.delete({
            where: { id },
        });
        return NextResponse.json(
            { message: "Usuário removido com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao remover o Usuário:", error);
        return NextResponse.json(
            { message: "Falha ao remover Usuário" },
            { status: 500 }
        );
    }
}