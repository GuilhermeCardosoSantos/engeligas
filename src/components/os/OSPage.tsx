"use client";

import * as React from "react";

import OSSearch from "@/components/os/OSSearch";
import OsTable from "@/components/os/OsTable";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { useGetAllProducts } from "@/hooks/order/useGetAllProducts";

export default function OSPage() {
  const [search, setSearch] =
    React.useState("");

  const [filter, setFilter] =
    React.useState("");

  const [column, setColumn] =
    React.useState("all");

  const {
    data,
    isLoading,
    error,
  } = useGetAllProducts();


  if (error) {
    return (
      <div>
        Erro ao carregar ordens de serviço.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
       Carregando ordens de serviço.
      </div>
    );
  }

  const products = data ?? [];

  return (
    <div className="space-y-6">

      <PageBreadcrumb
        pageTitle="Ordem de serviço"
      />

      <OSSearch
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        column={column}
        setColumn={setColumn}
      />

      <OsTable
        data={products}
        isLoading={isLoading}
        search={search}
        filter={filter}
        column={column}
      />

    </div>
  );
}