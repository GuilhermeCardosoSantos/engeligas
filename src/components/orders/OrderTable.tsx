"use client";

import * as React from "react";

import Link from "next/link";
import { getStatusClassBadge } from "../ui/badge/ClassBadge";
import {
  Eye,
  FileOutput,
  Pencil,
  Trash2,
} from "lucide-react";

import Button from "../ui/button/Button";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

type Order = {
  id: number;
  pedido_id: number;
  cliente: string;
  emissao: string;
  previsto: string;
  vendedor: string;
  frete: string;
  status: string;
  total: number;
};

type Props = {
  orders: Order[];
  search: string;
  column: string;
  onDelete: (
    id: number
  ) => void;
};


export default function OrdersTable({
  orders,
  search,
  column,
  onDelete
}: Props) {

  // =========================
  // CONTEXT MENU
  // =========================

  const [contextMenu, setContextMenu] =
    React.useState<{
      mouseX: number;
      mouseY: number;
      row: Order;
    } | null>(null);

  const menuRef =
    React.useRef<HTMLDivElement | null>(
      null
    );

  React.useEffect(() => {

    const handleClick = () =>
      setContextMenu(null);

    const handleGlobalContextMenu = (
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
      handleGlobalContextMenu
    );

    return () => {

      window.removeEventListener(
        "click",
        handleClick
      );

      window.removeEventListener(
        "contextmenu",
        handleGlobalContextMenu
      );

    };

  }, [contextMenu]);

  // =========================
  // FILTER
  // =========================

  const filteredOrders =
    React.useMemo(() => {

      const value =
        search.toLowerCase();

      return orders.filter(
        (order) => {

          if (!value) return true;

          if (column !== "all") {

            const fieldValue = String(
              order[
              column as keyof Order
              ] ?? ""
            ).toLowerCase();

            return fieldValue.includes(
              value
            );

          }

          return Object.values(
            order
          ).some((item) =>
            String(item)
              .toLowerCase()
              .includes(value)
          );

        }
      );

    }, [orders, search, column]);

  // =========================
  // COLUMNS
  // =========================

  const columns: ColumnDef<Order>[] = [

    {
      accessorKey: "pedido_id",

      header: "Pedido",

      cell: ({ row }) => (

        <span className="font-medium">
          #{row.original.pedido_id}
        </span>

      ),
    },

    {
      accessorKey: "cliente",

      header: "Cliente",

      cell: ({ row }) => (

        <span className="block max-w-[280px] truncate">

          {row.original.cliente}

        </span>

      ),
    },

    {
      accessorKey: "emissao",

      header: "Emissão",

      cell: ({ row }) => {

        const date = new Date(
          row.original.emissao
        );

        return date.toLocaleDateString(
          "pt-BR"
        );

      },
    },

    {
      accessorKey: "previsto",

      header: "Previsto",

      cell: ({ row }) => {

        const date = new Date(
          row.original.previsto
        );

        return date.toLocaleDateString(
          "pt-BR"
        );

      },
    },

    {
      accessorKey: "vendedor",

      header: "Vendedor",
    },

    {
      accessorKey: "frete",
      header: "Frete",
      cell: ({ row }) => {
    
        const frete =
          row.original.frete
            ?.toUpperCase();
    
        if (frete?.includes("CIF")) {
          return (
            <span
              className="
                inline-flex
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                bg-blue-100
                text-blue-700
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              CIF
            </span>
          );
        }
    
        if (frete?.includes("FOB")) {
          return (
            <span
              className="
                inline-flex
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                bg-orange-100
                text-orange-700
                dark:bg-orange-500/10
                dark:text-orange-400
              "
            >
              FOB
            </span>
          );
        }
    
        return (
          <span
            className="
              inline-flex
              rounded-full
              px-2.5
              py-1
              text-xs
              font-medium
              bg-gray-100
              text-gray-700
              dark:bg-gray-500/10
              dark:text-gray-400
            "
          >
            NÃO IDENTIFICADO
          </span>
        );
      },
    },

    {
      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => (

        <div
          className={`
          w-fit
          rounded-full
          px-2.5
          py-1
          text-xs
          font-medium
          ${getStatusClassBadge(
            row.original.status
          )}
        `}
        >

          {row.original.status}

        </div>

      ),
    },

    {
      accessorKey: "total",

      header: "Total",

      cell: ({ row }) => (

        <span className="font-semibold text-gray-800 dark:text-white/90">

          {Number(
            row.original.total
          ).toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}

        </span>

      ),
    },

  ];

  // =========================
  // TABLE
  // =========================

  const table = useReactTable({
    data: filteredOrders,
    columns,
    getCoreRowModel:
      getCoreRowModel(),
    getPaginationRowModel:
      getPaginationRowModel(),
  });

  return (

    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      {/* TABLE */}

      <div className="overflow-x-auto">

        <Table>

          {/* HEADER */}

          <TableHeader className="border-b border-gray-100 dark:border-white/5">

            {table
              .getHeaderGroups()
              .map((headerGroup) => (

                <TableRow
                  key={headerGroup.id}
                >

                  {headerGroup.headers.map(
                    (header) => (

                      <TableCell
                        key={header.id}
                        className="whitespace-nowrap px-4 py-3 text-start text-xs font-semibold text-gray-500 dark:text-gray-400"
                      >

                        {flexRender(
                          header.column
                            .columnDef
                            .header,
                          header.getContext()
                        )}

                      </TableCell>

                    )
                  )}

                </TableRow>

              ))}

          </TableHeader>

          {/* BODY */}

          <TableBody className="divide-y divide-gray-100 dark:divide-white/5">

            {table.getRowModel().rows
              .length > 0 ? (

              table
                .getRowModel()
                .rows.map((row) => (

                  <TableRow
                    key={row.id}

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

                        row:
                          row.original,
                      });

                    }}

                    className="cursor-context-menu transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >

                    {row
                      .getVisibleCells()
                      .map((cell) => (

                        <TableCell
                          key={cell.id}
                          className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300"
                        >

                          {flexRender(
                            cell.column
                              .columnDef
                              .cell,
                            cell.getContext()
                          )}

                        </TableCell>

                      ))}

                  </TableRow>

                ))

            ) : (

              <tr>

                <td
                  colSpan={
                    columns.length
                  }
                  className="h-32 text-center text-gray-500 dark:text-gray-400"
                >

                  Nenhum pedido encontrado.

                </td>

              </tr>

            )}

          </TableBody>

        </Table>

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

              Pedido

            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">

              #{contextMenu.row.pedido_id}

            </h3>

          </div>

          {/* ACTIONS */}

          <div className="py-2">

            <Link
              href={`/orders/${contextMenu.row.id}`}

              onClick={() =>
                setContextMenu(null)
              }

              className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-white/5"
            >

              <Eye className="h-4 w-4" />

              Visualizar

            </Link>

            <Link
              href={`/orders/${contextMenu.row.id}/edit`}

              onClick={() =>
                setContextMenu(null)
              }

              className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-white/5"
            >

              <Pencil className="h-4 w-4" />

              Editar

            </Link>

            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}order/file/${contextMenu.row.pedido_id}/anexo_${contextMenu.row.pedido_id}.pdf`}
              target="_blank"
              onClick={() =>
                setContextMenu(null)
              }
              className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-white/5"
            >

              <FileOutput className="h-4 w-4" />

              PDF

            </Link>

            <div className="my-2 border-t border-gray-200 dark:border-white/10" />

            <button
              onClick={() => {

                const confirmed =
                  window.confirm(
                    `Deseja realmente excluir este pedido #${contextMenu.row.pedido_id}? `
                  );

                if (!confirmed) {
                  return;
                }

                onDelete(
                  contextMenu.row.id
                );

                setContextMenu(null);

              }}
              className="
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-left
                text-sm
                text-red-500
                transition
                hover:bg-red-50
                dark:hover:bg-red-500/10
              "
            >

              <Trash2 className="h-4 w-4" />

              Excluir

            </button>

          </div>

        </div>

      )}

      {/* FOOTER */}

      <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-gray-500 dark:text-gray-400">

          Total de pedidos:{" "}

          {filteredOrders.length}

        </p>

        <div className="flex items-center gap-2">

          <Button
            size="sm"
            variant="outline"

            onClick={() =>
              table.previousPage()
            }

            disabled={
              !table.getCanPreviousPage()
            }
          >

            Anterior

          </Button>

          <Button
            size="sm"
            variant="outline"

            onClick={() =>
              table.nextPage()
            }

            disabled={
              !table.getCanNextPage()
            }
          >

            Próximo

          </Button>

        </div>

      </div>

    </div>

  );
}