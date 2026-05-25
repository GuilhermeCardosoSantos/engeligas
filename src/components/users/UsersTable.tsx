"use client";

import * as React from "react";

import {
  ChevronDown,
  ChevronRight,
  Eye,
  Pencil,
} from "lucide-react";

import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Button from "../ui/button/Button";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import UsersMobileCard from "./UsersMobileCard";

import { User } from "./Users";

type Props = {
  users: User[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function UsersTable({
  users,
}: Props) {
  const [expanded, setExpanded] =
    React.useState<ExpandedState>({});

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",

      header: "Usuário",

      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-3">
            <button className="text-gray-500">
              {row.getIsExpanded() ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {/* <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-engeligas-400 to-engeligas-600 font-semibold text-white">
              {getInitials(user.name)}
            </div> */}

            <div>
              <h3 className="font-medium text-gray-800 dark:text-white/90">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "role",

      header: "Cargo",
    },

    {
      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <div
            className={`w-fit rounded-full px-2 py-1 text-xs font-medium ${
              status === "Ativo"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </div>
        );
      },
    },

    {
      accessorKey: "lastAccess",

      header: "Último acesso",

      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {row.original.lastAccess}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: users,

    columns,

    state: {
      expanded,
    },

    onExpandedChange: setExpanded,

    getCoreRowModel:
      getCoreRowModel(),

    getExpandedRowModel:
      getExpandedRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),
  });

  return (
    <>
      {/* DESKTOP */}

      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:block">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            {table
              .getHeaderGroups()
              .map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header) => (
                      <TableCell
                        key={header.id}
                        isHeader
                        className="px-5 py-4 font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400"
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

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  onClick={() =>
                    row.toggleExpanded()
                  }
                  className="cursor-pointer transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                >
                  {row
                    .getVisibleCells()
                    .map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-5 py-4"
                      >
                        {flexRender(
                          cell.column
                            .columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                </TableRow>

                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell
                      colSpan={
                        columns.length
                      }
                      className="bg-gray-50 px-5 py-5 dark:bg-white/[0.02]"
                    >
                      <div className="grid grid-cols-4 gap-5">
                        <div>
                          <p className="text-xs text-gray-500">
                            Telefone
                          </p>

                          <p className="mt-1 font-medium text-gray-800 dark:text-white/90">
                            {
                              row.original
                                .phone
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Criado em
                          </p>

                          <p className="mt-1 font-medium text-gray-800 dark:text-white/90">
                            {
                              row.original
                                .createdAt
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Último acesso
                          </p>

                          <p className="mt-1 font-medium text-gray-800 dark:text-white/90">
                            {
                              row.original
                                .lastAccess
                            }
                          </p>
                        </div>

                        <div className="flex items-end gap-2">
                          <Button size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Perfil
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 dark:border-white/[0.05]">
          <p className="text-sm text-gray-500">
            Total de usuários:{" "}
            {users.length}
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

      {/* MOBILE */}

      <div className="grid gap-4 xl:hidden">
        {users.map((user) => (
          <UsersMobileCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </>
  );
}