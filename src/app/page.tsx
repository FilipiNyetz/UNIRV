'use client'

import { useState, useEffect, use } from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/modal';
import { LotesService } from '../../service/LotesService';
import { IngressosService } from '../../service/IngressoService';
import { api } from '../../service/api';
import { Event } from '@prisma/client';

interface Ingresso {
  id: number;
  lote_id: number;
  nome_evento: string;
  valor_aluno: number;
  valor_externo: number;
  disponivel: number;
  created_at: string;
  updated_at: string;
  data_validade: string;
  deleted_at: string | null;
}

interface Lote {
  id: number;
  ativo: number; // Adicionei a propriedade 'ativo' para determinar se o lote está ativo
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventsData, setEventsData] = useState<Event>();
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const isAluno = true;

  const lotesService = new LotesService();
  const ingressosService = new IngressosService();

  const getEvents = async () => {
    api.get("/events").then((response) => {
      setEventsData(response.data)
      console.log("events", response.data);
    })
  }

  useEffect(() => {
    getEvents()
  }, [])

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const lotesResponse = await lotesService.listarTodos();
  //       const ingressosResponse = await ingressosService.listarTodos();
  //       setIngressos(ingressosResponse.data);
  //       setLotes(lotesResponse.data); // Adiciona os lotes ao estado
  //       console.log('Ingressos carregados:', ingressosResponse.data);
  //       console.log('Lotes carregados:', lotesResponse.data);
  //     } catch (err) {
  //       console.error('Erro ao carregar dados:', err);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // Agrupando ingressos por lote_id e somando os disponíveis
  const ingressosPorLote = ingressos.reduce((acc, ingresso) => {
    const { lote_id, valor_aluno, valor_externo } = ingresso;
    if (!acc[lote_id]) {
      acc[lote_id] = {
        lote_id,
        valor_aluno,
        valor_externo,
        disponivel: 0,
      };
    }
    acc[lote_id].disponivel += ingresso.disponivel;
    return acc;
  }, {} as Record<number, { lote_id: number; valor_aluno: number; valor_externo: number; disponivel: number }>);

  return (
    <main className="h-auto px-4 py-8 flex flex-col items-center">
      <div className="flex flex-col max-w-md w-full text-center mb-2 items-center">
        <Image src="/Brasao.png" alt="Brasao da turma" width={80} height={80} />
        <h2 className="text-xl font-semibold text-zinc-800">
          Seja bem-vindo ao portal da <span className="text-primary font-bold">T3</span>
        </h2>
      </div>

      {eventsData?.filter((event: Event) => event.active).map((event: Event) => {
        const formattedDate = new Date(event.date).toLocaleDateString('pt-BR')
        return (
          <div className="w-full max-w-md" key={event.id}>
            <p>garanta seu ingresso para o <span className="text-primary">{event.name}</span>!</p>
            <div className="w-full h-50 bg-gray-600 mb-2"></div>
            <div className="flex w-full items-center justify-center flex-col">
              <h3 className="text-m">{formattedDate}</h3>
            </div>

            <div className="mt-2 w-full max-w-md">
              <Card>
                <CardContent className="flex items-center flex-col gap-0">
                  <h2 className="text-lg">
                    <span className="text-primary-darker font-semibold">
                      {event?.Batch[0]?.name}
                    </span>
                  </h2>
                  <div className="flex w-full h-full gap-6">
                    <div className="flex flex-col justify-center items-center w-full">
                      <h3 className="text-xl">Aluno</h3>
                      <h1 className="font-semibold">
                        {event?.Batch[0]?.Tickets[0]?.student_price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </h1>
                      <Button
                        disabled={!isAluno}
                        onClick={() => setIsOpen(true)}
                      >
                        COMPRAR
                      </Button>
                    </div>

                    <div className="border-l border-black h-full" />

                    <div className="flex flex-col justify-center items-center w-full">
                      <h3 className="text-xl">Externo</h3>
                      <h1 className="font-semibold">
                        {event?.Batch[0]?.Tickets[0]?.external_price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </h1>
                      <Button
                        disabled={isAluno}
                        onClick={() => setIsOpen(true)}
                      >
                        COMPRAR
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        )
      })}
    </main>
  );
}