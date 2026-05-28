"use client";

import React from "react";

import {
  Search,
  RefreshCcw,
  Upload,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

type Props = {
  search: string;

  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;

  column: string;

  setColumn: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export default function OrdersSearch({
  search,
  setSearch,
  column,
  setColumn,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* LEFT */}

        <div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Pedidos
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie pedidos sincronizados
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

          {/* COLUMN */}

          <select
            value={column}
            onChange={(e) =>
              setColumn(e.target.value)
            }
            className="h-11 rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >

            <option value="all">
              Todas colunas
            </option>

            <option value="id">
              Pedido
            </option>

            <option value="company">
              Empresa
            </option>

            <option value="seller">
              Vendedor
            </option>

            <option value="status">
              Status
            </option>

            <option value="priority">
              Prioridade
            </option>

            <option value="po">
              PO
            </option>

            <option value="nfe">
              NF-E
            </option>

          </select>

          {/* SEARCH */}

          <div className="relative">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Buscar pedido..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent pl-11 pr-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-[320px]"
            />

          </div>

          {/* BUTTONS */}

          <div className="flex items-center gap-3">

            <Button variant="outline">

              <Upload className="h-4 w-4" />

              Upload

            </Button>

            <Button>

              <RefreshCcw className="h-4 w-4" />

              Sincronizar

            </Button>

          </div>

        </div>

      </div>

    </div>
  );
}