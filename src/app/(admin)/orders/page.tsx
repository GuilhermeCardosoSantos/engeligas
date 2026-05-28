"use client";

import * as React from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import OrdersSearch from "@/components/orders/OrderSearch";
import OrdersTable from "@/components/orders/OrderTable";

export default function Orders() {

  // =========================
  // SEARCH
  // =========================

  const [search, setSearch] =
    React.useState("");

  const [column, setColumn] =
    React.useState("all");

  // =========================
  // DATA
  // =========================

  const orders = [
    {
      id: "#821925",
      serie: "1",
      nfe: "#0",
      po: "22256",
      os: true,
      status: "ABERTO",
      prioridade: "NORMAL",
      abertura: "28/05/2026 às 11:55",
      empresa:
        "LUNAMETAIS COM DE ACOS E METAIS LTDA",
      vendedor: "RICARDO VAZ",
      total: "R$ 600,00",
    },

    {
      id: "#821876",
      serie: "1",
      nfe: "#0",
      po: "22250",
      os: false,
      status: "ABERTO",
      prioridade: "ALTA",
      abertura: "28/05/2026 às 10:25",
      empresa:
        "LUNAMETAIS COM DE ACOS E METAIS LTDA",
      vendedor: "RICARDO VAZ",
      total: "R$ 1.215,50",
    },

    {
      id: "#821839",
      serie: "1",
      nfe: "#0",
      po: "-",
      os: true,
      status: "ABERTO",
      prioridade: "NORMAL",
      abertura: "28/05/2026 às 09:17",
      empresa: "NORTOX SA",
      vendedor: "MARCIO SOUZA",
      total: "R$ 2.300,00",
    },

    {
      id: "#821807",
      serie: "1",
      nfe: "#0",
      po: "78457",
      os: false,
      status: "ABERTO",
      prioridade: "URGENTE",
      abertura: "28/05/2026 às 08:04",
      empresa:
        "SCHNELL BRASIL S.A - INDUSTRIA DE MAQUINAS",
      vendedor: "RICARDO VAZ",
      total: "R$ 22.795,20",
    },
  ];

  return (
    <div className="space-y-6">

      {/* BREADCRUMB */}

      <PageBreadcrumb pageTitle="Pedidos" />

      {/* SEARCH */}

      <OrdersSearch
        search={search}
        setSearch={setSearch}
        column={column}
        setColumn={setColumn}
      />

      {/* TABLE */}

      <OrdersTable
        orders={orders}
        search={search}
        column={column}
      />

    </div>
  );
}