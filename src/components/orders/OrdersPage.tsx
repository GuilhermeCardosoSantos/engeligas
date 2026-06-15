"use client";

import * as React from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import OrdersSearch from "@/components/orders/OrderSearch";
import OrdersTable from "@/components/orders/OrderTable";

import { useGetAllOrders } from "@/hooks/order/useGetAllOrders";
import { useStartSync } from "@/hooks/order/useStartSync";
import { useGetSyncStatus } from "@/hooks/order/useGetSyncStatus";

import { toast } from "react-toastify";
import { useImportOrder } from "@/hooks/order/useImportOrder";
import { useDeleteOrder } from "@/hooks/order/useDeleteOrder";

export default function Orders() {
  const [search, setSearch] =React.useState("");
  const [column, setColumn] =React.useState("all");
  const [localSync, setLocalSync] = React.useState(false);
  // hooks
  const {
    data,
    isLoading,
    error,
    refetch
  } = useGetAllOrders();
  const startSync = useStartSync();
  const importOrder = useImportOrder();
  const { data: syncStatus} = useGetSyncStatus();
  const deleteOrder = useDeleteOrder();

  const orders = data?.data ?? [];

  const handleSync = async () => {
    try {
      setLocalSync(true);
      await startSync.mutateAsync();
      toast.success(
        "Sincronização iniciada com sucesso."
      );
    } catch (error) {
      setLocalSync(false);
      toast.warning(
        error instanceof Error
          ? error.message
          : "Sincronização já está em execução."
      );
      console.error(error);

    }
  };

  const handleUpload = async (file: File) => {

      try {

        await importOrder.mutateAsync(
          file
        );

        toast.success(
          "Pedido importado com sucesso."
        );

        refetch();

      } catch (error) {

        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao importar pedido."
        );

      }

  };

  const handleDelete = async (
    id: number
  ) => {

    try {

      await deleteOrder.mutateAsync(
        id
      );

      toast.success(
        "Pedido excluído com sucesso."
      );

      refetch();

    } catch (error) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao excluir pedido."
      );

    }

  };

  React.useEffect(() => {
    setLocalSync(
      !!syncStatus?.running
    );
  }, [syncStatus?.running]);



  if (isLoading) {
    return <div>Carregando pedidos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar pedidos.</div>;
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Pedidos" />

      <OrdersSearch
        search={search}
        setSearch={setSearch}
        onUpload={handleUpload}
        column={column}
        setColumn={setColumn}
        syncStatus={syncStatus}
        onSync={handleSync}
        isSyncing={
          localSync ||
          startSync.isPending
        }
      />

      <OrdersTable
        orders={orders}
        search={search}
        column={column}
        onDelete={handleDelete}
      />
    </div>
  );
}