"use client";

import { useParams } from "next/navigation";
// 
import OrderHeader from "@/components/orders/profile/OrderHeader";
import OrderInfoCard from "@/components/orders/profile/OrderInfoCard";
import OrderFinanceCard from "@/components/orders/profile/OrderFinanceCard";
import OrderProductsCard from "@/components/orders/profile/OrderProductsCard";
import OrderTimelineCard from "@/components/orders/profile/OrderTimelineCard";
// 
import { useGetOrderById } from "@/hooks/order/useGetOrderById";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// 


export default function OrderProfile() {

  const params =
    useParams();

  const id =
    Number(params.id);

  const { data, isLoading, error } = useGetOrderById(id);

  if (isLoading) {
    return (
      <div>
        Carregando pedido...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Erro ao carregar pedido.
      </div>
    );
  }

  return (

    <div className="space-y-6">
      <PageBreadcrumb pageTitle={`Pedido #${data.order.pedido_id}`} backTitle={`Pedidos`} to={`/orders`} />
      <OrderHeader
        order={{
          ...data.order,
          products_count:
            data.products?.length ?? 0
        }}
      />

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 xl:col-span-8 space-y-6">

          <OrderInfoCard
            order={data.order}
          />

          <OrderProductsCard
            products={data.products}
          />

        </div>

        <div className="col-span-12 xl:col-span-4 space-y-6">

          <OrderFinanceCard
            order={data.order}
          />

          <OrderTimelineCard
            order={data.order}
          />

        </div>

      </div>

    </div>

  );
}