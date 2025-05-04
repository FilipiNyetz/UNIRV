"use client"

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { api } from "../../../service/api";
import { useSession } from "next-auth/react";
import { Order, Ticket, User } from "@prisma/client";
import OrderStatusBadge from "@/components/order-status";

interface OrderWithTicketAndUser extends Order {
  ticket: Ticket
  user: User
} 

const SalesPage = () => {

    const { data } = useSession();
    if(!data?.user || data?.user?.role !== 1) {
        redirect("/")
    } 

    const [orders, setOrders] = useState<OrderWithTicketAndUser[]>([]);
    const [loading, setLoading] = useState(false);

    const getAllOrders = async () => {
        setLoading(true);
        const response = await api.get("/orders");
        setOrders(response.data);
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (

            <Table>
                <TableCaption>Lista de todos os pedidos.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Pedido</TableHead>
                    <TableHead className="w-[100px]">Nome</TableHead>
                    <TableHead className="w-[100px]">E-mail</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.map((order: OrderWithTicketAndUser) => {
                        const ticketPrice = order?.user.studentId ? order?.ticket.student_price : order?.ticket.external_price;
                        return (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order?.id}</TableCell>
                                <TableCell className="font-medium">{order?.user?.name}</TableCell>
                                <TableCell className="font-medium">{order?.user?.email}</TableCell>
                                <TableCell className="font-medium">
                                    <OrderStatusBadge status={order?.status === "CANCELED" ? "CANCELLED" : order?.status}></OrderStatusBadge>
                                </TableCell>
                                <TableCell className="font-medium">{ticketPrice.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                })}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">R$ 0,00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
    );
}
 
export default SalesPage;