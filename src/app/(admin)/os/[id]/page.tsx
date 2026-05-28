"use client";

import * as React from "react";

import OSSearch from "@/components/os/OSSearch";
import OSProfile from "@/components/os/OSProfile";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function OS() {

    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="OS #20336" backTitle="Consultar OS" to="/users" />
            <OSProfile />
        </div>
    );
}