"use client";

import {
  CreditCard,
  Landmark,
  WalletCards,
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

export default function OrderEditFinancialCard({
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
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
          <WalletCards className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Financeiro
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Condições comerciais do pedido.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <Field
          label="Condição de Pagamento"
          icon={<CreditCard className="h-4 w-4" />}
        >
          <Input
            value={form.condicao_pagamento ?? ""}
            onChange={(e) =>
              handleChange(
                "condicao_pagamento",
                e.target.value
              )
            }
            className={inputClass}
            placeholder="Ex: 28 DIAS"
          />
        </Field>

        <Field
          label="Forma de Pagamento"
          icon={<WalletCards className="h-4 w-4" />}
        >
          <Input
            value={form.forma_pagamento ?? ""}
            onChange={(e) =>
              handleChange(
                "forma_pagamento",
                e.target.value
              )
            }
            className={inputClass}
            placeholder="Ex: BOLETO"
          />
        </Field>

        <Field
          label="Método"
          icon={<Landmark className="h-4 w-4" />}
        >
          <Input
            value={form.metodo_pagamento ?? ""}
            onChange={(e) =>
              handleChange(
                "metodo_pagamento",
                e.target.value
              )
            }
            className={inputClass}
            placeholder="Ex: À PRAZO"
          />
        </Field>
      </div>
    </div>
  );
}