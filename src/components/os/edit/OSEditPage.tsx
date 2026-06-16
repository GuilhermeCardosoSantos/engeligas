"use client";

import * as React from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-toastify";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { useGetProductById } from "@/hooks/order/useGetProductById";
import { useUpdateProduct } from "@/hooks/order/useUpdateProduct";

import OSEditHeader from "@/components/os/edit/OSEditHeader";
import OSEditInfoCard from "@/components/os/edit/OSEditInfoCard";
import OSEditMeasuresCard from "@/components/os/edit/OSEditMeasuresCard";
import OSEditObservationCard from "@/components/os/edit/OSEditObservationCard";
import OSEditOrderCard from "@/components/os/edit/OSEditOrderCard";

type Medida = {
  valor: string;
  unidade: string;
};

type OSEditForm = {
  id: number;

  produto_original: string;
  obs_original: string;

  item: string;
  liga: string;
  medidas: Medida[];

  unidade: string;
  quantidade: string | number;
  sobre_metal: string | number;

  peso_unitario: string | number;
  peso_total: string | number;

  valor_unitario: string | number;
  valor_total: string | number;

  status: string;
};

const toNumber = (
  value: string | number
) => {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return 0;
  }

  return Number(
    String(value).replace(",", ".")
  );
};

export default function OSEditPage() {
  const params =
    useParams<{
      id: string;
    }>();

  const router =
    useRouter();

  const queryClient =
    useQueryClient();

  const id =
    Number(params.id);

  const {
    data,
    isLoading,
    error,
  } = useGetProductById(id);

  const updateOrderProduct =
  useUpdateProduct();

  const os =
    Array.isArray(data)
      ? data[0]
      : Array.isArray(data?.data)
        ? data.data[0]
        : data?.data ?? data;

  const [form, setForm] =
    React.useState<OSEditForm | null>(
      null
    );

  React.useEffect(() => {
    if (!os) {
      return;
    }

    setForm({
      id: os.id,

      produto_original:
        os.produto_original ?? "",

      obs_original:
        os.obs_original ?? "",

      item:
        os.item ?? "",

      liga:
        os.liga ?? "",

      medidas:
        Array.isArray(os.medidas) &&
        os.medidas.length > 0
          ? os.medidas
          : [
              {
                valor: "",
                unidade: "MM",
              },
            ],

      unidade:
        os.unidade ?? "PC",

      quantidade:
        os.quantidade ?? 0,

      sobre_metal:
        os.sobre_metal ?? 0,

      peso_unitario:
        os.peso_unitario ?? 0,

      peso_total:
        os.peso_total ?? 0,

      valor_unitario:
        os.valor_unitario ?? 0,

      valor_total:
        os.valor_total ?? 0,

      status:
        os.status ?? "EM ABERTO",
    });
  }, [os]);

  const handleChange = (
    field: keyof OSEditForm,
    value: any
  ) => {
    setForm((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleMeasureChange = (
    index: number,
    field: keyof Medida,
    value: string
  ) => {
    setForm((prev) => {
      if (!prev) {
        return prev;
      }

      const medidas =
        [...prev.medidas];

      medidas[index] = {
        ...medidas[index],
        [field]: value,
      };

      return {
        ...prev,
        medidas,
      };
    });
  };

  const handleAddMeasure = () => {
    setForm((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        medidas: [
          ...prev.medidas,
          {
            valor: "",
            unidade: "MM",
          },
        ],
      };
    });
  };

  const handleRemoveMeasure = (
    index: number
  ) => {
    setForm((prev) => {
      if (!prev) {
        return prev;
      }

      const medidas =
        prev.medidas.filter(
          (_, i) => i !== index
        );

      return {
        ...prev,
        medidas:
          medidas.length > 0
            ? medidas
            : [
                {
                  valor: "",
                  unidade: "MM",
                },
              ],
      };
    });
  };

  const handleSave = async () => {
    if (!form) {
      return;
    }

    try {
      const payload = {
        ...form,

        medidas: form.medidas.filter(
          (medida) =>
            medida.valor?.trim() !== ""
        ),

        quantidade: toNumber(
          form.quantidade
        ),

        sobre_metal: toNumber(
          form.sobre_metal
        ),

        peso_unitario: toNumber(
          form.peso_unitario
        ),

        peso_total: toNumber(
          form.peso_total
        ),

        valor_unitario: toNumber(
          form.valor_unitario
        ),

        valor_total: toNumber(
          form.valor_total
        ),
      };

      await updateOrderProduct.mutateAsync(
        payload
      );

      await queryClient.invalidateQueries({
        queryKey: [
          "order-product",
          id,
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: [
          "order-products",
        ],
      });

      toast.success(
        "OS atualizada com sucesso."
      );

      router.push(
        `/os/${form.id}`
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar OS."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
        Carregando OS...
      </div>
    );
  }

  if (
    error ||
    !os ||
    !form
  ) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        OS não encontrada.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        pageTitle={`Editar OS #${os.id}`}
        backTitle={`OS #${os.id}`}
        to={`/os/${os.id}`}
      />

      <OSEditHeader
        os={os}
        form={form}
        onSave={handleSave}
        isSaving={
          updateOrderProduct.isPending
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <OSEditInfoCard
            form={form}
            onChange={handleChange}
          />

          <OSEditMeasuresCard
            form={form}
            onMeasureChange={
              handleMeasureChange
            }
            onAddMeasure={
              handleAddMeasure
            }
            onRemoveMeasure={
              handleRemoveMeasure
            }
          />

          <OSEditObservationCard
            form={form}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-6">
          <OSEditOrderCard os={os} />
        </div>
      </div>
    </div>
  );
}