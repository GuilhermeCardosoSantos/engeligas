"use client";

import {
  Package,
  FileOutput,
  Pencil,
} from "lucide-react";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import { getStatusClassBadge } from "@/components/ui/badge/ClassBadge";

type Props = {
  order: any;
  products?: any[];
};

export default function OrderHeader({
  order,
  products = [],
}: Props) {
  const activeProducts = products.filter(
    (product) => !product.deleted_at
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-5">
          <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
            <Package className="h-8 w-8" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                Pedido #{order.pedido_id}
              </h1>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${getStatusClassBadge(order.status)}
                `}
              >
                {order.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {order.cliente}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/orders/${order.id}/edit`}>
                <Button variant="outline">
                  <Pencil className="h-4 w-4" />
                  Editar Pedido
                </Button>
              </Link>

              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}order/file/${order.pedido_id}/anexo_${order.pedido_id}.pdf`}
                target="_blank"
              >
                <Button>
                  <FileOutput className="h-4 w-4" />
                  PDF
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xl:min-w-[340px]">
          <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Produtos
            </p>

            <h3 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white">
              {activeProducts.length}
            </h3>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Valor Total
            </p>

            <h3 className="mt-2 text-xl font-semibold text-engeligas-500">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(order.total ?? 0))}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}