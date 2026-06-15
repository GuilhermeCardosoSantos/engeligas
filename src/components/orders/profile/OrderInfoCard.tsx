"use client";

import { formatDate } from "@/components/ui/mask/Index";
import {
  User,
  Truck,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";

type Props = {
  order: any;
};

export default function OrderInfoCard({
  order,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="mb-6 flex items-center gap-2">

        <CircleDollarSign className="h-5 w-5 text-engeligas-500" />

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Informações do Pedido
        </h2>

      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <InfoCard
          icon={<User className="h-4 w-4" />}
          title="Cliente"
          value={order.cliente}
        />

        <InfoCard
          icon={<User className="h-4 w-4" />}
          title="Vendedor"
          value={order.vendedor}
        />

        <InfoCard
          icon={<Truck className="h-4 w-4" />}
          title="Frete"
          value={order.frete}
        />

        <InfoCard
          icon={<CalendarDays className="h-4 w-4" />}
          title="Emissão"
          value={formatDate(order.emissao)}
        />

        <InfoCard
          icon={<CalendarDays className="h-4 w-4" />}
          title="Previsto"
          value={formatDate(order.previsto)}
        />

        <InfoCard
          icon={<CircleDollarSign className="h-4 w-4" />}
          title="Pagamento"
          value={order.condicao_pagamento}
        />

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">

      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">

        {icon}

        <span className="text-sm font-medium">
          {title}
        </span>

      </div>

      <p className="mt-3 font-semibold text-gray-800 dark:text-white/90">
        {value}
      </p>

    </div>
  );
}