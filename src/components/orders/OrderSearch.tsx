"use client";

import React from "react";

import {
  Search,
  RefreshCcw,
  Upload,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

type SyncStatus = {
  running: boolean;
  progress: number;
  current: number;
  total: number;
  stage: string;
};

type Props = {
  search: string;

  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;

  column: string;

  setColumn: React.Dispatch<
    React.SetStateAction<string>
  >;

  syncStatus?: SyncStatus;

  onSync?: () => void;

  onUpload?: (
    file: File
  ) => Promise<void>;

  isSyncing?: boolean;

  isUploading?: boolean;
};

export default function OrdersSearch({
  search,
  setSearch,
  column,
  setColumn,
  syncStatus,
  onSync,
  onUpload,
  isSyncing = false,
  isUploading = false,
}: Props) {

  const fileInputRef =
    React.useRef<HTMLInputElement>(null);

  const showProgress =
    syncStatus?.running ||
    isSyncing;

  const progress =
    syncStatus?.progress ?? 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={async (e) => {

          const file =
            e.target.files?.[0];

          if (
            !file ||
            !onUpload
          ) {
            return;
          }

          await onUpload(file);

          e.target.value = "";

        }}
      />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Pedidos
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie pedidos sincronizados
          </p>

        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

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

            <option value="pedido_id">
              Pedido
            </option>

            <option value="cliente">
              Cliente
            </option>

            <option value="vendedor">
              Vendedor
            </option>

            <option value="status">
              Status
            </option>

            <option value="frete">
              Frete
            </option>

          </select>

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

          <div className="flex items-center gap-3">

            <Button
              variant="outline"
              disabled={isUploading}
              onClick={() =>
                fileInputRef.current?.click()
              }
            >

              <Upload className="h-4 w-4" />

              {
                isUploading
                  ? "Importando..."
                  : "Upload"
              }

            </Button>

            <Button
              onClick={onSync}
              disabled={
                syncStatus?.running ||
                isSyncing
              }
            >

              <RefreshCcw
                className={`h-4 w-4 ${showProgress
                    ? "animate-spin"
                    : ""
                  }`}
              />

              {
                showProgress
                  ? "Sincronizando"
                  : "Sincronizar"
              }

            </Button>

          </div>

        </div>

      </div>

      {showProgress && (

        <div className="mt-5 border-t border-gray-200 pt-5 dark:border-gray-800">

          <div className="mb-2 flex items-center justify-between text-sm">

            <span className="font-medium text-gray-700 dark:text-gray-300">
              {
                syncStatus?.stage ??
                "Iniciando sincronização"
              }
            </span>

            <span className="text-gray-500 dark:text-gray-400">
              {syncStatus?.current ?? 0}
              {" / "}
              {syncStatus?.total ?? 0}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">

            <div
              className="h-full rounded-full bg-engeligas-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">

            <span>
              Aguarde, não feche esta tela.
            </span>

            <span>
              {progress.toFixed(1)}%
            </span>

          </div>

        </div>

      )}

      <div className="mt-3 text-right">

        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}order/template`}
          target="_blank"
          rel="noopener noreferrer"
          className="
    text-xs
    text-engeligas-500
    hover:underline
  "
        >
          Baixar modelo Excel
        </a>

      </div>

    </div>
  );
}