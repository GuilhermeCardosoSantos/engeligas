"use client";

import * as React from "react";

import { faker } from "@faker-js/faker";

import UsersSearch from "./UsersSearch";
import UsersTable from "./UsersTable";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Ativo" | "Inativo";
  phone: string;
  createdAt: string;
  lastAccess: string;
};

faker.seed(123);

const users: User[] = Array.from({
  length: 50,
}).map((_, index) => ({
  id: index + 1,

  name: faker.person.fullName(),

  email: `user${index + 1}@gmail.com`,

  role: faker.helpers.arrayElement([
    "Administrador",
    "Supervisor",
    "Financeiro",
    "RH",
    "Colaborador",
  ]),

  status: faker.helpers.arrayElement([
    "Ativo",
    "Inativo",
  ]),

  phone: faker.phone.number(),

  createdAt: faker.date
    .past()
    .toLocaleDateString(),

  lastAccess: faker.date
    .recent()
    .toLocaleString(),
}));

export default function Users() {
  const [search, setSearch] =
    React.useState("");

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => {
      return (
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        user.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        user.role
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [search]);

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