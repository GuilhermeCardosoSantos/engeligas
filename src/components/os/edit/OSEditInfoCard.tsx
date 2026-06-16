"use client";

import {
    Boxes,
    CircleDollarSign,
    Package,
    Scale,
} from "lucide-react";

const LIGAS = [
    "TM620",
    "TM23",

    "SAE660",
    "SAE621",
    "SAE620",

    "SAE68-D",
    "SAE68-C",
    "SAE68-B",
    "SAE68-A",
    "SAE68",

    "SAE67",
    "SAE65",
    "SAE64",
    "SAE62",

    "SAE43",
    "SAE40",

    "430-B",
    "430-A",

    "BZ-AL",
    "BZ14",
    "BZ12",
    "BZ10",

    "CA955",
    "CA954",
    "CA630",
    "CA624",

    "86300",

    "INDUSTRIAL",
    "LATÃO",

    "NÃO ENCONTRADO",
]

const ITEMS = [
    "BUCHA FLANGEADA",
    "BUCHA",
    "TARUGO",
    "SEXTAVADO",
    "BARRA CHATA",
];

type Props = {
    form: any;

    onChange: (
        field: string,
        value: any
    ) => void;
};

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {label}
            </label>

            {children}
        </div>
    );
}

const inputClass =
    "h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm text-gray-800 outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

export default function OSEditInfoCard({
    form,
    onChange,
}: Props) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
                    <Boxes className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Informações da OS
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dados principais do produto da ordem de serviço.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <Field label="Item">
                    <div className="relative">
                        <Package className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <select
                            value={form.item ?? ""}
                            onChange={(e) =>
                                onChange(
                                    "item",
                                    e.target.value
                                )
                            }
                            className={`${inputClass} pl-11`}
                        >
                            <option value="">
                                Selecione um item
                            </option>

                            {form.item &&
                                !ITEMS.includes(form.item) && (
                                    <option value={form.item}>
                                        {form.item}
                                    </option>
                                )}

                            {ITEMS.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </Field>

                <Field label="Liga">
                    <select
                        value={form.liga ?? "NÃO ENCONTRADO"}
                        onChange={(e) =>
                            onChange(
                                "liga",
                                e.target.value
                            )
                        }
                        className={inputClass}
                    >
                        <option value="">
                            Selecione uma liga
                        </option>

                        {LIGAS.map((liga) => (
                            <option
                                key={liga}
                                value={liga}
                            >
                                {liga}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Status da OS">
                    <select
                        value={form.status ?? "EM ABERTO"}
                        onChange={(e) =>
                            onChange(
                                "status",
                                e.target.value
                            )
                        }
                        className={inputClass}
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
                </Field>

                <Field label="Unidade">
                    <select
                        value={form.unidade ?? "PC"}
                        onChange={(e) =>
                            onChange(
                                "unidade",
                                e.target.value
                            )
                        }
                        className={inputClass}
                    >
                        <option value="PC">
                            PC
                        </option>

                        <option value="KG">
                            KG
                        </option>

                        <option value="MT">
                            MT
                        </option>

                        <option value="M">
                            M
                        </option>
                    </select>
                </Field>

                <Field label="Quantidade">
                    <input
                        type="number"
                        step="0.01"
                        value={form.quantidade ?? ""}
                        onChange={(e) =>
                            onChange(
                                "quantidade",
                                e.target.value
                            )
                        }
                        className={inputClass}
                    />
                </Field>

                <Field label="Sobre Metal">
                    <input
                        type="number"
                        step="0.01"
                        value={form.sobre_metal ?? ""}
                        onChange={(e) =>
                            onChange(
                                "sobre_metal",
                                e.target.value
                            )
                        }
                        className={inputClass}
                    />
                </Field>

                <Field label="Peso Unitário">
                    <div className="relative">
                        <Scale className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <input
                            type="number"
                            step="0.01"
                            value={form.peso_unitario ?? ""}
                            onChange={(e) =>
                                onChange(
                                    "peso_unitario",
                                    e.target.value
                                )
                            }
                            className={`${inputClass} pl-11`}
                        />
                    </div>
                </Field>

                <Field label="Peso Total">
                    <div className="relative">
                        <Scale className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <input
                            type="number"
                            step="0.01"
                            value={form.peso_total ?? ""}
                            onChange={(e) =>
                                onChange(
                                    "peso_total",
                                    e.target.value
                                )
                            }
                            className={`${inputClass} pl-11`}
                        />
                    </div>
                </Field>

                <Field label="Valor Unitário">
                    <div className="relative">
                        <CircleDollarSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <input
                            type="number"
                            step="0.01"
                            value={form.valor_unitario ?? ""}
                            onChange={(e) =>
                                onChange(
                                    "valor_unitario",
                                    e.target.value
                                )
                            }
                            className={`${inputClass} pl-11`}
                        />
                    </div>
                </Field>

                <Field label="Valor Total">
                    <div className="relative">
                        <CircleDollarSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <input
                            type="number"
                            step="0.01"
                            value={form.valor_total ?? ""}
                            onChange={(e) =>
                                onChange(
                                    "valor_total",
                                    e.target.value
                                )
                            }
                            className={`${inputClass} pl-11`}
                        />
                    </div>
                </Field>
            </div>
        </div>
    );
}