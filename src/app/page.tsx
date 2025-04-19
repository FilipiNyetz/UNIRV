'use client'

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { INGRESSOS } from '@/data/ingressos.data';
import { Modal } from '@/components/modal';


export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const isAluno = true;

  return (
    <main className="h-auto bg-background px-4 py-8 flex flex-col items-center">
      <div className="max-w-md w-full text-center mb-2">
        <h2 className="text-xl font-semibold text-zinc-800">
          Seja bem-vindo ao portal da <span className="text-primary font-bold">T3</span>,
          <br />
          garanta seu ingresso para o <span className="text-primary">ARRAÍA T3</span>!
        </h2>
      </div>
      <div className="w-full max-w-md">
        <div className="w-full h-50 bg-gray-600 mb-2"></div>
        <div className=" flex w-full items-center justify-center flex-col">
          <h4 className="text-sm">30 de Maio, Sex. | Localização | 20:00 h</h4>
          <h2 className="font-semibold mt-1">Restam <span className="text-primary">15</span> ingressos no 1° Lote</h2>
        </div>
      </div>
      <div className="mt-2">
        {INGRESSOS.map((ingresso) =>
          <Card className="mb-3" variant={ingresso?.status == "closed" ? 'disabled' : 'default'} key={ingresso.id}>
            <CardContent className="flex items-center">
              <div>
                <h3 className="text-lg"><span className="text-primary-darker font-semibold">{ingresso.loteNumber}° Lote</span> <br />Aluno</h3>
                <h1 className="font-semibold">{ingresso.price.aluno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                <Button disabled={!isAluno} onClick={() => setIsOpen(true)}>COMPRAR</Button>
              </div>
              <div>
                <h3 className="text-lg"><span className="text-primary-darker font-semibold">{ingresso.loteNumber}° Lote</span> <br />Externo</h3>
                <h1 className="font-semibold">{ingresso.price.aluno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                <Button disabled={isAluno} onClick={() => setIsOpen(true)}>COMPRAR</Button>
              </div>
            </CardContent>
          </Card>
        )}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </main>
  );
}
