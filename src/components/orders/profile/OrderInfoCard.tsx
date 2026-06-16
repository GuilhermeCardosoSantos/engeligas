"use client";

import {
  Building2,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Truck,
  UserRound,
} from "lucide-react";

import {
  formatDate,
  getStatusClassBadge,
} from "./helpers";

type Props = {
  order: any;
};

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
        {icon}

        <p className="text-xs font-medium uppercase tracking-wide">
          {label}
        </p>
      </div>

      <div className="text-sm font-semibold text-gray-800 dark:text-white/90">
        {value ?? "-"}
      </div>
    </div>
  );
}

export default function OrderInfoCard({ order }: Props) {
  const status = order.status ?? "EM ABERTO";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
          <ClipboardList className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Informações do Pedido
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dados comerciais e operacionais do pedido.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <InfoItem
          icon={<Building2 className="h-4 w-4" />}
          label="Cliente"
          value={order.cliente}
        />

        <InfoItem
          icon={<UserRound className="h-4 w-4" />}
          label="Vendedor"
          value={order.vendedor}
        />

        <InfoItem
          icon={<Truck className="h-4 w-4" />}
          label="Frete"
          value={order.frete}
        />

        <InfoItem
          icon={<CalendarDays className="h-4 w-4" />}
          label="Emissão"
          value={formatDate(order.emissao)}
        />

        <InfoItem
          icon={<CalendarDays className="h-4 w-4" />}
          label="Previsto"
          value={formatDate(order.previsto)}
        />

        <InfoItem
          icon={<CreditCard className="h-4 w-4" />}
          label="Pagamento"
          value={order.condicao_pagamento}
        />

        <InfoItem
          icon={<CreditCard className="h-4 w-4" />}
          label="Forma"
          value={order.forma_pagamento}
        />

        <InfoItem
          icon={<CreditCard className="h-4 w-4" />}
          label="Método"
          value={order.metodo_pagamento}
        />

        <InfoItem
          icon={<ClipboardList className="h-4 w-4" />}
          label="Status"
          value={
            <span
              className={`
                inline-flex
                w-fit
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
          }
        />
      </div>
    </div>
  );
}