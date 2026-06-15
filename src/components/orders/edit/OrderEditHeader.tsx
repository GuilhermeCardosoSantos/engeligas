"use client";

import {
    Package,
    Save,
    X,
} from "lucide-react";

import Button from "@/components/ui/button/Button";
import Link from "next/link";

type Props = {
    order: any;
    onSave?: () => void;
    isSaving?: boolean;
};

export default function OrderEditHeader({
    order,
    onSave,
    isSaving
}: Props) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

            <div className="flex items-start justify-between">

                <div className="flex gap-4">

                    <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">

                        <Package className="h-8 w-8" />

                    </div>

                    <div>

                        <h1 className="text-3xl font-semibold">
                            Editar Pedido #{order.pedido_id}
                        </h1>

                        <p className="mt-2 text-gray-500">
                            {order.cliente}
                        </p>

                    </div>

                </div>

                <div className="flex gap-3">

                    <Link
                        href={`/orders/${order.id}`}
                    >
                        <Button
                            variant="outline"
                        >
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
                            : "Salvar"}
                    </Button>

                </div>

            </div>

        </div>
    );
}