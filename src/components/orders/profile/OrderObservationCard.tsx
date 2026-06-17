"use client";

import {
  MessageSquareText,
  StickyNote,
} from "lucide-react";

type Props = {
  order: any;
};

export default function OrderObservationCard({
  order,
}: Props) {
  const observacao =
    order.observacao?.trim();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500">
          <MessageSquareText className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Observação do Pedido
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Informações complementares cadastradas para este pedido.
          </p>
        </div>
      </div>

      {observacao ? (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <StickyNote className="h-4 w-4" />

            <h3 className="text-sm font-semibold">
              Observação
            </h3>
          </div>

          <p className="whitespace-pre-line text-sm leading-6 text-gray-600 dark:text-gray-300">
            {observacao}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-white/[0.06] dark:text-gray-400">
            <StickyNote className="h-5 w-5" />
          </div>

          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nenhuma observação cadastrada.
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Use a edição do pedido para adicionar informações internas.
          </p>
        </div>
      )}
    </div>
  );
}