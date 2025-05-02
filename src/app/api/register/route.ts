import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashSync } from "bcrypt";

export async function POST(request: Request) {
    console.log(request)
    try {
        const { name, phone, cpf, email, password, studentId } = await request.json();

        if (!name || !phone || !cpf || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await db.user.create({
            data: {
                name,
                phone,
                cpf,
                email,
                password: hashSync(password, 10),
                studentId: studentId || null,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
