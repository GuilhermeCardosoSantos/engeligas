"use client";

import Link from "next/link";

import {
  ArrowUpRight,
  Boxes,
  ClipboardList,
  Package,
  Pencil,
  Scale,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

type Props = {
  products: any[];
};

const getLigaClassBadge = (liga?: string) => {
  const value =
    liga?.toUpperCase().trim() ?? "";

  if (value === "NÃO ENCONTRADO") {
    return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
  }

  return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
};

const formatNumber = (value?: number) => {
  if (
    value === null ||
    value === undefined
  ) {
    return "-";
  }

  return new Intl.NumberFormat(
    "pt-BR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(Number(value));
};

const formatWeight = (value?: number) => {
  if (
    value === null ||
    value === undefined
  ) {
    return "-";
  }

  return `${formatNumber(value)} KG`;
};

function ProductCard({
  product,
}: {
  product: any;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-engeligas-500/40 hover:bg-engeligas-500/[0.03] dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-engeligas-500/40">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
            <Package className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-gray-800 dark:text-white/90">
                OS #{product.id}
              </p>

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
            </div>

            <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {product.item ?? "-"}
            </p>

            <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
              {product.produto_original ?? product.obs_original ?? "-"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:min-w-[360px]">
          <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Qtd
            </p>

            <p className="mt-1 font-semibold text-gray-800 dark:text-white/90">
              {formatNumber(product.quantidade)}{" "}
              {product.unidade ?? ""}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
            <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Scale className="h-3.5 w-3.5" />
              Peso
            </p>

            <p className="mt-1 font-semibold text-gray-800 dark:text-white/90">
              {formatWeight(product.peso_total)}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total
            </p>

            <p className="mt-1 font-semibold text-gray-800 dark:text-white/90">
              {formatNumber(product.valor_total)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link href={`/os/${product.id}`}>
            <Button size="sm" variant="outline">
              <ArrowUpRight className="h-4 w-4" />
              Ver OS
            </Button>
          </Link>

          <Link href={`/os/${product.id}/edit`}>
            <Button size="sm">
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderEditProductsCard({
  products,
}: Props) {

  const activeProducts = (products ?? []).filter(
    (product) => !product.deleted_at
  );
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <Boxes className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Produtos Vinculados
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ordens de serviço relacionadas ao pedido.
            </p>
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:bg-white/[0.06] dark:text-gray-300">
          <ClipboardList className="h-4 w-4" />
          {activeProducts.length} OS
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          Nenhum produto vinculado a este pedido.
        </div>
      ) : (
        <div className="space-y-4">
          {activeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}