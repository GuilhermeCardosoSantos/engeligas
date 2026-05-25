import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENGELIGAS | Tecnologia em Metais e Ligas Especiais",
  description:
    "A ENGELIGAS atua desde 2012 oferecendo soluções em Bronze, Cobre, Latão e Alumínio, com excelência, qualidade, tecnologia e compromisso no segmento de metais não ferrosos.",
};

export default function SignIn() {
  return <SignInForm />;
}
