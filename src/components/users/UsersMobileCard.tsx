"use client";

import Button from "../ui/button/Button";

import { Eye, Pencil } from "lucide-react";

import { User } from "./Users";

type Props = {
  user: User;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function UsersMobileCard({
  user,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-engeligas-400 to-engeligas-600 font-semibold text-white">
          {getInitials(user.name)}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white/90">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-medium ${
                user.status === "Ativo"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">
                Cargo
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                {user.role}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Último acesso
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                {user.lastAccess}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Telefone
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                {user.phone}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Criado em
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                {user.createdAt}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Button size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Perfil
            </Button>

            <Button
              size="sm"
              variant="outline"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}