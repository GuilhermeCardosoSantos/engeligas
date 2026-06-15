"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

type Props = {
    form: any;

    setForm: React.Dispatch<
        React.SetStateAction<any>
    >;
};

export default function OrderEditInfoCard({
    form,
    setForm
}: Props) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

            <h2 className="mb-6 text-lg font-semibold">
                Informações do Pedido
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>

                    <Label className="mb-2 block text-sm font-medium">
                        Cliente
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
                        Vendedor
                    </Label>

                    <Input
                        value={
                            form.vendedor
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                vendedor:
                                    e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3"
                    />

                </div>

                <div>

                    <Label className="mb-2 block text-sm font-medium">
                        Frete
                    </Label>

                    <select
                        value={
                            form.frete ?? ""
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                frete: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3"
                    >
                        <option value="CIF - Por conta do Remetente">
                            CIF
                        </option>

                        <option value="	FOB - Por conta do Destinatário">
                            FOB
                        </option>

                    </select>

                </div>

                <div>

                    <Label className="mb-2 block text-sm font-medium">
                        Status
                    </Label>

                    <select
                        value={
                            form.status ?? ""
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                status: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3"
                    >
                        <option value="EM ABERTO">
                            EM ABERTO
                        </option>

                        <option value="ALERTA">
                            ALERTA
                        </option>

                        <option value="EM ATRASO">
                            EM ATRASO
                        </option>

                        <option value="FINALIZADO">
                            FINALIZADO
                        </option>

                        <option value="CANCELADO">
                            CANCELADO
                        </option>

                    </select>

                </div>

                <div>

                    <Label className="mb-2 block text-sm font-medium">
                        Emissão
                    </Label>

                    <Input
                        type="date"
                        value={form.emissao ?? ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                emissao: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3"
                    />

                </div>

                <div>

                    <Label className="mb-2 block text-sm font-medium">
                        Previsto
                    </Label>

                    <Input
                        type="date"
                        value={form.previsto ?? ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                previsto: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3"
                    />

                </div>

            </div>

        </div>
    );
}