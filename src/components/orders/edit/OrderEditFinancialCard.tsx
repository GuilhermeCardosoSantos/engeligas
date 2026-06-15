"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

type Props = {
    form: any;

    setForm: React.Dispatch<
        React.SetStateAction<any>
    >;
};

export default function OrderEditFinancialCard({
    form,
    setForm
}: Props) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

            <h2 className="mb-6 text-lg font-semibold">
                Financeiro
            </h2>

            <div className="space-y-4">

                <div>

                    <Label className="mb-2 block text-sm font-medium">
                        Condição
                    </Label>

                    <Input
                        value={
                            form.condicao_pagamento
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                condicao_pagamento:
                                    e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3"
                    />

                </div>

                <div>

                    <Label className="mb-2 block text-sm font-medium">
                        Forma de Pagamento
                    </Label>

                    <Input
                        value={
                            form.cliente
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                cliente:
                                    e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3"
                    />

                </div>

                <div>

                    <Label className="mb-2 block text-sm font-medium">
                        Método
                    </Label>

                    <Input
                        value={
                            form.metodo_pagamento
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                metodo_pagamento:
                                    e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3"
                    />

                </div>

            </div>

        </div>
    );
}