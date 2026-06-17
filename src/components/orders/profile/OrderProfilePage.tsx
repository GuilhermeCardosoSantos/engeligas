"use client";

import { useParams } from "next/navigation";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { useGetOrderById } from "@/hooks/order/useGetOrderById";

import OrderHeader from "@/components/orders/profile/OrderHeader";
import OrderInfoCard from "@/components/orders/profile/OrderInfoCard";
import OrderFinanceCard from "@/components/orders/profile/OrderFinanceCard";
import OrderProductsCard from "@/components/orders/profile/OrderProductsCard";
import OrderTimelineCard from "@/components/orders/profile/OrderTimelineCard";
import OrderImagesCard from "@/components/orders/profile/OrderImagesCard";
import OrderObservationCard from "./OrderObservationCard";

export default function OrderProfilePage() {
  const params = useParams<{
    id: string;
  }>();

  const id = Number(params.id);

  const {
    data,
    isLoading,
    error,
  } = useGetOrderById(id);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
        Carregando pedido...
      </div>
    );
  }

  if (error || !data?.order) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        Pedido não encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        pageTitle={`Pedido #${data.order.pedido_id}`}
        backTitle="Pedidos"
        to="/orders"
      />

      <OrderHeader
        order={data.order}
        products={data.products ?? []}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <OrderInfoCard order={data.order} />

          <OrderObservationCard order={data.order} />

          <OrderProductsCard
            products={data.products ?? []}
          />

          <OrderImagesCard
            pedidoId={data.order.pedido_id}
          />
        </div>


        <div className="space-y-6">
          <OrderFinanceCard order={data.order} />

          <OrderTimelineCard order={data.order} />
        </div>
      </div>
    </div>
  );
}