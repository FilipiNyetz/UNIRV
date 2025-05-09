import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { Prisma } from "@prisma/client";

type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    user: true;
    ticket: true;
    batch: true;
  };
}>;

export async function GET() {
  try {
    const orders: OrderWithRelations[] = await db.order.findMany({
      where: { status: "COMPLETED" },
      include: {
        user: true,
        ticket: true,
        batch: true,
      },
    });

    const data = orders.map((order) => {
      const isAluno = !!order.user.studentId;
      const valorPago = isAluno
        ? order.ticket.student_price
        : order.ticket.external_price;

      return {
        Nome: order.user.name,
        CPF: order.user.cpf,
        "Valor do Ingresso Aluno": order.ticket.student_price,
        "Valor do Ingresso Externo": order.ticket.external_price,
        "Numero do Lote": order.batch.name,
        "Valor Pago": valorPago,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Controle_Ingressos");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=Controle_Ingressos.xlsx",
      },
    });
  } catch (error) {
    console.error("Erro ao exportar Excel:", error);
    return NextResponse.json({ error: "Erro ao exportar" }, { status: 500 });
  }
}
