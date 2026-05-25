"use client";

import { Plus, Search } from "lucide-react";

import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";

type Props = {
  search: string;

  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export default function UsersSearch({
  search,
  setSearch,
}: Props) {

    const router = useRouter();

    const handleCreate = () => {
        router.push("/users/create");
    }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Gerenciamento de Usuários
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie usuários do sistema
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Buscar usuário..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-11 w-full rounded-xl border border-gray-300 bg-transparent pl-11 pr-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-[320px]"
            />
          </div>

          <Button className="h-11 bg-engeligas-400 hover:bg-engeligas-500" onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Usuário
          </Button>
        </div>
      </div>
    </div>
  );
}