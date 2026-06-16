"use client";

import * as React from "react";

import Link from "next/link";

import {
  Eye,
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
import { formatDate } from "../ui/mask/Index";

import { getStatusClassBadge, getLigaClassBadge } from "../ui/badge/ClassBadge";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteOrderProduct } from "@/hooks/order/useDeleteOrderProduct";
import { toast } from "react-toastify";

type Props = {
  data?: ServiceOrder[];

  isLoading: boolean;

  search: string;

  filter: string;

  column: string;
};

type Medida = {
  valor: string;
  unidade: string;
};

type ServiceOrder = {
  id: number;

  order_id: number;

  pedido_id: number;

  cliente?: string;

  vendedor?: string;

  emissao?: string;

  previsto?: string;

  frete?: string;

  condicao_pagamento?: string;

  forma_pagamento?: string;

  metodo_pagamento?: string;

  status?: string;

  total_pedido?: number;

  produto_original: string;

  obs_original: string;

  item: string;

  liga: string;

  medidas: Medida[];

  unidade: string;

  quantidade: number;

  sobre_metal: number;

  peso_unitario: number;

  peso_total: number;

  valor_unitario: number;

  valor_total: number;

  created_at: string;
};


function formatWeight(
  value?: number
) {
  return `${Number(
    value || 0
  ).toLocaleString(
    "pt-BR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )} KG`;
}

function formatMedidas(
  medidas?: Medida[]
) {
  if (
    !Array.isArray(medidas) ||
    medidas.length === 0
  ) {
    return "-";
  }

  return medidas
    .map(
      (m) =>
        `${m.valor}${m.unidade}`
    )
    .join(" x ");
}

