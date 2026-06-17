"use client";

import {
  BarChart3,
} from "lucide-react";

import {
  formatNumber,
} from "./helpers";

import { ProductionLigaRow } from "./types";

type Props = {
  rows: ProductionLigaRow[];
};

export default function ProductionTable({
  rows,
}: Props) {
  const totalProduzido =
    rows.reduce(
      (acc, item) =>
        acc + Number(item.produzido ?? 0),
      0
    );

  const totalAProduzir =
    rows.reduce(
      (acc, item) =>
        acc + Number(item.a_produzir ?? 0),
      0
    );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
          <BarChart3 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Produção por Liga
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Peso produzido, peso a produzir e representatividade.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1150px] border-collapse">
          <thead>
            <tr className="border-y border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <th className="px-4 py-3 text-left">
                Liga
              </th>
              <th className="px-4 py-3 text-right">
                Produzido
              </th>
              <th className="px-4 py-3 text-right">
                A produzir
              </th>
              <th className="px-4 py-3 text-right">
                %
              </th>
              <th className="px-4 py-3 text-right">
                Bucha
              </th>
              <th className="px-4 py-3 text-right">
                B.Chata
              </th>
              <th className="px-4 py-3 text-right">
                Flange
              </th>
              <th className="px-4 py-3 text-right">
                Sextavado
              </th>
              <th className="px-4 py-3 text-right">
                Tarugo
              </th>
              <th className="px-4 py-3 text-right">
                Redondo
              </th>
              <th className="px-4 py-3 text-right">
                Modelo
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.liga}
                className="border-b border-gray-100 text-sm dark:border-gray-800"
              >
                <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">
                  {row.liga}
                </td>

                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                  {formatNumber(row.produzido)}
                </td>

                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                  {formatNumber(row.a_produzir)}
                </td>

                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                  {formatNumber(row.representatividade)}%
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(row.bucha)}
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(row.b_chata)}
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(row.flange)}
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(row.sextavado)}
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(row.tarugo)}
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(row.redondo)}
                </td>

                <td className="px-4 py-3 text-right">
                  {formatNumber(row.modelo)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 text-sm font-bold text-gray-800 dark:bg-white/[0.03] dark:text-white">
              <td className="px-4 py-3">
                TOTAL
              </td>

              <td className="px-4 py-3 text-right">
                {formatNumber(totalProduzido)}
              </td>

              <td className="px-4 py-3 text-right">
                {formatNumber(totalAProduzir)}
              </td>

              <td className="px-4 py-3 text-right">
                100,00%
              </td>

              <td colSpan={7}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}