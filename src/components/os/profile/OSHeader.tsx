"use client";

import Link from "next/link";

import {
    ClipboardList,
    Package,
    Pencil,
    Scale,
    CalendarDays,
    Ruler,
    Printer,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

import { OSProfileProps } from "./type";

import {
    formatDate,
    formatMedidas,
    formatText,
    formatWeight,
    getLigaClassBadge,
    getStatusClassBadge,
} from "./helpers";

function SummaryCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300">
                    {icon}
                </div>

                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {label}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function OSHeader({ os }: OSProfileProps) {
    const status = os.status ?? "EM ABERTO";

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
                        <ClipboardList className="h-8 w-8" />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                                OS #{os.id}
                            </h1>

                            <span
                                className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${getStatusClassBadge(status)}
                `}
                            >
                                {status}
                            </span>

                            <span
                                className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${getLigaClassBadge(os.liga)}
                `}
                            >
                                {os.liga ?? "NÃO ENCONTRADO"}
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {formatText(os.item)} • Pedido{" "}
                            <Link
                                href={`/orders/${os.order_id}`}
                                className="font-medium text-engeligas-500 hover:underline"
                            >
                                #{os.pedido_id}
                            </Link>
                        </p>

                        <p className="mt-3 max-w-3xl text-sm text-gray-600 dark:text-gray-300">
                            {os.produto_original ?? "Produto sem descrição original."}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Link href={`/orders/${os.order_id}`}>
                        <Button variant="outline">
                            <Package className="h-4 w-4" />
                            Pedido
                        </Button>
                    </Link>

                    <Link href={`/os/${os.id}/print`}>
                        <Button variant="outline">
                            <Printer className="h-4 w-4" />
                            Imprimir
                        </Button>
                    </Link>

                    <Link href={`/os/${os.id}/edit`}>
                        <Button>
                            <Pencil className="h-4 w-4" />
                            Editar
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    icon={<Package className="h-5 w-5" />}
                    label="Quantidade"
                    value={`${os.quantidade ?? 0} ${os.unidade ?? ""}`}
                />

                <SummaryCard
                    icon={<Scale className="h-5 w-5" />}
                    label="Peso total"
                    value={formatWeight(os.peso_total)}
                />

                <SummaryCard
                    icon={<CalendarDays className="h-5 w-5" />}
                    label="Previsto"
                    value={formatDate(os.previsto)}
                />

                <SummaryCard
                    icon={<Ruler className="h-5 w-5" />}
                    label="Medidas"
                    value={formatMedidas(os.medidas)}
                />
            </div>
        </div>
    );
}