'use client'

import { useState, useEffect } from 'react';

import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { INGRESSOS } from '@/data/ingressos.data';
import { Modal } from '@/components/modal';
import { LotesService } from '../../service/LotesService';
import { error } from 'console';
import { IngressosService } from '../../service/IngressoService';


export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const isAluno = true;
  const ingressosService = new IngressosService()
  let ingressos;

  useEffect(() => {
    ingressosService.listarTodos().then((response) => {
      ingressos = response.data
      {
        ingressos.map((ingresso: any) =>
          console.log(ingresso)
        )
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <main className="h-auto px-4 py-8 flex flex-col items-center">
      <div>
      </div>
      <div className=" flex flex-col max-w-md w-full text-center mb-2 items-center">
        <Image src={"/Brasao.png"} alt={"Brasao da turma"} width={80} height={80} />
        <h2 className="text-xl font-semibold text-zinc-800">
          Seja bem-vindo ao portal da <span className="text-primary font-bold">T3</span>,
          <br />
          garanta seu ingresso para o <span className="text-primary">ARRAÍA T3</span>!
        </h2>
      </div>
      <div className="w-full max-w-md">
        <div className="w-full h-50 bg-gray-600 mb-2"></div>
        <div className=" flex w-full items-center justify-center flex-col">
          <h3 className="text-m ">30 de Maio, Sex. | Localização | 20:00 h</h3>
        </div>
      </div>
      <div className="mt-2">
        {INGRESSOS.map((ingresso) =>
          <Card className="mb-3" variant={ingresso?.status == "closed" ? 'disabled' : 'default'} key={ingresso.id}>
            <CardContent className="flex items-center flex-col gap-0">
              <h2 className="text-lg"><span className="text-primary-darker font-semibold">{ingresso.loteNumber}° Lote</span></h2>
              <div className='flex w-full h-full gap-6'>
                <div className='flex flex-col justify-center items-center w-full'>
                  <h3 className="text-xl">Aluno</h3>
                  <h1 className="font-semibold">{ingresso.price.aluno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                  <Button disabled={!isAluno} onClick={() => setIsOpen(true)}>COMPRAR</Button>
                </div>

                <div className="border-l border-black h-full"></div>

                <div className='flex flex-col justify-center items-center w-full'>
                  <h3 className="text-xl">Externo</h3>
                  <h1 className="font-semibold">{ingresso.price.aluno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                  <Button disabled={isAluno} onClick={() => setIsOpen(true)}>COMPRAR</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </main>
  );
}
