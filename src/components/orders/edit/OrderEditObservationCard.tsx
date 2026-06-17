"use client";

import {
  MessageSquareText,
  StickyNote,
} from "lucide-react";

type Props = {
  form: any;

  setForm: React.Dispatch<
    React.SetStateAction<any>
  >;
};

export default function OrderEditObservationCard({
  form,
  setForm,
}: Props) {
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
            Informações internas ou complementares sobre o pedido.
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          <StickyNote className="h-4 w-4" />
          Observação
        </label>

        <textarea
          value={form.observacao ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              observacao: e.target.value,
            })
          }
          className="min-h-[150px] w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          placeholder="Digite uma observação para este pedido..."
        />
      </div>
    </div>
  );
}