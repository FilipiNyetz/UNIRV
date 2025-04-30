import { Ingresso } from "@/components/ingresso";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "../../../auth";
import { Button } from "@/components/ui/button";
import logoutAction from "@/actions/signout";
import { redirect } from "next/navigation";

export default async function () {

    const session = await auth();
    const userName = session?.user?.name || "Usuário deslogado";

    if(!session) {
        redirect("/login")
    } 
    
    return (
        <main className="h-auto bg-background px-4 py-8 flex flex-col">
            <div>
                <h1 className="pl-8 text-3xl">
                    Olá, <span>{userName}</span>
                </h1>
                <Button onClick={logoutAction}>Sair</Button>
            </div>
            <div className="w-full flex items-center flex-col">
                <h1 className="text-xl mb-8">Seus <span className="text-primary-darker">ingressos</span>:</h1>
                <Ingresso titulo="Festa Junina" data="Dia 30 | Mai." />
                <Ingresso titulo="Calourada" expirado />
                <Ingresso titulo="TESTE" expirado />
            </div>
        </main>
    );
}
