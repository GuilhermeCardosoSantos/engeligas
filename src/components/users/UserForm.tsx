"use client";
// icons
import { EyeIcon } from "lucide-react";
import { EyeCloseIcon } from "@/icons";
// UI
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { handleChange, handleCpfChange, handlePhoneChange } from "../form/input/Util";
import { formatCpf, formatPhone } from "../ui/mask/Index";
// hooks
import { useEffect, useState } from "react";
import { useCreateUser } from "@/hooks/user/useCreateUser";
import { useGetUserById } from "@/hooks/user/useGetUserById";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
// toast
import { toast } from "react-toastify";
// type
type Props = {
  isEditing?: boolean;
  userId?: string;
};

export default function UserForm({
  isEditing = false,
  userId,
}: Props) {
  // hooks
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserById(userId ? userId : "");
  // util
  const [showConfirmedPassword, setConfirmedShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    status: "",
    name: "",
    email: "",
    role: "",
    phone: "",
    cpf: "",
    password: "",
    confirmedPassword: ""
  });
  const hasChanges =
    form.name !== user?.name ||
    form.email !== user?.email ||
    form.cpf !== user?.cpf ||
    form.phone !== user?.phone ||
    form.role !== user?.role ||
    form.status !== user?.status;
  const getChangedFields = () => {
    const payload: {
      id: string;
      name?: string;
      email?: string;
      cpf?: string;
      phone?: string;
      role?: string;
      status?: string;
    } = {
      id: userId ?? "",
    };

    if (form.name !== user?.name) {
      payload.name = form.name;
    }

    if (form.email !== user?.email) {
      payload.email = form.email;
    }

    if (form.cpf !== user?.cpf) {
      payload.cpf = form.cpf;
    }

    if (form.phone !== user?.phone) {
      payload.phone = form.phone;
    }

    if (form.role !== user?.role) {
      payload.role = form.role;
    }
    
    if (form.status !== user?.status) {
      payload.status = form.status;
    }

    return payload;
  };


  const handleSubmit = async () => {
    try {
      if (!isEditing) {
        await createUser.mutateAsync({
          status: form.status,
          name: form.name,
          email: form.email,
          role: form.role,
          phone: form.phone,
          cpf: form.cpf,
          password: form.password,
        });
        const initialForm = {
          status: "",
          name: "",
          email: "",
          role: "",
          phone: "",
          cpf: "",
          password: "",
          confirmedPassword: "",
        };
        toast.success(
          "Usuário criado com sucesso!",
          {
            autoClose: 5000,
          }
        );
        setForm(initialForm);
      } else {
        const payload = getChangedFields();

        if (Object.keys(payload).length === 1) {
          toast.error(
            "Nenhuma alteração foi realizada."
          );
          return;
        }
        const response = await updateUser.mutateAsync(payload);

        toast.success(
          response.message ??
          "Usuário atualizado com sucesso."
        );

      }
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao criar usuário."
      );
    }
  };

  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      status: user.status ?? "",
      role: user.role ?? "",
      name: user.name ?? "",
      email: user.email ?? "",
      cpf: user.cpf ?? "",
      phone: user.phone ?? "",
    }));
  }, [user]);

  return (
    <>

      {isEditing && isLoading ?
        <p>aguarde</p>
        :
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
          {/* HEADER */}

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
              {isEditing
                ? "Visualizar Usuário"
                : "Adicionar Usuário"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isEditing
                ? "Visualize as informações do usuário"
                : "Preencha as informações do usuário"}
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }} className="space-y-6">
            {/* GRID */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* NOME */}

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nome completo
                </Label>

                <Input
                  name="name"
                  required
                  type="text"
                  placeholder="Digite o nome completo"
                  value={form.name}
                  onChange={(e) => handleChange(e, setForm)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* EMAIL */}

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  E-mail
                </Label>

                <Input
                  name="email"
                  required
                  type="email"
                  placeholder="Digite o e-mail"
                  value={form.email}
                  onChange={(e) => handleChange(e, setForm)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* TELEFONE */}

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Telefone
                </Label>

                <Input
                  name="phone"
                  required
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={formatPhone(form.phone)}
                  onChange={(e) => handlePhoneChange(e, setForm)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* CPF */}

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  CPF
                </Label>

                <Input
                  name="cpf"
                  required
                  type="text"
                  placeholder="000.000.000-00"
                  onChange={(e) => handleCpfChange(e, setForm)}
                  value={formatCpf(form.cpf)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              {/* CARGO */}

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Permissão
                </Label>

                <select
                  name="role"
                  value={form.role}
                  onChange={(e) => handleChange(e, setForm)}
                  required
                  className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">
                    Selecione um cargo
                  </option>

                  <option value="ADMIN">
                    Administrador
                  </option>

                  <option value="USER">
                    Usuário comum
                  </option>
                </select>
              </div>

              {/* STATUS */}

              <div>
                <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Status
                </Label>

                <select
                  name="status"
                  required
                  value={form.status}
                  onChange={(e) => handleChange(e, setForm)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="ACTIVE">
                    Ativo
                  </option>

                  <option value="INACTIVE">
                    Inativo
                  </option>
                </select>
              </div>

              { !isEditing &&
                <>
                  {/* SENHA */}

                  <div>
                    <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Senha
                    </Label>

                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={form.password}
                        required
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        {showPassword ? (
                          <EyeIcon size={18} />
                        ) : (
                          <EyeCloseIcon />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRMAR SENHA */}

                  <div>
                    <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Confirmar senha
                    </Label>

                    <div className="relative">
                      <Input
                        name="confirmedPassword"
                        type={showConfirmedPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={form.confirmedPassword}
                        required
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            confirmedPassword: e.target.value,
                          }))
                        }
                      />

                      <button
                        type="button"
                        onClick={() => setConfirmedShowPassword(!showConfirmedPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        {showConfirmedPassword ? (
                          <EyeIcon size={18} />
                        ) : (
                          <EyeCloseIcon />
                        )}
                      </button>
                    </div>
                  </div>

                </>
              }

            </div>

            {/* PERMISSÕES */}

            {/* <div>
            <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Permissões
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                "Ordem de serviço",
                "Usuários",
                "Financeiro",
                "Dashboard",
                "Relatórios",
                "Chamados",
                "Estoque",
                "Configurações",
              ].map((permission) => (
                <label
                  key={permission}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
                >
                  <input
                    type="checkbox"
                    disabled={isEditing}
                    className="h-4 w-4 rounded border-gray-300 text-engeligas-500 focus:ring-engeligas-500"
                  />

                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {permission}
                  </span>
                </label>
              ))}
            </div>
          </div> */}

            {/* BUTTONS */}

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">


              <Button
                disabled={!hasChanges && isEditing}
                type="submit"
                className="h-11 bg-engeligas-400 hover:bg-engeligas-500"
              >
                {isEditing
                  ? "Editar Usuário"
                  : "Cadastrar Usuário"}
              </Button>
            </div>
          </form>
        </div>
      }
    </>
  );
}