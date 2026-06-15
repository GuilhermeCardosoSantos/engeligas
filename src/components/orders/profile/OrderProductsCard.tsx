"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import { formatCapitalize } from "@/components/ui/mask/Index";

type Props = {
  products: any[];
};

export default function OrderProductsCard({
  products,
}: Props) {
  const formatCurrency = (
    value: number
  ) => {
    return new Intl.NumberFormat(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    ).format(value || 0);
  };

  const formatMedidas = (
    medidas: any[]
  ) => {
    if (!Array.isArray(medidas)) {
      return "-";
    }

    return medidas
      .map(
        (m) =>
          `${m.valor}${m.unidade}`
      )
      .join(" x ");
  };

  const totalProdutos =
    products.length;

  const valorTotal =
    products.reduce(
      (
        total,
        product
      ) =>
        total +
        Number(
          product.valor_total || 0
        ),
      0
    );

  const pesoTotal =
    products.reduce(
      (
        total,
        product
      ) =>
        total +
        Number(
          product.peso_total || 0
        ),
      0
    );

  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        dark:border-gray-800
        dark:bg-white/[0.03]
      "
    >
      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h3
            className="
              text-lg
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Produtos
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            {totalProdutos} produto(s)
            cadastrados
          </p>

        </div>

        <div className="flex items-center gap-8">

          <div className="text-right">

            <p
              className="
                text-xs
                uppercase
                text-gray-500
              "
            >
              Peso Total
            </p>

            <p
              className="
                text-lg
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              {pesoTotal.toFixed(2)} kg
            </p>

          </div>

          <div className="text-right">

            <p
              className="
                text-xs
                uppercase
                text-gray-500
              "
            >
              Valor Total
            </p>

            <p
              className="
                text-lg
                font-semibold
                text-engeligas-500
              "
            >
              {formatCurrency(
                valorTotal
              )}
            </p>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
                border-b
                border-gray-200
                dark:border-gray-800
              "
            >

              <th
                className="
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-semibold
                "
              >
                Item
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-semibold
                "
              >
                Liga
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-semibold
                "
              >
                Medidas
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-semibold
                "
              >
                Quantidade
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-semibold
                "
              >
                Status
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-right
                  text-sm
                  font-semibold
                "
              >
                Peso Unit.
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-right
                  text-sm
                  font-semibold
                "
              >
                Peso Total
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-right
                  text-sm
                  font-semibold
                "
              >
                Valor Unitário
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-right
                  text-sm
                  font-semibold
                "
              >
                Valor Total
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-semibold
                "
              >
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map(
              (product) => (

                <tr
                  key={product.id}
                  className="
                    border-b
                    border-gray-100
                    transition
                    hover:bg-gray-50
                    dark:border-gray-800
                    dark:hover:bg-white/2
                  "
                >

                  <td
                    className="capitalize"
                  >
                    {formatCapitalize(product.item)}
                  </td>

                  <td
                    className="
    px-4
    py-4
  "
                  >
                    <span
                      className="
      inline-flex
      rounded-full
      bg-blue-100
      px-2.5
      py-1
      text-xs
      font-medium
      text-blue-700
      dark:bg-blue-500/10
      dark:text-blue-400
    "
                    >
                      {formatCapitalize(
                        product.liga
                      )}
                    </span>
                  </td>

                  <td
                    className="
                      px-4
                      py-4
                    "
                  >
                    {formatMedidas(
                      product.medidas
                    )}
                  </td>

                  <td
                    className="
                      px-4
                      py-4
                      text-center
                    "
                  >
                    {product.quantidade}{" "}
                    {product.unidade}
                  </td>

                  <td
                    className="
                      px-4
                      py-4
                      text-center
                    "
                  >

                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-green-100
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        text-green-700
                        dark:bg-green-500/10
                        dark:text-green-400
                      "
                    >
                      {product.status}
                    </span>

                  </td>

                  <td
                    className="
                      px-4
                      py-4
                      text-right
                    "
                  >
                    {Number(
                      product.peso_unitario || 0
                    ).toFixed(2)} kg
                  </td>

                  <td
                    className="
                      px-4
                      py-4
                      text-right
                      font-medium
                    "
                  >
                    {Number(
                      product.peso_total || 0
                    ).toFixed(2)} kg
                  </td>

                  <td
                    className="
                      px-4
                      py-4
                      text-right
                    "
                  >
                    {formatCurrency(
                      product.valor_unitario
                    )}
                  </td>

                  <td
                    className="
                      px-4
                      py-4
                      text-right
                      font-semibold
                    "
                  >
                    {formatCurrency(
                      product.valor_total
                    )}
                  </td>

                  <td
                    className="
                      px-4
                      py-4
                      text-center
                    "
                  >

                    <Link
                      href={`/os/${product.id}`}
                    >
                      <Button
                        size="sm"
                      >
                        Ver OS
                      </Button>
                    </Link>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}