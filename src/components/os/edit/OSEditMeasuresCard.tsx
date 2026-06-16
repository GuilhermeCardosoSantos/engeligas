"use client";

import {
  Plus,
  Ruler,
  Trash2,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

type Props = {
  form: any;

  onMeasureChange: (
    index: number,
    field: "valor" | "unidade",
    value: string
  ) => void;

  onAddMeasure: () => void;

  onRemoveMeasure: (
    index: number
  ) => void;
};

const inputClass =
  "h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm text-gray-800 outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

export default function OSEditMeasuresCard({
  form,
  onMeasureChange,
  onAddMeasure,
  onRemoveMeasure,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <Ruler className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Medidas
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Edite as dimensões da OS.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={onAddMeasure}
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-4">
        {form.medidas.map(
          (
            medida: any,
            index: number
          ) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03] sm:grid-cols-[1fr_160px_auto]"
            >
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Valor
                </label>

                <input
                  value={
                    medida.valor ?? ""
                  }
                  onChange={(e) =>
                    onMeasureChange(
                      index,
                      "valor",
                      e.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="Ex: 120"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Unidade
                </label>

                <select
                  value={
                    medida.unidade ??
                    "MM"
                  }
                  onChange={(e) =>
                    onMeasureChange(
                      index,
                      "unidade",
                      e.target.value
                    )
                  }
                  className={inputClass}
                >
                  <option value="MM">
                    MM
                  </option>

                  <option value="CM">
                    CM
                  </option>

                  <option value="M">
                    M
                  </option>

                  <option value="POL">
                    POL
                  </option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() =>
                    onRemoveMeasure(
                      index
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}