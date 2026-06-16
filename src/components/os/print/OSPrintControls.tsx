"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Factory,
  Hammer,
  Printer,
  ScrollText,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

import { OSPrintMode } from "./types";

type Props = {
  os: any;
  obs: string;
  setObs: React.Dispatch<
    React.SetStateAction<string>
  >;
  printMode: OSPrintMode;
  setPrintMode: React.Dispatch<
    React.SetStateAction<OSPrintMode>
  >;
};

const printOptions: {
  value: OSPrintMode;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "geral",
    label: "Comercial / Geral",
    description:
      "Modelo completo com empresa, vendedor e dados principais.",
    icon: <ScrollText className="h-5 w-5" />,
  },
  {
    value: "usinagem",
    label: "Usinagem",
    description:
      "Modelo direcionado para o setor de usinagem.",
    icon: <Hammer className="h-5 w-5" />,
  },
  {
    value: "fundicao",
    label: "Fundição",
    description:
      "Modelo direcionado para o setor de fundição.",
    icon: <Factory className="h-5 w-5" />,
  },
];

export default function OSPrintControls({
  os,
  obs,
  setObs,
  printMode,
  setPrintMode,
}: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Impressão da OS #{os.id}
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Escolha o modelo, ajuste a observação e imprima somente a via desejada.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/os/${os.id}`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>

          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-800 dark:text-white/90">
            Modelo de impressão
          </label>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {printOptions.map((option) => {
              const active =
                printMode === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setPrintMode(option.value)
                  }
                  className={`
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition
                    ${
                      active
                        ? "border-engeligas-500 bg-engeligas-500/10 text-engeligas-500"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-engeligas-500/40 hover:bg-engeligas-500/[0.03] dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-engeligas-500/40"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${
                          active
                            ? "bg-engeligas-500 text-white"
                            : "bg-white text-gray-500 dark:bg-white/[0.06] dark:text-gray-400"
                        }
                      `}
                    >
                      {option.icon}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {option.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-white/90">
            Observação para impressão
          </label>

          <textarea
            value={obs}
            onChange={(e) =>
              setObs(e.target.value)
            }
            className="min-h-[90px] w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            placeholder="Digite a observação que vai sair impressa na OS..."
          />
        </div>
      </div>
    </div>
  );
}