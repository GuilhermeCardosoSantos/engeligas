"use client";

import React from "react";

import {
    CalendarDays,
    CircleDollarSign,
    FileText,
    ImageIcon,
    Package,
    Pencil,
    Trash2,
    Truck,
    User,
    Eye,
    Maximize2,
    Minimize2,
} from "lucide-react";

import Link from "next/link";

import Button from "@/components/ui/button/Button";

const images = [
    "/images/grid-image/image-01.png",
    "/images/grid-image/image-02.png",
    "/images/grid-image/image-03.png",
    "/images/grid-image/image-04.png",
];

const products = [
    {
        liga: "BRONZE",
        formato: "BUCHA",
        peso: "299,77 KG",
        quantidade: "12",
        valor: "R$ 14.200,00",
    },

    {
        liga: "LATÃO",
        formato: "TARUGO",
        peso: "83,41 KG",
        quantidade: "4",
        valor: "R$ 6.800,00",
    },

    {
        liga: "620",
        formato: "BARRA",
        peso: "41,20 KG",
        quantidade: "2",
        valor: "R$ 2.100,00",
    },
];

export default function OsProfile() {

    // =========================
    // CONTEXT MENU
    // =========================

    const [contextMenu, setContextMenu] =
        React.useState<{
            mouseX: number;
            mouseY: number;
            product: any;
        } | null>(null);

    // =========================
    // EXPAND TABLE
    // =========================

    const [isExpandedTable, setIsExpandedTable] =
        React.useState(false);

    const menuRef =
        React.useRef<HTMLDivElement | null>(
            null
        );

    React.useEffect(() => {

        const handleClick = () => {
            setContextMenu(null);
        };

        const handleContextMenu = (
            e: MouseEvent
        ) => {

            if (!contextMenu) return;

            const target =
                e.target as Node;

            if (
                menuRef.current?.contains(
                    target
                )
            ) {

                e.preventDefault();

                setContextMenu(null);

            }
        };

        window.addEventListener(
            "click",
            handleClick
        );

        window.addEventListener(
            "contextmenu",
            handleContextMenu
        );

        return () => {

            window.removeEventListener(
                "click",
                handleClick
            );

            window.removeEventListener(
                "contextmenu",
                handleContextMenu
            );

        };

    }, [contextMenu]);

    return (
        <div className="space-y-6">

            {/* HEADER */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">

                    {/* LEFT */}

                    <div className="flex items-start gap-5">

                        <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">

                            <Package className="h-8 w-8" />

                        </div>

                        <div>

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                                    Ordem de Serviço #20336
                                </h1>

                                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
                                    EM ATRASO
                                </span>

                            </div>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                FAVIMETAIS • Pedido 1033 • Bronze
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">

                                <Link href="/os">

                                    <Button variant="outline">
                                        Voltar
                                    </Button>

                                </Link>

                                <Link href="/os/edit/20336">

                                    <Button>
                                        Editar 
                                    </Button>

                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="grid grid-cols-2 gap-4 xl:min-w-[340px]">

                        <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">

                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                Peso Total
                            </p>

                            <h3 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white">
                                424,38 KG
                            </h3>

                        </div>

                        <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">

                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                Valor Total
                            </p>

                            <h3 className="mt-2 text-xl font-semibold text-engeligas-500">
                                R$ 23.100,00
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

            {/* GRID */}

            <div
                className={`grid gap-6 transition-all duration-300 ${
                    isExpandedTable
                        ? "grid-cols-1"
                        : "grid-cols-1 xl:grid-cols-3"
                }`}
            >

                {/* LEFT */}

                <div
                    className={`space-y-6 transition-all duration-300 ${
                        isExpandedTable
                            ? "col-span-1"
                            : "xl:col-span-2"
                    }`}
                >

                    {/* DADOS */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

                        <div className="mb-6 flex items-center gap-2">

                            <FileText className="h-5 w-5 text-engeligas-500" />

                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Informações da OS
                            </h2>

                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                            <InfoCard
                                icon={<User className="h-4 w-4" />}
                                title="Cliente"
                                value="FAVIMETAIS"
                            />

                            <InfoCard
                                icon={<User className="h-4 w-4" />}
                                title="Vendedor"
                                value="RICARDO"
                            />

                            <InfoCard
                                icon={<Truck className="h-4 w-4" />}
                                title="Frete"
                                value="CIF"
                            />

                            <InfoCard
                                icon={<CalendarDays className="h-4 w-4" />}
                                title="Emissão"
                                value="08/05/2026"
                            />

                            <InfoCard
                                icon={<CalendarDays className="h-4 w-4" />}
                                title="Previsto"
                                value="18/05/2026"
                            />

                            <InfoCard
                                icon={<CircleDollarSign className="h-4 w-4" />}
                                title="Pagamento"
                                value="30/45/60 DDL"
                            />

                        </div>

                    </div>

                    {/* PRODUTOS */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

                        {/* HEADER */}

                        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                    Produtos da Ordem
                                </h2>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Itens cadastrados na OS
                                </p>

                            </div>

                            <div className="flex items-center gap-3">

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsExpandedTable(
                                            !isExpandedTable
                                        )
                                    }
                                >

                                    {isExpandedTable ? (
                                        <>
                                            <Minimize2 className="h-4 w-4" />
                                            Minimizar
                                        </>
                                    ) : (
                                        <>
                                            <Maximize2 className="h-4 w-4" />
                                            Expandir
                                        </>
                                    )}

                                </Button>

                                <Button variant="outline">
                                    Adicionar Produto
                                </Button>

                            </div>

                        </div>

                        {/* TABLE */}

                        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">

                            <table className="w-full min-w-[950px]">

                                <thead>

                                    <tr className="border-b border-gray-100 dark:border-white/5">

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Liga
                                        </th>

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Formato
                                        </th>

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Peso
                                        </th>

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Quantidade
                                        </th>

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Valor
                                        </th>

                                        {/* NOVAS COLUNAS */}

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Comprimento
                                        </th>

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Largura
                                        </th>

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Altura
                                        </th>

                                        <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">

                                    {products.map(
                                        (
                                            product,
                                            index
                                        ) => (

                                            <tr
                                                key={index}

                                                onContextMenu={(
                                                    e
                                                ) => {

                                                    e.preventDefault();

                                                    e.stopPropagation();

                                                    setContextMenu({
                                                        mouseX:
                                                            e.clientX,

                                                        mouseY:
                                                            e.clientY,

                                                        product,
                                                    });

                                                }}

                                                className="cursor-context-menu transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                                            >

                                                <td className="px-4 py-4">

                                                    <div className="w-fit rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                                        {product.liga}
                                                    </div>

                                                </td>

                                                <td className="px-4 py-4 font-medium text-gray-800 dark:text-white/90">
                                                    {product.formato}
                                                </td>

                                                <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                                                    {product.peso}
                                                </td>

                                                <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                                                    {product.quantidade}
                                                </td>

                                                <td className="px-4 py-4 font-medium text-engeligas-500">
                                                    {product.valor}
                                                </td>

                                                {/* NOVAS CELLS */}

                                                <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                                                    1200mm
                                                </td>

                                                <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                                                    340mm
                                                </td>

                                                <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                                                    85mm
                                                </td>

                                                <td className="px-4 py-4">

                                                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                                        Produção
                                                    </span>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* OBSERVAÇÃO DESCE */}

                    {isExpandedTable && (

                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                            {/* OBS */}

                            <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

                                <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                                    Observações
                                </h2>

                                <div className="rounded-2xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-600 dark:bg-white/[0.03] dark:text-gray-300">

                                    Material solicitado com certificado.
                                    Cliente solicitou prioridade máxima na fabricação.
                                    Verificar acabamento final antes da expedição.

                                </div>

                            </div>

                            {/* IMAGENS */}

                            <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

                                <div className="mb-6 flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <ImageIcon className="h-5 w-5 text-engeligas-500" />

                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                            Imagens
                                        </h2>

                                    </div>

                                    <Button size="sm">
                                        Upload
                                    </Button>

                                </div>

                                <div className="grid grid-cols-2 gap-3">

                                    {images.map(
                                        (
                                            image,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800"
                                            >

                                                <img
                                                    src={image}
                                                    alt="Imagem da OS"
                                                    className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                                                />

                                                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                    )}

                </div>

                {/* RIGHT */}

                {!isExpandedTable && (

                    <div className="space-y-6 transition-all duration-300">

                        {/* TIMELINE */}

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

                            <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                                Timeline
                            </h2>

                            <div className="space-y-5">

                                <TimelineItem
                                    title="OS criada"
                                    date="08/05/2026 - 09:30"
                                />

                                <TimelineItem
                                    title="Material separado"
                                    date="09/05/2026 - 13:10"
                                />

                                <TimelineItem
                                    title="Produção iniciada"
                                    date="10/05/2026 - 08:00"
                                />

                                <TimelineItem
                                    title="Aguardando finalização"
                                    date="Atual"
                                    active
                                />

                            </div>

                        </div>

                        {/* OBS */}

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

                            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                                Observações
                            </h2>

                            <div className="rounded-2xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-600 dark:bg-white/[0.03] dark:text-gray-300">

                                Material solicitado com certificado.
                                Cliente solicitou prioridade máxima na fabricação.
                                Verificar acabamento final antes da expedição.

                            </div>

                        </div>

                        {/* GALERIA */}

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

                            <div className="mb-6 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <ImageIcon className="h-5 w-5 text-engeligas-500" />

                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                        Imagens
                                    </h2>

                                </div>

                                <Button size="sm">
                                    Upload
                                </Button>

                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                {images.map(
                                    (
                                        image,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800"
                                        >

                                            <img
                                                src={image}
                                                alt="Imagem da OS"
                                                className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                )}

            </div>

            {/* CONTEXT MENU */}

            {contextMenu && (

                <div
                    ref={menuRef}

                    onClick={(e) =>
                        e.stopPropagation()
                    }

                    onContextMenu={(e) => {

                        e.preventDefault();

                        e.stopPropagation();

                        setContextMenu(null);

                    }}

                    className="fixed z-50 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"

                    style={{

                        top: Math.min(
                            contextMenu.mouseY,
                            window.innerHeight - 260
                        ),

                        left: Math.min(
                            contextMenu.mouseX,
                            window.innerWidth - 240
                        ),

                    }}
                >

                    {/* HEADER */}

                    <div className="border-b border-gray-200 px-4 py-3 dark:border-white/10">

                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Produto
                        </p>

                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                            {contextMenu.product.formato}
                        </h3>

                    </div>

                    {/* ACTIONS */}

                    <div className="py-2">

                        <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-100 dark:hover:bg-white/5">

                            <Eye className="h-4 w-4" />

                            Visualizar

                        </button>

                        <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-100 dark:hover:bg-white/5">

                            <Pencil className="h-4 w-4" />

                            Editar

                        </button>

                        <div className="my-2 border-t border-gray-200 dark:border-white/10" />

                        <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10">

                            <Trash2 className="h-4 w-4" />

                            Excluir

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

function InfoCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) {

    return (

        <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">

                {icon}

                <span className="text-sm font-medium">
                    {title}
                </span>

            </div>

            <p className="mt-3 font-semibold text-gray-800 dark:text-white/90">
                {value}
            </p>

        </div>

    );
}

function TimelineItem({
    title,
    date,
    done,
    active,
}: {
    title: string;
    date: string;
    done?: boolean;
    active?: boolean;
}) {

    return (

        <div className="flex gap-4">

            {/* LINE */}

            <div className="flex flex-col items-center">

                {/* DOT */}

                <div
                    className={`relative z-10 h-3.5 w-3.5 rounded-full border-2 ${
                        done
                            ? "border-engeligas-500 bg-engeligas-500"
                            : active
                                ? "border-engeligas-500 bg-white dark:bg-gray-900"
                                : "border-gray-300 bg-gray-300 dark:border-gray-700 dark:bg-gray-700"
                    }`}
                />

                {/* LINE */}

                <div
                    className={`mt-1 w-px flex-1 ${
                        done
                            ? "bg-engeligas-500"
                            : "bg-gray-200 dark:bg-gray-800"
                    }`}
                />

            </div>

            {/* CONTENT */}

            <div className="pb-5">

                <p
                    className={`font-medium ${
                        done || active
                            ? "text-gray-800 dark:text-white/90"
                            : "text-gray-400 dark:text-gray-500"
                    }`}
                >
                    {title}
                </p>

                <p
                    className={`mt-1 text-sm ${
                        done || active
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-400 dark:text-gray-500"
                    }`}
                >
                    {date}
                </p>

            </div>

        </div>

    );
}