"use client";

import * as React from "react";
// icons
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Pencil,
  UserRoundX,

} from "lucide-react";
// table
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
// button
import Button from "../ui/button/Button";
// ui
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
// card
import UsersMobileCard from "./UsersMobileCard";
// user
import { User } from "./Users";
// next
import Link from "next/link";
import { formatPhone } from "@/components/ui/mask/Index"
// type
type Props = {
  users: User[];
};
// 
import { toast } from "react-toastify";
// hooks
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useQueryClient } from "@tanstack/react-query";

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
  // hooks
  const updateUser = useUpdateUser();
  const queryClient = useQueryClient();

  // =========================
  // EXPANDED
  // =========================

  const [expanded, setExpanded] =
    React.useState<ExpandedState>({});

  // =========================
  // CONTEXT MENU
  // =========================

  const [contextMenu, setContextMenu] =
    React.useState<{
      mouseX: number;
      mouseY: number;
      user: User;
    } | null>(null);

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

  // =========================
  // COLUMNS
  // =========================

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

            {/* AVATAR */}

            {/* <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-engeligas-400 to-engeligas-600 font-semibold text-white">
              {getInitials(user.name)}
            </div> */}

            {/* INFO */}

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

        const status =
          row.original.status;

        return (

          <div
            className={`w-fit rounded-full px-2 py-1 text-xs font-medium ${status === "Ativo"
              ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
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

  // =========================
  // TABLE
  // =========================

  const table = useReactTable({
    data: users,

    columns,

    state: {
      expanded,
    },

    onExpandedChange:
      setExpanded,

    getCoreRowModel:
      getCoreRowModel(),

    getExpandedRowModel:
      getExpandedRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),
  });

  const handleInactiveUser = async (
    user: User
  ) => {
    try {
      const response =
        await updateUser.mutateAsync({
          id: user.id,
          status: "INACTIVE",
        });

      toast.success(
        response.message ??
        "Usuário inativado com sucesso."
      );

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setContextMenu(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao inativar usuário."
      );
    }
  };

  return (
    <>

      {/* DESKTOP */}

      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 xl:block">

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

                        className="px-5 py-4 text-start text-theme-sm font-medium text-gray-500 dark:text-gray-400"
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

            {table
              .getRowModel()
              .rows.map((row) => (

                <React.Fragment
                  key={row.id}
                >

                  {/* ROW */}

                  <TableRow

                    onClick={() =>
                      row.toggleExpanded()
                    }

                    onContextMenu={(e) => {

                      e.preventDefault();

                      e.stopPropagation();

                      setContextMenu({
                        mouseX:
                          e.clientX,

                        mouseY:
                          e.clientY,

                        user:
                          row.original,
                      });

                    }}

                    className="cursor-context-menu transition hover:bg-gray-50 dark:hover:bg-white/2"
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
                              .columnDef
                              .cell,
                            cell.getContext()
                          )}

                        </TableCell>

                      ))}

                  </TableRow>

                  {/* EXPANDED */}

                  {row.getIsExpanded() && (

                    <TableRow>

                      <TableCell
                        colSpan={
                          columns.length
                        }

                        className="bg-gray-50 px-5 py-5 dark:bg-white/2"
                      >

                        <div className="grid grid-cols-4 gap-5">

                          <div>

                            <p className="text-xs text-gray-500">
                              Telefone
                            </p>

                            <p className="mt-1 font-medium text-gray-800 dark:text-white/90">
                              {
                                formatPhone(row.original
                                  .phone)
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



                        </div>

                      </TableCell>

                    </TableRow>

                  )}

                </React.Fragment>

              ))}

          </TableBody>

        </Table>

        {/* FOOTER */}

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 dark:border-white/5">

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

              Usuário

            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">

              {contextMenu.user.name}

            </h3>

          </div>

          {/* ACTIONS */}

          <div className="py-2">

            <Link
              href={`/users/${contextMenu.user.id}`}

              onClick={() =>
                setContextMenu(null)
              }

              className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-white/5"
            >

              <Eye className="h-4 w-4" />

              Visualizar

            </Link>

            <Link
              href={`/users/edit/${contextMenu.user.id}`}

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
              onClick={() =>
                handleInactiveUser(
                  contextMenu.user
                )
              }

              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
            >

              <UserRoundX className="h-4 w-4" />

              Inativar

            </button>

          </div>

        </div>

      )}

    </>
  );
}