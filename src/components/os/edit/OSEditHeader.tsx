"use client";

import Link from "next/link";

import {
  ClipboardList,
  Save,
  X,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

import {
  getLigaClassBadge,
  getStatusClassBadge,
} from "@/components/os/profile/helpers";

type Props = {
  os: any;
  form: any;
  onSave: () => void;
  isSaving: boolean;
};

export default function OSEditHeader({
  os,
  form,
  onSave,
  isSaving,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
            <ClipboardList className="h-8 w-8" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                Editar OS #{os.id}
              </h1>

              <span
                className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${getStatusClassBadge(
                    form.status
                  )}
                `}
              >
                {form.status}
              </span>

              <span
                className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${getLigaClassBadge(
                    form.liga
                  )}
                `}
              >
                {form.liga ||
                  "NÃO ENCONTRADO"}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Produto vinculado ao pedido{" "}
              <Link
                href={`/orders/${os.order_id}`}
                className="font-medium text-engeligas-500 hover:underline"
              >
                #{os.pedido_id}
              </Link>
            </p>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Altere os dados técnicos, medidas, pesos, valores e status da OS.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/os/${os.id}`}>
            <Button variant="outline">
              <X className="h-4 w-4" />
              Cancelar
            </Button>
          </Link>

          <Button
            onClick={onSave}
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
            {isSaving
              ? "Salvando..."
              : "Salvar OS"}
          </Button>
        </div>
      </div>
    </div>
  );
}