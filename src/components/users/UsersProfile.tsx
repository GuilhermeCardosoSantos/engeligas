"use client";

import React from "react";
// next
import Link from "next/link";
// icon
import {
    Briefcase,
    CalendarDays,
    FileText,
    Mail,
    MapPin,
    MoveRight,
    Phone,
    ShieldCheck,
    User,
    Users,
} from "lucide-react";
// ui
import Button from "@/components/ui/button/Button";
// hooks
import { useParams } from "next/navigation";
import { useGetUserById } from "@/hooks/user/useGetUserById";
// 
import { formatCpf, formatPhone } from '@/components/ui/mask/Index'


export default function UsersProfile() {
    // hooks
    const params = useParams();
    const {
        data: user,
        isLoading,
        error,
    } = useGetUserById(params.id as string);
    // helpers
    const roleLabel =
        user?.role === "ADMIN"
            ? "Administrador"
            : "Usuário comum";

    const statusLabel =
        user?.status === "ACTIVE"
            ? "Ativo"
            : "Inativo";

    const initials =
        user?.name
            ?.split(" ")
            .slice(0, 2)
            .map((word: string) => word[0])
            .join("")
            .toUpperCase() ?? "U";

    const createdAt =
        user?.created_at
            ? new Date(
                user.created_at
            ).toLocaleDateString("pt-BR")
            : "-";

    const lastAccess =
        user?.last_access
            ? new Date(
                user.last_access
            ).toLocaleString("pt-BR")
            : "Nunca acessou";

    return (
        <div className="space-y-6">
            {isLoading ?
                <>
                    <p>aqui</p>
                </>
                :
                <>
                    {/* HERO */}

                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
                        {/* TOP BG */}

                        <div className="h-36 bg-linear-to-r from-engeligas-500 via-engeligas-400 to-orange-400" />

                        {/* CONTENT */}

                        <div className="relative px-6 pb-6">
                            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                                {/* LEFT */}

                                <div className="flex flex-col gap-5 xl:flex-row xl:items-end">
                                    {/* AVATAR */}

                                    <div className="-mt-14 flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-engeligas-500 text-3xl font-semibold text-white shadow-lg dark:border-gray-900">
                                        {initials}
                                    </div>

                                    {/* INFO */}

                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h1 className="text-3xl capitalize font-semibold text-gray-800 dark:text-white/90">
                                                {user.name}
                                            </h1>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${statusLabel === "Ativo"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                                    }`}
                                            >
                                                {statusLabel}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4" />
                                                {roleLabel}
                                            </div>

                                            {/* <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            RH & Gestão
                                        </div> */}
                                        </div>
                                    </div>
                                </div>

                                {/* ACTIONS */}

                                <div className="flex flex-wrap gap-3">
                                    <Link href="/users">
                                        <Button variant="outline">
                                            Voltar
                                        </Button>
                                    </Link>

                                    <Link href="/users/edit/1">
                                        <Button>
                                            Editar Usuário
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GRID */}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        {/* LEFT */}

                        <div className="space-y-6 xl:col-span-2">
                            {/* DADOS */}

                            <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
                                <div className="mb-6 flex items-center gap-2">
                                    <User className="h-5 w-5 text-engeligas-500" />

                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                        Informações Pessoais
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                    <InfoCard
                                        icon={<Mail className="h-4 w-4" />}
                                        title="E-mail"
                                        value={user.email}
                                    />

                                    <InfoCard
                                        icon={<Phone className="h-4 w-4" />}
                                        title="Telefone"
                                        value={formatPhone(user.phone)}
                                    />

                                    <InfoCard
                                        icon={<FileText className="h-4 w-4" />}
                                        title="CPF"
                                        value={formatCpf(user.cpf)}
                                    />

                                    <InfoCard
                                        icon={<ShieldCheck  className="h-4 w-4" />}
                                        title="Permissão"
                                        value={roleLabel}
                                    />

                                    {/* <InfoCard
                                        icon={<MapPin className="h-4 w-4" />}
                                        title="Setor"
                                        value="RH & Gestão"
                                    /> */}

                                    <InfoCard
                                        icon={<CalendarDays className="h-4 w-4" />}
                                        title="Desde"
                                        value={createdAt}
                                    />
                                </div>
                            </div>

                            {/* ATIVIDADES */}

                            {/* <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                            Atividades Recentes
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Últimas ações realizadas no sistema
                                        </p>
                                    </div>

                                    <button className="inline-flex items-center gap-2 text-sm font-medium text-engeligas-500 transition hover:text-engeligas-600">
                                        Ver tudo

                                        <MoveRight className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-5">
                                    {activities.map((activity, index) => (
                                        <TimelineItem
                                            key={index}
                                            title={activity.title}
                                            date={activity.date}
                                            active={index === 0}
                                        />
                                    ))}
                                </div>
                            </div> */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                                <div className="flex flex-col items-center justify-center py-12 text-center">

                                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-engeligas-100 dark:bg-engeligas-500/10">
                                        <Briefcase className="h-8 w-8 text-engeligas-500" />
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                        Funcionalidade em Construção
                                    </h2>

                                    <p className="mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400">
                                        O histórico de atividades do usuário ainda está sendo desenvolvido.
                                        Em breve será possível visualizar acessos, alterações, ações realizadas
                                        e movimentações dentro do sistema.
                                    </p>

                                    <span className="mt-5 rounded-full bg-yellow-100 px-4 py-2 text-xs font-medium text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                                        🚧 Em desenvolvimento
                                    </span>

                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}

                        <div className="space-y-6">
                            {/* STATUS */}

                            <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                                <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                                    Status da Conta
                                </h2>

                                <div className="space-y-4">
                                    <StatusCard
                                        title="Situação"
                                        value={statusLabel}
                                        success={statusLabel === "Ativo"}
                                    />

                                    <StatusCard
                                        title="Permissões"
                                        value={roleLabel}
                                    />

                                    <StatusCard
                                        title="Último acesso"
                                        value={lastAccess}
                                    />
                                </div>
                            </div>

                            {/* PERMISSÕES */}

                            {/* <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                                <div className="mb-5 flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-engeligas-500" />

                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                        Permissões
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {permissions.map((permission, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-800"
                                        >
                                            <div className="h-2.5 w-2.5 rounded-full bg-engeligas-500" />

                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {permission}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            {/* RESUMO */}

                            {/* <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                                <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                                    Resumo
                                </h2>

                                <div className="space-y-4">
                                    <SummaryCard
                                        title="OS Criadas"
                                        value="128"
                                    />

                                    <SummaryCard
                                        title="Clientes"
                                        value="42"
                                    />

                                    <SummaryCard
                                        title="Acessos"
                                        value="1.240"
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

function InfoCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                {icon}

                <span className="text-sm font-medium">
                    {title}
                </span>
            </div>

            <p className="mt-3 font-semibold text-gray-800 dark:text-white/90">
                {value}
            </p>
        </div>
    );
}

function TimelineItem({
    title,
    date,
    active,
}: {
    title: string;
    date: string;
    active?: boolean;
}) {
    return (
        <div className="flex gap-3">
            <div className="flex flex-col items-center">
                <div
                    className={`h-3 w-3 rounded-full ${active
                        ? "bg-engeligas-500"
                        : "bg-gray-300 dark:bg-gray-700"
                        }`}
                />

                <div className="mt-1 h-full w-px bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="pb-2">
                <p className="font-medium text-gray-800 dark:text-white/90">
                    {title}
                </p>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {date}
                </p>
            </div>
        </div>
    );
}

function StatusCard({
    title,
    value,
    success,
}: {
    title: string;
    value: string;
    success?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {title}
            </p>

            <div
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${success
                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : "bg-engeligas-100 text-engeligas-700 dark:bg-engeligas-500/10 dark:text-engeligas-400"
                    }`}
            >
                {value}
            </div>
        </div>
    );
}

function SummaryCard({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {title}
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white">
                {value}
            </h3>
        </div>
    );
}
