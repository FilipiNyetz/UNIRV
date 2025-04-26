'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/modal';
import { LotesService } from '../../service/LotesService';
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

interface Lote {
  id: number;
  ativo: number; // Adicionei a propriedade 'ativo' para determinar se o lote está ativo
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const isAluno = true;

  const lotesService = new LotesService();
  const ingressosService = new IngressosService();

  useEffect(() => {
    async function fetchData() {
      try {
        const lotesResponse = await lotesService.listarTodos();
        const ingressosResponse = await ingressosService.listarTodos();
        setIngressos(ingressosResponse.data);
        setLotes(lotesResponse.data); // Adiciona os lotes ao estado
        console.log('Ingressos carregados:', ingressosResponse.data);
        console.log('Lotes carregados:', lotesResponse.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    }

    fetchData();
  }, []);

  // Agrupando ingressos por lote_id e somando os disponíveis
  const ingressosPorLote = ingressos.reduce((acc, ingresso) => {
    const { lote_id, valor } = ingresso;
    if (!acc[lote_id]) {
      acc[lote_id] = {
        lote_id,
        valor,
        disponivel: 0,
      };
    }
    acc[lote_id].disponivel += ingresso.disponivel;
    return acc;
  }, {} as Record<number, { lote_id: number; valor: number; disponivel: number }>);

  return (
    <main className="h-auto px-4 py-8 flex flex-col items-center">
      <div className="flex flex-col max-w-md w-full text-center mb-2 items-center">
        <Image src="/Brasao.png" alt="Brasao da turma" width={80} height={80} />
        <h2 className="text-xl font-semibold text-zinc-800">
          Seja bem-vindo ao portal da <span className="text-primary font-bold">T3</span>,
          <br />
          garanta seu ingresso para o <span className="text-primary">ARRAÍA T3</span>!
        </h2>
      </div>

      <div className="w-full max-w-md">
        <div className="w-full h-50 bg-gray-600 mb-2"></div>
        <div className="flex w-full items-center justify-center flex-col">
          <h3 className="text-m">30 de Maio, Sex. | Localização | 20:00 h</h3>
        </div>
      </div>

      <div className="mt-2 w-full max-w-md">
        {Object.values(ingressosPorLote).map((ingresso) => {
          // Encontre o lote correspondente ao ingresso
          const lote = lotes.find((l) => l.id === ingresso.lote_id);

          let isLoteAtivo

          // Verifique se o lote está ativo
          if (lote?.ativo == 1) {
            isLoteAtivo = true
          }


          // Defina se o lote está habilitado ou não
          const isLoteHabilitado = isLoteAtivo && ingresso.disponivel > 0;

          return (
            <Card
              className="mb-3"
              variant={isLoteHabilitado ? 'default' : 'disabled'} // Se o lote não for ativo ou não tiver ingressos disponíveis, o card fica desabilitado
              key={ingresso.lote_id}
            >
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
                      {isAluno ? (ingresso.valor) : (ingresso.valor + 5).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </h1>
                    <Button
                      disabled={!isAluno || !isLoteHabilitado}
                      onClick={() => setIsOpen(true)}
                    >
                      COMPRAR
                    </Button>
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
                    <Button
                      disabled={isAluno || !isLoteHabilitado}
                      onClick={() => setIsOpen(true)}
                    >
                      COMPRAR
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </main>
  );
}
