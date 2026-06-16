"use client";

import * as React from "react";

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

const columnOptions = [
  {
    value: "all",
    label: "Todas colunas",
  },
  {
    value: "id",
    label: "OS",
  },
  {
    value: "pedido_id",
    label: "Pedido",
  },
  {
    value: "item",
    label: "Item",
  },
  {
    value: "liga",
    label: "Liga",
  },
  {
    value: "medidas_formatadas",
    label: "Medidas",
  },
  {
    value: "quantidade",
    label: "Qtd",
  },
  {
    value: "peso_unitario",
    label: "Peso Unit.",
  },
  {
    value: "peso_total",
    label: "Peso Total",
  },
  {
    value: "emissao_formatada",
    label: "Emissão",
  },
  {
    value: "previsto_formatado",
    label: "Previsto",
  },
  {
    value: "status",
    label: "Status",
  },
];

export default function OSSearch({
  search,
  setSearch,
  filter,
  setFilter,
  column,
  setColumn,
}: Props) {
  const currentColumn =
    columnOptions.find(
      (item) => item.value === column
    );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Ordem de Serviço
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie ordens de serviço
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

          <select
            value={column}
            onChange={(e) => {
              setColumn(e.target.value);

              setSearch("");

              setFilter("");
            }}
            className="h-11 rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            {columnOptions.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )
            )}
          </select>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder={`Buscar em ${
                currentColumn?.label ??
                "todas colunas"
              }...`}
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