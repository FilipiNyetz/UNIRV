"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Copy, Map, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};


export function Modal({ isOpen, onClose }: ModalProps) {

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText('AQUI VAI SER O PIX');
            alert("Chave pix copiada!")
            console.log('Texto copiado para a área de transferência');
        } catch (err) {
            console.log('Falha ao copiar o texto', err);
        }
    };

    return (
        <div>
            <Dialog open={isOpen}>
                <DialogContent className="flex flex-col items-center justify-center text-center p-6 max-w-sm">
                    <DialogTitle className="text-xl font-semibold -mb-2">
                        Pagamento do Ingresso
                    </DialogTitle>

                    <div className="text-primary font-semibold text-lg">
                        Festa Junina <span className="text-primary-darker">R$ 35,00</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-4 w-55">
                        <div className="flex flex-col items-center border rounded-xl overflow-hidden shadow-md w-20">
                            <div className="text-xl font-bold mt-2">30</div>
                            <div className="text-sm text-gray-600 mb-2">Sex</div>
                            <div className="bg-black text-primary w-full py-1 text-sm font-semibold">
                                Abr.
                            </div>
                        </div>


                        <div className="flex flex-col items-center">
                            <div className="text-lg font-medium">Às 20:00h</div>
                            <div className="text-sm flex items-center">
                                <MapPin></MapPin> <Link href="#" className="underline hover:text-primary-darker transition">Localização</Link>
                            </div>
                        </div>
                    </div>
                    <hr className="w-full my-4 border-gray-300" />

                    {/* Pix info */}
                    <DialogDescription className="w-full text-center">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl text-black">Pix:</span>
                            <span className="mt-2 text-sm text-gray-700 break-words max-w-xs">aocacaiwocaowcioawc-cowacioawicoac-pcac-testepix</span>

                            {/* <div className="flex items-center gap-2 mt-2 text-sm text-black cursor-pointer hover:text-primary-darker transition"> */}

                            {/* <Copy className="w-4 h-4" /> */}
                            <Button onClick={copyToClipboard} className="mt-4">Copiar código</Button>
                            {/* </div> */}
                        </div>
                    </DialogDescription>

                    <DialogFooter className="mt-6 text-sm text-center">
                        <p>
                            Caso queira pagar com cartão, entrar em contato pelo{" "}
                            <Link
                                href="https://wa.me/5561999525238?text=Ol%C3%A1%2C%20tudo%20bem%20%3F%0AGostaria%20de%20comprar%20ingressos%20para%20o%20Arraia%20da%20T3!%F0%9F%8C%BE%F0%9F%92%9B%F0%9F%96%A4"
                                target="_blank"
                                className="text-primary underline hover:text-primary-darker transition"
                            >
                                WhatsApp
                            </Link>
                        </p>
                    </DialogFooter>
                    <button
                        onClick={onClose}
                        className="mt-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Fechar
                    </button>
                </DialogContent>

            </Dialog>
        </div>
    );
}
