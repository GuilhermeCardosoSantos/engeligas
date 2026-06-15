"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";

type Props = {
  products: any[];
};

export default function OrderEditProductsCard({
  products,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

      <h2 className="mb-6 text-lg font-semibold">
        Produtos Vinculados
      </h2>

      <div className="space-y-3">

        {products.map(
          (product) => (

            <div
              key={product.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 dark:border-gray-800"
            >

              <div>

                <p className="font-medium">
                  {product.item}
                </p>

                <p className="text-sm text-gray-500">
                  {product.liga}
                </p>

              </div>

              <Link
                href={`/os/${product.id}`}
              >
                <Button
                  size="sm"
                >
                  Ver OS
                </Button>
              </Link>

            </div>

          )
        )}

      </div>

    </div>
  );
}