"use client";

import { Ruler } from "lucide-react";

import { OSProfileProps } from "./types";

export default function OSMeasureCard({ os }: OSProfileProps) {
  const medidas = Array.isArray(os.medidas)
    ? os.medidas
    : [];

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
          <Ruler className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Medidas
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dimensões informadas para fabricação ou separação.
          </p>
        </div>
      </div>

      {medidas.length > 0 ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {medidas.map((medida, index) => (
              <span
                key={`${medida.valor}-${medida.unidade}-${index}`}
                className="inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-white/5 dark:text-gray-300"
              >
                {medida.valor}
                {medida.unidade}
              </span>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Valor
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Unidade
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {medidas.map((medida, index) => (
                  <tr key={`${medida.valor}-${index}`}>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white/90">
                      Medida {index + 1}
                    </td>

                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {medida.valor}
                    </td>

                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {medida.unidade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          Nenhuma medida informada.
        </div>
      )}
    </div>
  );
}