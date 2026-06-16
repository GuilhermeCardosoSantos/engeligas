"use client";

import * as React from "react";

import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import OrderEditHeader from "@/components/orders/edit/OrderEditHeader";
import OrderEditInfoCard from "@/components/orders/edit/OrderEditInfoCard";
import OrderEditFinancialCard from "@/components/orders/edit/OrderEditFinancialCard";
import OrderEditProductsCard from "@/components/orders/edit/OrderEditProductsCard";

import { useGetOrderById } from "@/hooks/order/useGetOrderById";
import { useUpdateOrder } from "@/hooks/order/useUpdateOrder";

export default function EditOrder() {
  const params = useParams<{
    id: string;
  }>();

  const { data, isLoading, error } =
    useGetOrderById(Number(params.id));

  const updateOrder = useUpdateOrder();

  const [form, setForm] =
    React.useState<any>(null);

  const handleSave = async () => {
    try {
      await updateOrder.mutateAsync(form);

      toast.success(
        "Pedido atualizado com sucesso."
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar."
      );
    }
  };

  React.useEffect(() => {
    if (!data?.order) {
      return;
    }

    setForm({
      id: data.order.id,

      cliente: data.order.cliente,
      vendedor: data.order.vendedor,

      frete: data.order.frete,
      status: data.order.status,

      emissao: data.order.emissao,
      previsto: data.order.previsto,

      condicao_pagamento:
        data.order.condicao_pagamento,

      forma_pagamento:
        data.order.forma_pagamento,

      metodo_pagamento:
        data.order.metodo_pagamento,
    });
  }, [data]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
        Carregando pedido...
      </div>
    );
  }

  if (error || !data?.order || !form) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        Pedido não encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        pageTitle={`Editar pedido #${data.order.pedido_id}`}
        backTitle={`#${data.order.pedido_id}`}
        to={`/orders/${data.order.id}`}
      />

      <OrderEditHeader
        order={data.order}
        form={form}
        onSave={handleSave}
        isSaving={updateOrder.isPending}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <OrderEditInfoCard
            form={form}
            setForm={setForm}
          />
        </div>

        <div className="space-y-6">
          <OrderEditFinancialCard
            form={form}
            setForm={setForm}
          />
        </div>
      </div>

      <OrderEditProductsCard
        products={data.products ?? []}
      />
    </div>
  );
}