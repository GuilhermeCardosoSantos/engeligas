"use client";

import * as React from "react";

import OsForm from "@/components/os/OSForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function OS() {
  const [search, setSearch] =
    React.useState("");

  const [filter, setFilter] =
    React.useState("");

  return (
    <div className="space-y-6">
        <PageBreadcrumb pageTitle={"Ordem de serviço"} />
        <OsForm />
    </div>
  );
}