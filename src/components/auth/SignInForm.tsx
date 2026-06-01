"use client";
// UI
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
// icon
import { EyeCloseIcon, EyeIcon } from "@/icons";
// next
import Link from "next/link";
// hooks
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLoguin } from "@/hooks/auth/useLoguin";
// toastify
import { toast } from "react-toastify";

export default function SignInForm() {
  // hooks
  const router = useRouter();
  const login = useLoguin();
  // util
  const [auth, setAuth] = useState<{ email: string; password: string; }>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSignIn = async () => {
    try {
      const res = await login.mutateAsync({
        email: auth.email,
        password: auth.password,
        remember: isChecked
      });
      router.push('/home')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro inesperado"
        );
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Acesso
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Digite seu e-mail e senha para entrar!
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            >
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-engeligas-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" type="email"
                    value={auth.email}
                    required
                    onChange={(e) =>
                      setAuth((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>
                    Senha <span className="text-engeligas-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={auth.password}
                      required
                      onChange={(e) =>
                        setAuth((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Mantenha-me conectado
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    disabled={login.isPending}
                  >
                    {login.isPending ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
