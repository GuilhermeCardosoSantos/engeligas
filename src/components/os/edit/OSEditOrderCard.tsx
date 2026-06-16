"use client";

import Link from "next/link";

import {
  Building2,
  CalendarDays,
  ClipboardList,
  Truck,
  UserRound,
} from "lucide-react";

import {
  formatCurrency,
  formatDate,
  getStatusClassBadge,
} from "@/components/os/profile/helpers";

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mt-0.5 text-gray-400">
        {icon}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <div className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
          {value ?? "-"}
        </div>
      </div>
    </div>
  );
}

export default function OSEditOrderCard({
  os,
}: {
  os: any;
}) {
  const orderStatus =
    os.order_status ?? "EM ABERTO";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
          <ClipboardList className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Pedido vinculado
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dados somente leitura do pedido.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <DetailItem
          icon={<ClipboardList className="h-5 w-5" />}
          label="Pedido"
          value={
            <Link
              href={`/orders/${os.order_id}`}
              className="text-engeligas-500 hover:underline"
            >
              #{os.pedido_id}
            </Link>
          }
        />

        <DetailItem
          icon={<Building2 className="h-5 w-5" />}
          label="Cliente"
          value={os.cliente}
        />

        <DetailItem
          icon={<UserRound className="h-5 w-5" />}
          label="Vendedor"
          value={os.vendedor}
        />

        <DetailItem
          icon={<CalendarDays className="h-5 w-5" />}
          label="Emissão"
          value={formatDate(os.emissao)}
        />

        <DetailItem
          icon={<CalendarDays className="h-5 w-5" />}
          label="Previsto"
          value={formatDate(os.previsto)}
        />

        <DetailItem
          icon={<Truck className="h-5 w-5" />}
          label="Frete"
          value={os.frete}
        />

        <DetailItem
          icon={<ClipboardList className="h-5 w-5" />}
          label="Status Pedido"
          value={
            <span
              className={`
                inline-flex
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                ${getStatusClassBadge(
                  orderStatus
                )}
              `}
            >
              {orderStatus}
            </span>
          }
        />

        <div className="rounded-2xl border border-engeligas-500/20 bg-engeligas-500/5 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-engeligas-500">
            Total Pedido
          </p>

          <p className="mt-2 text-2xl font-bold text-engeligas-500">
            {formatCurrency(
              os.total_pedido
            )}
          </p>
        </div>
      </div>
    </div>
  );
}