function formatText(
  value?: string
) {
  if (!value) {
    return "-";
  }

  return value
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

export default function OsTable({
  data = [],
  isLoading,
  search,
  filter,
  column,
}: Props) {
  const [contextMenu, setContextMenu] =
    React.useState<{
      mouseX: number;
      mouseY: number;
      row: ServiceOrder;
    } | null>(null);

  const menuRef =
    React.useRef<HTMLDivElement | null>(
      null
    );

  React.useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
    };

    const handleGlobalContextMenu = (
      e: MouseEvent
    ) => {
      if (!contextMenu) {
        return;
      }

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

  const filteredOrders =
    React.useMemo(() => {
      const searchLower =
        search.toLowerCase();

      return data.filter(
        (order) => {
          const normalizedOrder = {
            ...order,
            medidas_formatadas:
              formatMedidas(
                order.medidas
              ),
          };

          const matchesSearch =
            !searchLower
              ? true
              : column !== "all"
                ? String(
                  normalizedOrder[
                  column as keyof typeof normalizedOrder
                  ] ?? ""
                )
                  .toLowerCase()
                  .includes(
                    searchLower
                  )
                : JSON.stringify(
                  normalizedOrder
                )
                  .toLowerCase()
                  .includes(
                    searchLower
                  );

          const status =
            order.status ??
            "EM ABERTO";

          const matchesFilter =
            filter === ""
              ? true
              : status === filter ||
              order.liga === filter ||
              order.item === filter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      data,
      search,
      filter,
      column,
    ]);

  const columns: ColumnDef<ServiceOrder>[] = [
    {
      accessorKey: "id",

      header: "OS",

      cell: ({ row }) => (
        <span className="font-medium text-gray-800 dark:text-white/90">
          #{row.original.id}
        </span>
      ),
    },

    {
      accessorKey: "pedido_id",

      header: "Pedido",

      cell: ({ row }) => (
        <Link
          href={`/orders/${row.original.order_id}`}
          className="font-medium text-engeligas-500 hover:underline"
        >
          #{row.original.pedido_id}
        </Link>
      ),
    },

    {
      accessorKey: "item",

      header: "Item",

      cell: ({ row }) => (
        <span className="font-medium text-gray-800 dark:text-white/90">
          {formatText(
            row.original.item
          )}
        </span>
      ),
    },

    {
      accessorKey: "liga",

      header: "Liga",

      cell: ({ row }) => (
        <span
          className={`
              inline-flex
              w-fit
              rounded-full
              px-2.5
              py-1
              text-xs
              font-medium
              ${getLigaClassBadge(
            row.original.liga
          )}
            `}
        >
          {row.original.liga}
        </span>
      ),
    },

    {
      accessorKey: "medidas",

      header: "Medidas",

      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {formatMedidas(
            row.original.medidas
          )}
        </span>
      ),
    },

    {
      accessorKey: "quantidade",

      header: "Qtd",

      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {row.original.quantidade}{" "}
          {row.original.unidade}
        </span>
      ),
    },

    {
      accessorKey: "peso_unitario",

      header: "Peso Unit.",

      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {formatWeight(
            row.original.peso_unitario
          )}
        </span>
      ),
    },

    {
      accessorKey: "peso_total",

      header: "Peso Total",

      cell: ({ row }) => (
        <span className="font-medium text-gray-800 dark:text-white/90">
          {formatWeight(
            row.original.peso_total
          )}
        </span>
      ),
    },

    {
      accessorKey: "emissao",

      header: "Emissão",

      cell: ({ row }) => (
        <span className="text-gray-500 dark:text-gray-400">
          {formatDate(
            row.original.emissao
          )}
        </span>
      ),
    },

    {
      accessorKey: "previsto",

      header: "Previsto",

      cell: ({ row }) => (
        <span className="font-medium text-gray-800 dark:text-white/90">
          {formatDate(
            row.original.previsto
          )}
        </span>
      ),
    },

    {
      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => {
        const status =
          row.original.status ??
          "EM ABERTO";

        return (
          <span
            className={`
                inline-flex
                w-fit
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                ${getStatusClassBadge(
              status
            )}
              `}
          >
            {status}
          </span>
        );
      },
    },
  ];

  const table =
    useReactTable({
      data: filteredOrders,
      columns,
      getCoreRowModel:
        getCoreRowModel(),
      getPaginationRowModel:
        getPaginationRowModel(),
    });

  const queryClient = useQueryClient();

  const deleteOrderProduct =
    useDeleteOrderProduct();

  const handleDeleteOS = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Deseja realmente excluir esta OS?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteOrderProduct.mutateAsync(
        id
      );

      await queryClient.invalidateQueries({
        queryKey: ["order-products"],
      });

      toast.success(
        "OS excluída com sucesso."
      );

      setContextMenu(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao excluir OS."
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">

      <div className="overflow-x-auto">

        <Table>

          <TableHeader className="border-b border-gray-100 dark:border-white/5">

            {table
              .getHeaderGroups()
              .map(
                (headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map(
                      (header) => (
                        <TableCell
                          key={header.id}
                          className="whitespace-nowrap px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
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
                )
              )}

          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/5">

            {isLoading ? (

              <tr>
                <td
                  colSpan={
                    columns.length
                  }
                  className="h-32 text-center text-gray-500 dark:text-gray-400"
                >
                  Carregando OS...
                </td>
              </tr>

            ) : table
              .getRowModel()
              .rows.length > 0 ? (

              table
                .getRowModel()
                .rows.map(
                  (row) => (
                    <TableRow
                      key={row.id}
                      onContextMenu={(e) => {
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
                        .map(
                          (cell) => (
                            <TableCell
                              key={cell.id}
                              className="whitespace-nowrap px-4 py-3 text-sm"
                            >
                              {flexRender(
                                cell.column
                                  .columnDef
                                  .cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          )
                        )}
                    </TableRow>
                  )
                )

            ) : (

              <tr>
                <td
                  colSpan={
                    columns.length
                  }
                  className="h-32 text-center text-gray-500 dark:text-gray-400"
                >
                  Nenhuma ordem de serviço encontrada.
                </td>
              </tr>

            )}

          </TableBody>

        </Table>

      </div>

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

          <div className="border-b border-gray-200 px-4 py-3 dark:border-white/10">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Ordem de Serviço
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              #{contextMenu.row.id}
            </h3>

          </div>

          <div className="py-2">

            <Link
              href={`/os/${contextMenu.row.id}`}
              onClick={() =>
                setContextMenu(null)
              }
              className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <Eye className="h-4 w-4" />

              Visualizar
            </Link>

            <Link
              href={`/os/${contextMenu.row.id}/edit`}
              onClick={() =>
                setContextMenu(null)
              }
              className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <Pencil className="h-4 w-4" />

              Editar
            </Link>

            <div className="my-2 border-t border-gray-200 dark:border-white/10" />

            <button
              disabled={deleteOrderProduct.isPending}
              onClick={() =>
                handleDeleteOS(
                  contextMenu.row.id
                )
              }
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
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:hover:bg-red-500/10
              "
            >
              <Trash2 className="h-4 w-4" />

              {deleteOrderProduct.isPending
                ? "Excluindo..."
                : "Excluir"}
            </button>

          </div>

        </div>

      )}

      <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total de OS:{" "}
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