"use client";

import * as React from "react";

import { useParams } from "next/navigation";

import { useGetProductById } from "@/hooks/order/useGetProductById";

import OSPrintBlock from "./OSPrintBlock";
import OSPrintControls from "./OSPrintControls";
import OSPrintStyles from "./OSPrintStyles";

import { OSPrintMode } from "./types";

export default function OSPrintPage() {
  const params = useParams<{
    id: string;
  }>();

  const id = Number(params.id);

  const {
    data,
    isLoading,
    error,
  } = useGetProductById(id);

  const os =
    Array.isArray(data)
      ? data[0]
      : Array.isArray(data?.data)
        ? data.data[0]
        : data?.data ?? data;

  const [obs, setObs] =
    React.useState("");

  const [printMode, setPrintMode] =
    React.useState<OSPrintMode>("geral");

  React.useEffect(() => {
    if (!os) {
      return;
    }

    setObs(
      os.obs_original ??
        "CENTRIFUGAR, SE POSSÍVEL"
    );
  }, [os]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
        Carregando OS...
      </div>
    );
  }

  if (error || !os) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        OS não encontrada.
      </div>
    );
  }

  return (
    <>
      <div className="no-print min-h-screen  px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] space-y-6">
          <OSPrintControls
            os={os}
            obs={obs}
            setObs={setObs}
            printMode={printMode}
            setPrintMode={setPrintMode}
          />

          <div className="rounded-3xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-3 flex items-center justify-between px-2">
              <div>
                <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                  Pré-visualização da impressão
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  A área abaixo será impressa em A4 paisagem.
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-white/[0.06] dark:text-gray-300">
                OS #{os.id}
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-gray-100 p-3 dark:bg-gray-900">
              <main className="print-page screen-preview">
                {printMode === "geral" && (
                  <OSPrintBlock
                    os={os}
                    obs={obs}
                  />
                )}

                {printMode === "usinagem" && (
                  <OSPrintBlock
                    os={os}
                    obs={obs}
                    setor="USINAGEM"
                  />
                )}

                {printMode === "fundicao" && (
                  <OSPrintBlock
                    os={os}
                    obs={obs}
                    setor="FUNDIÇÃO"
                    tipo="fundicao"
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      </div>

      <main className="print-page print-only">
        {printMode === "geral" && (
          <OSPrintBlock
            os={os}
            obs={obs}
          />
        )}

        {printMode === "usinagem" && (
          <OSPrintBlock
            os={os}
            obs={obs}
            setor="USINAGEM"
          />
        )}

        {printMode === "fundicao" && (
          <OSPrintBlock
            os={os}
            obs={obs}
            setor="FUNDIÇÃO"
            tipo="fundicao"
          />
        )}
      </main>

      <OSPrintStyles />
    </>
  );
}