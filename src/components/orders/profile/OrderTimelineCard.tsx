"use client";

import { formatDateTime } from "@/components/ui/mask/Index";

type Props = {
  order: any;
};

export default function OrderTimelineCard({
  order,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">

      <h3 className="mb-6 text-lg font-semibold">
        Timeline
      </h3>

      <div className="space-y-6">

        <div>

          <p className="font-medium">
            Pedido criado
          </p>

          <p className="text-sm text-gray-500">
            {formatDateTime(order.created_at)}
          </p>

        </div>

        <div>

          <p className="font-medium">
            Última atualização
          </p>

          <p className="text-sm text-gray-500">
            {formatDateTime(order.updated_at)}
          </p>

        </div>

      </div>

    </div>
  );
}