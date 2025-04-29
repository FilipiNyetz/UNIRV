import { db } from "@/lib/prisma";

const TicketsPage = async () => {
    const batchs = await db.batch.findMany({ where: { active: true } });
    const tickets = await db.ticket.findMany();

    console.log({
        batchs,
        tickets
    });
    return (
        <h1>tickets</h1>
    );
}
 
export default TicketsPage;