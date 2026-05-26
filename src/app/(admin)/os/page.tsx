"use client";

import * as React from "react";

import OSSearch from "@/components/os/OSSearch";
import OsTable from "@/components/os/OsTable";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function OS() {
  const [search, setSearch] =
    React.useState("");

  const [filter, setFilter] =
    React.useState("");

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Ordem de serviço" />

      <OSSearch
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <OsTable
        search={search}
        filter={filter}
      />
    </div>
  );
}