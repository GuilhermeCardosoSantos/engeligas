"use client";

import * as React from "react";

import OSSearch from "@/components/os/OSSearch";
import OSEditPage from "@/components/os/edit/OSEditPage";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function OS() {

    return (
        <div className="space-y-6">
            <OSEditPage />
        </div>
    );
}