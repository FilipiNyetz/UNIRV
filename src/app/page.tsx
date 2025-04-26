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


interface Ingresso {
  id: number;
  lote_id: number;
  nome_evento: string;
  valor: number;
  disponivel: number;
  created_at: string;
  updated_at: string;
  data_validade: string;
  deleted_at: string | null;
}


export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [lotes, setLotes] = useState([]);
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const isAluno = true;

  const lotesService = new LotesService();
  const ingressosService = new IngressosService();

  useEffect(() => {
    async function fetchData() {
      try {
        const lotesResponse = await lotesService.listarTodos();
        const ingressosResponse = await ingressosService.listarTodos();

        setLotes(lotesResponse.data);
        setIngressos(ingressosResponse.data);
        console.log(ingressosResponse.data[0])
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    }

    fetchData();
  }, []);

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
        {[...new Map(ingressos.map(i => [i.lote_id, i])).values()].map((ingresso) =>
          <Card className="mb-3" variant={ingresso.disponivel === 0 ? 'disabled' : 'default'} key={ingresso.id}>
            <CardContent className="flex items-center flex-col gap-0">
              <h2 className="text-lg">
                <span className="text-primary-darker font-semibold">
                  {ingresso.lote_id}° Lote
                </span>
              </h2>
              <div className="flex w-full h-full gap-6">
                <div className="flex flex-col justify-center items-center w-full">
                  <h3 className="text-xl">Aluno</h3>
                  <h1 className="font-semibold">
                    {ingresso.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h1>
                  <Button disabled={!isAluno || ingresso.disponivel === 0} onClick={() => setIsOpen(true)}>COMPRAR</Button>
                </div>

                <div className="border-l border-black h-full" />

                <div className="flex flex-col justify-center items-center w-full">
                  <h3 className="text-xl">Externo</h3>
                  <h1 className="font-semibold">
                    {ingresso.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h1>
                  <Button disabled={isAluno || ingresso.disponivel === 0} onClick={() => setIsOpen(true)}>COMPRAR</Button>
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
