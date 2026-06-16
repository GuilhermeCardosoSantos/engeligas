"use client";

import { useParams } from "next/navigation";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { useGetProductById } from "@/hooks/order/useGetProductById";

import OSHeader from "@/components/os/profile/OSHeader";
import OSInfoCard from "@/components/os/profile/OSInfoCard";
import OSMeasureCard from "@/components/os/profile/OSMeasureCard";
import OSOrderCard from "@/components/os/profile/OSOrderCard";
import OSObservationCard from "@/components/os/profile/OSObservationCard";

export default function OSProfilePage() {
  const params = useParams<{
    id: string;
  }>();

  const id = Number(params.id);

  const {
    data,
    isLoading,
    error,
  } = useGetProductById(id);

  const os =
    Array.isArray(data)
      ? data[0]
      : Array.isArray(data?.data)
        ? data.data[0]
        : data?.data ?? data;

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
        Carregando OS...
      </div>
    );
  }

  if (error || !os) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        OS não encontrada.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        pageTitle={`OS #${os.id}`}
        backTitle="Ordem de serviço"
        to="/os"
      />

      <OSHeader os={os} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <OSInfoCard os={os} />

          <OSMeasureCard os={os} />

          <OSObservationCard os={os} />
        </div>

        <div className="space-y-6">
          <OSOrderCard os={os} />
        </div>
      </div>
    </div>
  );
}