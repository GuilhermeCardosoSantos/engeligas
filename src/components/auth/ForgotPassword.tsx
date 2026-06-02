"use client";
// ui
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import OtpInput from "@/components/form/input/OtpInput";
// icon
import {
    EyeCloseIcon,
    EyeIcon,
} from "@/icons";
// next
import Link from "next/link";
// hooks
import { useState } from "react";
import { useGetUserByEmail } from "@/hooks/user/useGetUserByEmail";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
// toast
import { toast } from "react-toastify";
import router from "next/router";
import { CheckCircle2 } from "lucide-react";

export default function ForgotPasswordForm() {
    // util
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [phoneDigits, setPhoneDigits] = useState(["", "", "", ""]);
    const [cpfDigits, setCpfDigits] = useState(["", "", "", "", ""]);
    // form
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [user, setUser] = useState({
        email: '',
        phone: '',
        cpf: ''
    })
    // hooks
    const getUserByEmail = useGetUserByEmail()
    const forgotPassword = useForgotPassword()

    const handleSubmit = async () => {
        switch (step) {
            case 1:
                try {
                    const response = await getUserByEmail.mutateAsync(form.email);
                    setUser(response.user)
                    setStep(2);
                } catch (error) {
                    if (error instanceof Error) {
                        toast.error(
                            error instanceof Error
                                ? error.message
                                : "Erro inesperado"
                        );
                    }
                    console.error(error)
                }
                break;
            case 2:
                try {
                    const cpfValid = cpfDigits.join("") === user.cpf.slice(-5);
                    const phoneValid = phoneDigits.join("") === user.phone.slice(-4);

                    if (!phoneValid) {
                        toast.error("Telefone inválido");
                        return
                    }
                    if (!cpfValid) {
                        toast.error("CPF inválido");
                        return

                    }
                    toast.success("Validação completa!");
                    setStep(3);
                    break;

                } catch (error) {
                    if (error instanceof Error) {
                        toast.error(
                            error instanceof Error
                                ? error.message
                                : "Erro inesperado"
                        );
                    }
                    console.error(error)
                }
                break

                // setStep(3);
                break;
            case 3:
                try {
                    if (form.password !== form.confirmPassword) {
                        toast.warning("As senhas devem ser iguais.");
                        return
                    };
                    if (form.password.length < 6) {
                        toast.warning("A senha deve conter pelo menos 6 caracteres.");
                        return
                    };
                    const response = await forgotPassword.mutateAsync({
                        email: user.email,
                        phone: user.phone,
                        cpf: user.cpf,
                        new_password: form.password,
                    });
                    toast.success(response.message)
                    setStep(4);
                } catch (error) {
                    if (error instanceof Error) {
                        toast.error(
                            error instanceof Error
                                ? error.message
                                : "Erro inesperado"
                        );
                    }
                    console.error(error)
                }
                break;
        }
    };

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            <div className="flex flex-col justify-center flex-1 w-full max-w-xl mx-auto px-16">

                <div className="mb-5 sm:mb-8">
                    {step !== 4 &&
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Recuperar Senha
                        </h1>
                    }

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {step === 1 &&
                            "Informe seu e-mail para localizar sua conta."}

                        {step === 2 &&
                            "Confirme seus dados para validar sua identidade."}

                        {step === 3 &&
                            "Crie uma nova senha para acessar o sistema."}
                    </p>
                </div>

                {step == 4 ?
                    <div className="text-center">

                        <div className="flex justify-center mb-6">

                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/10">

                                <CheckCircle2
                                    size={48}
                                    className="text-green-600"
                                />

                            </div>

                        </div>

                        <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
                            Senha alterada com sucesso!
                        </h2>

                        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                            Sua senha foi atualizada com sucesso.
                            Agora você já pode acessar sua conta utilizando sua nova senha.
                        </p>

                        <Link
                            href="/signin"
                            className="text-sm underline text-brand-500 hover:text-brand-600 dark:text-brand-400"
                        >
                            Ir para loguin
                        </Link>

                    </div>
                    :
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="space-y-6">

                            {/* STEP 1 */}

                            {step === 1 && (
                                <>
                                    <div>
                                        <Label>
                                            Email
                                            <span className="text-engeligas-500">
                                                *
                                            </span>
                                        </Label>

                                        <Input
                                            type="email"
                                            placeholder="info@gmail.com"
                                            required
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            {/* STEP 2 */}

                            {step === 2 && (
                                <>
                                    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">

                                        <div className="mb-8">

                                            <p className="mb-2 text-sm text-gray-500">
                                                Telefone encontrado
                                            </p>

                                            <p className="text-2xl font-bold tracking-wider text-engeligas-500">
                                                (11) 9****-
                                                {phoneDigits.map(
                                                    (digit) =>
                                                        digit || "•"
                                                )}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="mb-2 text-sm text-gray-500">
                                                CPF encontrado
                                            </p>

                                            <p className="text-2xl font-bold tracking-wider text-engeligas-500">
                                                ***.***.
                                                {cpfDigits[0] || "•"}
                                                {cpfDigits[1] || "•"}
                                                {cpfDigits[2] || "•"}
                                                -
                                                {cpfDigits[3] || "•"}
                                                {cpfDigits[4] || "•"}
                                            </p>

                                        </div>

                                    </div>

                                    <div>

                                        <label className="mb-3 block font-medium text-gray-700 dark:text-gray-300">
                                            Digite os últimos 4 números do telefone
                                        </label>

                                        <OtpInput
                                            required
                                            length={4}
                                            value={phoneDigits}
                                            onChange={setPhoneDigits}
                                        />

                                    </div>

                                    <div>

                                        <label className="mb-3 block font-medium text-gray-700 dark:text-gray-300">
                                            Digite os últimos 5 números do CPF
                                        </label>

                                        <OtpInput
                                            required
                                            length={5}
                                            value={cpfDigits}
                                            onChange={setCpfDigits}
                                        />

                                    </div>
                                </>
                            )}

                            {/* STEP 3 */}

                            {step === 3 && (
                                <>
                                    <div>
                                        <Label>
                                            Nova Senha
                                        </Label>

                                        <div className="relative">

                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                required
                                                min="6"
                                                placeholder="Digite sua nova senha"
                                                value={form.password}
                                                onChange={(e) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        password:
                                                            e.target.value,
                                                    }))
                                                }
                                            />

                                            <span
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                            >
                                                {showPassword ? (
                                                    <EyeIcon />
                                                ) : (
                                                    <EyeCloseIcon />
                                                )}
                                            </span>

                                        </div>
                                    </div>

                                    <div>
                                        <Label>
                                            Confirmar Senha
                                        </Label>

                                        <div className="relative">

                                            <Input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirme sua senha"
                                                required
                                                min="6"
                                                value={
                                                    form.confirmPassword
                                                }
                                                onChange={(e) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        confirmPassword:
                                                            e.target.value,
                                                    }))
                                                }
                                            />

                                            <span
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeIcon />
                                                ) : (
                                                    <EyeCloseIcon />
                                                )}
                                            </span>

                                        </div>
                                    </div>
                                </>
                            )}

                            <Button
                                className="w-full"
                                size="sm"
                                disabled={
                                    getUserByEmail.isPending ||
                                    forgotPassword.isPending
                                }
                            >
                                {step === 1 &&
                                    (
                                        getUserByEmail.isPending
                                            ? "Buscando usuário..."
                                            : "Continuar"
                                    )}

                                {step === 2 &&
                                    "Validar Identidade"}

                                {step === 3 &&
                                    (
                                        forgotPassword.isPending
                                            ? "Alterando..."
                                            : "Alterar Senha"
                                    )}
                            </Button>

                            <div className="text-center">
                                <Link
                                    href="/signin"
                                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    Lembrei minha senha
                                </Link>
                            </div>

                        </div>
                    </form>
                }

            </div>
        </div>
    );
}