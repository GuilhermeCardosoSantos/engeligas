"use client";

type Props = {
  order: any;
};

export default function OrderFinanceCard({
  order,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

      <h3 className="mb-6 text-lg font-semibold">
        Financeiro
      </h3>

      <div className="space-y-4">

        <Row
          label="Condição"
          value={
            order.condicao_pagamento
          }
        />

        <Row
          label="Total"
          value={new Intl.NumberFormat(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          ).format(order.total)}
        />

      </div>

    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="flex justify-between">

      <span>{label}</span>

      <strong>{value}</strong>

    </div>
  );
}