"use client";

import { Search } from "lucide-react";

type Props = {
  search: string;

  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;

  filter: string;

  setFilter: React.Dispatch<
    React.SetStateAction<string>
  >;

  column: string;

  setColumn: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export default function OSSearch({
  search,
  setSearch,
  filter,
  setFilter,
  column,
  setColumn,
}: Props) {
  const columnLabels: Record<
    string,
    string
  > = {
    all: "OS",
    id: "OS",
    item: "Item",
    client: "Cliente",
    seller: "Vendedor",
    order: "Pedido",
    status: "Status",
    alloy: "Liga",
    purpose: "Finalidade",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* LEFT */}

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Ordem de Serviço
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie ordens de serviço
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
              OS
            </option>

            <option value="item">
              Item
            </option>

            <option value="client">
              Cliente
            </option>

            <option value="seller">
              Vendedor
            </option>

            <option value="order">
              Pedido
            </option>

            <option value="status">
              Status
            </option>

            <option value="alloy">
              Liga
            </option>

            <option value="purpose">
              Finalidade
            </option>
          </select>


          {/* SEARCH */}

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder={`Buscar ...`}
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent pl-11 pr-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-[320px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}