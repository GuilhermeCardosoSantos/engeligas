"use client";

import * as React from "react";

import UsersSearch from "./UsersSearch";
import UsersTable from "./UsersTable";

import { useGetAllUsers } from "@/hooks/user/useGetAllUser";

export default function Users() {
  const [search, setSearch] =
    React.useState("");

  const {
    data: users = [],
    isLoading,
    error,
  } = useGetAllUsers();

  console.log(users)

  const normalizedUsers = React.useMemo(() => {
    return users.map((user) => ({
      ...user,
  
      status:
        user.status === "ACTIVE"
          ? "Ativo"
          : "Inativo",
  
      role:
        user.role === "ADMIN"
          ? "Administrador"
          : "Usuário",
  
      createdAt: user.created_at
        ? new Date(
            user.created_at
          ).toLocaleDateString("pt-BR")
        : "-",
  
      lastAccess: user.last_access
        ? new Date(
            user.last_access
          ).toLocaleString("pt-BR")
        : "Nunca acessou",
    }));
  }, [users]);
  
  const filteredUsers = React.useMemo(() => {
    return normalizedUsers.filter((user) => {
      return (
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
  
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
  
        user.role
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [normalizedUsers, search]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        Carregando usuários...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10 text-red-500">
        Erro ao carregar usuários.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersSearch
        search={search}
        setSearch={setSearch}
      />

      <UsersTable users={filteredUsers} />
    </div>
  );
}