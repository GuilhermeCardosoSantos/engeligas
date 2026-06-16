"use client";

import {
  CalendarClock,
  Clock3,
  TimerReset,
} from "lucide-react";

import {
  formatDate,
  formatDateTime,
} from "./helpers";

type Props = {
  order: any;
};

function TimelineItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="relative flex gap-4">
      <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-engeligas-500/20 bg-white text-engeligas-500 dark:bg-gray-900">
        {icon}
      </div>

      <div className="pb-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function OrderTimelineCard({
  order,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500">
          <Clock3 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Timeline
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Datas principais do pedido.
          </p>
        </div>
      </div>

      <div className="relative space-y-7">
        <div className="absolute left-[13px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-800" />

        <TimelineItem
          icon={
            <CalendarClock className="h-3.5 w-3.5" />
          }
          label="Emissão"
          value={formatDate(order.emissao)}
        />

        <TimelineItem
          icon={
            <TimerReset className="h-3.5 w-3.5" />
          }
          label="Previsto"
          value={formatDate(order.previsto)}
        />

        <TimelineItem
          icon={
            <Clock3 className="h-3.5 w-3.5" />
          }
          label="Pedido criado"
          value={formatDateTime(order.created_at)}
        />

        <TimelineItem
          icon={
            <Clock3 className="h-3.5 w-3.5" />
          }
          label="Última atualização"
          value={formatDateTime(order.updated_at)}
        />
      </div>
    </div>
  );
}