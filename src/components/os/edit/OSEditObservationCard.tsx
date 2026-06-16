"use client";

import {
  FileText,
  MessageSquareText,
  Package,
} from "lucide-react";

type Props = {
  form: any;

  onChange: (
    field: string,
    value: any
  ) => void;
};

const textareaClass =
  "min-h-[130px] w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

export default function OSEditObservationCard({
  form,
  onChange,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500">
          <MessageSquareText className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Observações
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Edite a descrição original e observações da OS.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <Package className="h-4 w-4" />
            Produto original
          </label>

          <textarea
            value={
              form.produto_original ?? ""
            }
            onChange={(e) =>
              onChange(
                "produto_original",
                e.target.value
              )
            }
            className={textareaClass}
            placeholder="Descrição original do produto..."
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <FileText className="h-4 w-4" />
            Observação original
          </label>

          <textarea
            value={
              form.obs_original ?? ""
            }
            onChange={(e) =>
              onChange(
                "obs_original",
                e.target.value
              )
            }
            className={textareaClass}
            placeholder="Observações da OS..."
          />
        </div>
      </div>
    </div>
  );
}