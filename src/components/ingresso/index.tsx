import { Card, CardContent } from "../ui/card";

type IngressoProps = {
    titulo: string;
    data?: string;
    expirado?: boolean;
};

export function Ingresso({ titulo, data, expirado = false }: IngressoProps) {
    return (
        <Card
            className={`mb-3 md:w-90 flex ${!expirado ? "bg-background-light-yellow" : ''}`}
            variant={expirado ? "expired" : "default"}
        >
            <CardContent className="flex items-center">
                <div className="w-25">
                    <h1 className="text-md">{titulo}</h1>
                </div>
                <Card variant={expirado ? "expired" : "cardDate"} className="border-0">
                    <CardContent className="w-30 md:w-40">
                        <h3 className="text-xs w-full text-center md:text-md">
                            {expirado ? "Expirado" : data}
                        </h3>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
