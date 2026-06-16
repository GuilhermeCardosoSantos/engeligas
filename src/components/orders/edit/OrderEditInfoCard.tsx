"use client";

import {
  Building2,
  CalendarDays,
  Info,
  Truck,
  UserRound,
} from "lucide-react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

type Props = {
  form: any;

  setForm: React.Dispatch<
    React.SetStateAction<any>
  >;
};

const inputClass =
  "h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm text-gray-800 outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const FRETE_OPTIONS = [
  {
    value: "CIF - Por conta do Remetente",
    label: "CIF - Por conta do Remetente",
  },
  {
    value: "FOB - Por conta do Destinatário",
    label: "FOB - Por conta do Destinatário",
  },
];

const STATUS_OPTIONS = [
  "EM ABERTO",
  "ALERTA",
  "EM ATRASO",
  "FINALIZADO",
  "CANCELADO",
];

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {icon}
        {label}
      </Label>

      {children}
    </div>
  );
}

export default function OrderEditInfoCard({
  form,
  setForm,
}: Props) {
  const handleChange = (
    field: string,
    value: any
  ) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
          <Info className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Informações do Pedido
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dados principais de identificação e prazo.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Cliente"
          icon={<Building2 className="h-4 w-4" />}
        >
          <Input
            value={form.cliente ?? ""}
            onChange={(e) =>
              handleChange(
                "cliente",
                e.target.value
              )
            }
            className={inputClass}
            placeholder="Nome do cliente"
          />
        </Field>

        <Field
          label="Vendedor"
          icon={<UserRound className="h-4 w-4" />}
        >
          <Input
            value={form.vendedor ?? ""}
            onChange={(e) =>
              handleChange(
                "vendedor",
                e.target.value
              )
            }
            className={inputClass}
            placeholder="Nome do vendedor"
          />
        </Field>

        <Field
          label="Frete"
          icon={<Truck className="h-4 w-4" />}
        >
          <select
            value={form.frete ?? ""}
            onChange={(e) =>
              handleChange(
                "frete",
                e.target.value
              )
            }
            className={inputClass}
          >
            <option value="">
              Selecione o frete
            </option>

            {form.frete &&
              !FRETE_OPTIONS.some(
                (option) =>
                  option.value === form.frete
              ) && (
                <option value={form.frete}>
                  {form.frete}
                </option>
              )}

            {FRETE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Status">
          <select
            value={form.status ?? ""}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value
              )
            }
            className={inputClass}
          >
            <option value="">
              Selecione o status
            </option>

            {STATUS_OPTIONS.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Emissão"
          icon={<CalendarDays className="h-4 w-4" />}
        >
          <Input
            type="date"
            value={form.emissao ?? ""}
            onChange={(e) =>
              handleChange(
                "emissao",
                e.target.value
              )
            }
            className={inputClass}
          />
        </Field>

        <Field
          label="Previsto"
          icon={<CalendarDays className="h-4 w-4" />}
        >
          <Input
            type="date"
            value={form.previsto ?? ""}
            onChange={(e) =>
              handleChange(
                "previsto",
                e.target.value
              )
            }
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  );
}