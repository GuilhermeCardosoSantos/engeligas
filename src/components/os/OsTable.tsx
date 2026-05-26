"use client";

import * as React from "react";

import Link from "next/link";

import { MoveRight } from "lucide-react";

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

type Props = {
  search: string;
  filter: string;
  column: string;
};

type ServiceOrder = {
  id: number;
  item: string;
  client: string;
  seller: string;
  order: string;
  issueDate: string;
  expectedDate: string;
  status: "EM ATRASO" | "ALERTA" | "EM ABERTO";
  weight: string;
  purpose: string;
  alloy: string;
};

const serviceOrders: ServiceOrder[] = [
  {
    id: 20336,
    item: "BUCHA",
    client: "FAVIMETAIS",
    seller: "RICARDO",
    order: "1033",
    issueDate: "08/05/2026",
    expectedDate: "18/05/2026",
    status: "EM ATRASO",
    weight: "299,77",
    purpose: "VENDA",
    alloy: "BRONZE",
  },

  {
    id: 20346,
    item: "BUCHA",
    client: "GALEAZI",
    seller: "RONALDO",
    order: "10695029",
    issueDate: "08/05/2026",
    expectedDate: "18/05/2026",
    status: "EM ATRASO",
    weight: "430,46",
    purpose: "VENDA",
    alloy: "BRONZE",
  },

  {
    id: 20378,
    item: "B.CHATA",
    client: "BARON METAL",
    seller: "RICARDO",
    order: "818147",
    issueDate: "12/05/2026",
    expectedDate: "20/05/2026",
    status: "ALERTA",
    weight: "40,61",
    purpose: "VENDA",
    alloy: "LATÃO",
  },

  {
    id: 20424,
    item: "TARUGO",
    client: "4ELLO COMERCIO",
    seller: "RICARDO",
    order: "818951",
    issueDate: "15/05/2026",
    expectedDate: "25/05/2026",
    status: "EM ABERTO",
    weight: "83,41",
    purpose: "ESTOQUE",
    alloy: "BRONZE",
  },
];

function getStatusClass(status: string) {
  switch (status) {
    case "EM ATRASO":
      return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

    case "ALERTA":
      return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";

    case "EM ABERTO":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

    default:
      return "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300";
  }
}

function getAlloyClass(alloy: string) {
  switch (alloy) {
    case "BRONZE":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

    case "LATÃO":
      return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

    default:
      return "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300";
  }
}

export default function OsTable({
  search,
  filter,
  column
}: Props) {
  const filteredOrders =
  React.useMemo(() => {
    const searchLower =
      search.toLowerCase();

    return serviceOrders.filter(
      (order) => {
        const matchesSearch =
          order.id
            .toString()
            .includes(searchLower) ||
          order.item
            .toLowerCase()
            .includes(searchLower) ||
          order.client
            .toLowerCase()
            .includes(searchLower) ||
          order.seller
            .toLowerCase()
            .includes(searchLower) ||
          order.order
            .toLowerCase()
            .includes(searchLower) ||
          order.issueDate
            .toLowerCase()
            .includes(searchLower) ||
          order.expectedDate
            .toLowerCase()
            .includes(searchLower) ||
          order.status
            .toLowerCase()
            .includes(searchLower) ||
          order.weight
            .toLowerCase()
            .includes(searchLower) ||
          order.purpose
            .toLowerCase()
            .includes(searchLower) ||
          order.alloy
            .toLowerCase()
            .includes(searchLower);

        const matchesFilter =
          filter === ""
            ? true
            : order.status === filter ||
              order.alloy === filter ||
              order.purpose === filter;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );
  }, [search, filter]);
  const columns: ColumnDef<ServiceOrder>[] = [
    {
      accessorKey: "id",

      header: "OS",

      cell: ({ row }) => (
        <span className="font-medium ">
          #{row.original.id}
        </span>
      ),
    },

    {
      accessorKey: "item",

      header: "Item",

      cell: ({ row }) => (
        <span className="font-medium text-gray-800 dark:text-white/90">
          {row.original.item}
        </span>
      ),
    },

    {
      accessorKey: "client",

      header: "Cliente",

      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {row.original.client}
        </span>
      ),
    },

    {
      accessorKey: "seller",

      header: "Vendedor",

      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {row.original.seller}
        </span>
      ),
    },

    {
      accessorKey: "order",

      header: "Pedido",

      cell: ({ row }) => (
        <span className="text-gray-500 dark:text-gray-400">
          {row.original.order}
        </span>
      ),
    },

    {
      accessorKey: "issueDate",

      header: "Emissão",

      cell: ({ row }) => (
        <span className="text-gray-500 dark:text-gray-400">
          {row.original.issueDate}
        </span>
      ),
    },

    {
      accessorKey: "expectedDate",

      header: "Previsto",

      cell: ({ row }) => (
        <span className="text-gray-500 dark:text-gray-400">
          {row.original.expectedDate}
        </span>
      ),
    },

    {
      accessorKey: "weight",

      header: "Peso",

      cell: ({ row }) => (
        <span className="font-medium text-gray-800 dark:text-white/90">
          {row.original.weight} KG
        </span>
      ),
    },

    {
      accessorKey: "purpose",

      header: "Finalidade",

      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {row.original.purpose}
        </span>
      ),
    },

    {
      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => (
        <div
          className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
            row.original.status
          )}`}
        >
          {row.original.status}
        </div>
      ),
    },

    {
      accessorKey: "alloy",

      header: "Liga",

      cell: ({ row }) => (
        <div
          className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${getAlloyClass(
            row.original.alloy
          )}`}
        >
          {row.original.alloy}
        </div>
      ),
    },

    {
      id: "actions",

      header: "",

      cell: ({ row }) => (
        <div className="flex justify-end">
          <Link
            href={`/os/${row.original.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-engeligas-500 transition hover:text-engeligas-700 dark:text-engeligas-400 dark:hover:text-engeligas-500"
          >
            Abrir

            <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      ),
    },
  ];

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
      <div className="overflow-x-auto">
        <Table>
          {/* HEADER */}

          <TableHeader className="border-b border-gray-100 dark:border-white/5">
            {table
              .getHeaderGroups()
              .map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header) => (
                      <TableCell
                        key={header.id}
                        className="whitespace-nowrap px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                      >
                        {flexRender(
                          header.column
                            .columnDef.header,
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
            {table.getRowModel().rows.length >
            0 ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    {row
                      .getVisibleCells()
                      .map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="whitespace-nowrap px-4 py-3 text-sm"
                        >
                          {flexRender(
                            cell.column
                              .columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-32 text-center text-gray-500 dark:text-gray-400"
                >
                  Nenhuma ordem de serviço encontrada.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      {/* FOOTER */}

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