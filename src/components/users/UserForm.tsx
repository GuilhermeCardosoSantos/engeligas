"use client";

import React from "react";

import Button from "../ui/button/Button";

export default function UserForm() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* HEADER */}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Adicione Usuário
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Preencha as informações do usuário
        </p>
      </div>

      {/* FORM */}

      <form className="space-y-6">
        {/* GRID */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* NOME */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Nome completo
            </label>

            <input
              type="text"
              placeholder="Digite o nome completo"
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              E-mail
            </label>

            <input
              type="email"
              placeholder="Digite o e-mail"
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* TELEFONE */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Telefone
            </label>

            <input
              type="text"
              placeholder="(11) 99999-9999"
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* CPF */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              CPF
            </label>

            <input
              type="text"
              placeholder="000.000.000-00"
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* CARGO */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Cargo
            </label>

            <select className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
              <option>
                Selecione um cargo
              </option>

              <option>
                Administrador
              </option>

              <option>
                Supervisor
              </option>

              <option>
                Financeiro
              </option>

              <option>
                RH
              </option>

              <option>
                Colaborador
              </option>
            </select>
          </div>

          {/* STATUS */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Status
            </label>

            <select className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
              <option>
                Ativo
              </option>

              <option>
                Inativo
              </option>
            </select>
          </div>

          {/* SENHA */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite a senha"
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* CONFIRMAR SENHA */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Confirmar senha
            </label>

            <input
              type="password"
              placeholder="Confirme a senha"
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* OBSERVAÇÃO */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Observações
          </label>

          <textarea
            rows={5}
            placeholder="Digite alguma observação..."
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* PERMISSÕES */}

        <div>
          <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Permissões
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Ordem de serviço",
            ].map((permission) => (
              <label
                key={permission}
                className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-engeligas-500 focus:ring-engeligas-500"
                />

                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {permission}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="h-11"
          >
            Cancelar
          </Button>

          <Button className="h-11 bg-engeligas-400 hover:bg-engeligas-500">
            Salvar Usuário
          </Button>
        </div>
      </form>
    </div>
  );
}