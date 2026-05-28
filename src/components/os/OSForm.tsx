"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/button/Button";

const inputClass =
  "h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const selectClass =
  "h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const tableInputClass =
  "h-10 w-full min-w-[90px] rounded-lg border border-gray-300 bg-transparent px-3 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

type ItemRow = {
  id: number;
};

export default function OsForm() {
  const [items, setItems] = React.useState<ItemRow[]>([{ id: Date.now() }]);

  const handleAddItem = () => {
    setItems((prev) => [...prev, { id: Date.now() + Math.random() }]);
  };

  const handleRemoveItem = (id: number) => {
    setItems((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* LEFT */}

          <div>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
              Ordem de Serviço
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie ordens de serviço
            </p>

          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            <div className="w-full lg:w-[220px]">

              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Data do Pedido
              </label>

              <input
                type="date"
                className={inputClass}
              />

            </div>

            <div className="w-full lg:w-[220px]">

              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Nº Ordem de Serviço
              </label>

              <input
                type="text"
                placeholder="OS"
                className={inputClass}
              />

            </div>

          </div>

        </div>

      </div>

      {/* DADOS PRINCIPAIS */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
          Dados do Pedido
        </h2>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Fornecedor
            </label>

            <input
              type="text"
              placeholder="Fornecedor"
              defaultValue="ENGELIGAS"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Contato
            </label>

            <input type="text" placeholder="Contato" className={inputClass} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Nº Pedido do Cliente
            </label>

            <input
              type="text"
              placeholder="Pedido do cliente"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Cliente
            </label>

            <input type="text" placeholder="Cliente" className={inputClass} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Frete
            </label>

            <select className={selectClass}>
              <option value="FOB">FOB</option>
              <option value="CIF">CIF</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Transporte
            </label>

            <input
              type="text"
              placeholder="Transportadora"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Cond. de Pagamento
            </label>

            <select className={selectClass} defaultValue="30/45/60 DDL">
              <option>45 DDL</option>
              <option>30/45/60 DDL</option>
              <option>45/60 DDL</option>
              <option>30/45/60/75 DDL</option>
              <option>30 DDL</option>
              <option>30/45 DDL</option>
              <option>28/42/56 DDL</option>
              <option>À VISTA</option>
              <option>21 DDL</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Material com Certificado
            </label>

            <select className={selectClass} defaultValue="SIM">
              <option>SIM</option>
              <option>NÃO</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUTOS */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Descrição do Produto
          </h2>

          <Button onClick={handleAddItem}>Adicionar Produto</Button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  QTD PÇ
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Liga
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Formato
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ø Ext.
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ø Int.
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Esp.
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Larg.
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Comp.
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Sobre Metal
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Unidade
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Peso
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Valor Unit.
                </th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Valor Produto
                </th>
                <th className="px-3 py-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ação
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-white/2"
                >
                  <td className="p-2">
                    <input type="number" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <select className={tableInputClass}>
                      <option>620</option>
                      <option>430-B</option>
                      <option>64</option>
                      <option>LATÃO</option>
                      <option>40</option>
                      <option>43</option>
                      <option>62</option>
                      <option>65</option>
                      <option>66</option>
                      <option>67</option>
                      <option>660</option>
                      <option>430-A</option>
                      <option>68</option>
                      <option>68-B</option>
                      <option>68-C</option>
                      <option>68-D</option>
                      <option>BZ-12</option>
                      <option>BZ-14</option>
                      <option>BZ-AL</option>
                    </select>
                  </td>

                  <td className="p-2">
                    <select className={tableInputClass}>
                      <option>BUCHA</option>
                      <option>FLANGE</option>
                      <option>SEXTAVADO</option>
                      <option>TARUGO</option>
                      <option>BARRA CHATA</option>
                      <option>BARRA OCA</option>
                      <option>BARRA QUA</option>
                      <option>BARRA RED</option>
                    </select>
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="0" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="0" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="0" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="0" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="0" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="0" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <select className={tableInputClass}>
                      <option>KG</option>
                      <option>PÇ</option>
                    </select>
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="0,00" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="R$ 0,00" className={tableInputClass} />
                  </td>

                  <td className="p-2">
                    <input type="text" placeholder="R$ -" className={tableInputClass} />
                  </td>

                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOTAIS */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Observações
          </h2>

          <textarea
            rows={6}
            placeholder="* Os pesos apresentados são teóricos, podendo haver variações."
            className="w-full h-60 rounded-2xl border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Totais
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                KG Total
              </label>

              <input type="text" placeholder="0,00" className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Valor IPI
              </label>

              <input type="text" placeholder="R$ 0,00" className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Total Geral
              </label>

              <input type="text" placeholder="R$ -" className={inputClass} />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button className="h-11">Salvar OS</Button>
      </div>
    </div>
  );
}