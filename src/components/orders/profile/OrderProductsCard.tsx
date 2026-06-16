"use client";

import Link from "next/link";

import {
  Boxes,
  Eye,
  Package,
  Scale,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

import {
  formatCurrency,
  formatMedidas,
  formatText,
  formatWeight,
  getLigaClassBadge,
  getStatusClassBadge,
} from "./helpers";

type Props = {
  products: any[];
};

export default function OrderProductsCard({ products }: Props) {
  const activeProducts = (products ?? []).filter(
    (product) => !product.deleted_at
  );

  const totalProdutos = activeProducts.length;

  const valorTotal = activeProducts.reduce(
    (total, product) =>
      total + Number(product.valor_total || 0),
    0
  );

  const pesoTotal = activeProducts.reduce(
    (total, product) =>
      total + Number(product.peso_total || 0),
    0
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <Boxes className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Produtos
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalProdutos} produto(s) cadastrados no pedido.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Scale className="h-4 w-4" />

              <p className="text-xs font-medium uppercase tracking-wide">
                Peso Total
              </p>
            </div>

            <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white/90">
              {formatWeight(pesoTotal)}
            </p>
          </div>

          <div className="rounded-2xl border border-engeligas-500/20 bg-engeligas-500/5 px-5 py-3">
            <div className="flex items-center gap-2 text-engeligas-500">
              <Package className="h-4 w-4" />

              <p className="text-xs font-medium uppercase tracking-wide">
                Valor Total
              </p>
            </div>

            <p className="mt-1 text-lg font-semibold text-engeligas-500">
              {formatCurrency(valorTotal)}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-white/[0.03]">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Item
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Liga
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Medidas
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Quantidade
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Status
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Peso Unit.
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Peso Total
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Valor Unit.
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Valor Total
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {activeProducts.length > 0 ? (
                activeProducts.map((product) => {
                  const status = product.status ?? "EM ABERTO";

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                    >
                      <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800 dark:text-white/90">
                        {formatText(product.item)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            ${getLigaClassBadge(product.liga)}
                          `}
                        >
                          {product.liga ?? "NÃO ENCONTRADO"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-gray-700 dark:text-gray-300">
                        {formatMedidas(product.medidas)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                        {product.quantidade} {product.unidade}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            ${getStatusClassBadge(status)}
                          `}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                        {formatWeight(product.peso_unitario)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-medium text-gray-800 dark:text-white/90">
                        {formatWeight(product.peso_total)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(product.valor_unitario)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-engeligas-500">
                        {formatCurrency(product.valor_total)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        <Link href={`/os/${product.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                            Ver OS
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="h-32 text-center text-gray-500 dark:text-gray-400"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}