"use client";

import { useParams } from "next/navigation";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import OrderEditHeader from "@/components/orders/edit/OrderEditHeader";
import OrderEditInfoCard from "@/components/orders/edit/OrderEditInfoCard";
import OrderEditFinancialCard from "@/components/orders/edit/OrderEditFinancialCard";
import OrderEditProductsCard from "@/components/orders/edit/OrderEditProductsCard";

import { useGetOrderById } from "@/hooks/order/useGetOrderById";
import { useUpdateOrder } from "@/hooks/order/useUpdateOrder";
import { toast } from "react-toastify";
import React from "react";

export default function EditOrder() {
    const params =
        useParams<{
            id: string;
        }>();

    const { data } =
        useGetOrderById(
            Number(params.id)
        );
    const updateOrder =
        useUpdateOrder();

    const [form, setForm] =
        React.useState<any>(null);


    const handleSave =
        async () => {
            try {

                await updateOrder.mutateAsync(
                    form
                );

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

            cliente:
                data.order.cliente,

            vendedor:
                data.order.vendedor,

            frete:
                data.order.frete,

            status:
                data.order.status,

            emissao:
                data.order.emissao,

            previsto:
                data.order.previsto,

            condicao_pagamento:
                data.order.condicao_pagamento,

            forma_pagamento:
                data.order.forma_pagamento,

            metodo_pagamento:
                data.order.metodo_pagamento,
        });

    }, [data]);

    if (!data || !form) {
        return null;
    }

    return (
        <div className="space-y-6">

            <PageBreadcrumb pageTitle={`Editar pedido #${data.order.pedido_id}`} backTitle={`#${data.order.pedido_id}`} to={`/orders/${data.order.id}`} />

            <OrderEditHeader
                order={data.order}
                onSave={handleSave}
                isSaving={
                    updateOrder.isPending
                }
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                <div className="xl:col-span-2">

                    <OrderEditInfoCard
                        form={form}
                        setForm={setForm}
                    />

                </div>

                <div>

                    <OrderEditFinancialCard
                        form={form}
                        setForm={setForm}
                    />

                </div>

            </div>

            <OrderEditProductsCard
                products={data.products}
            />

        </div>
    );
}