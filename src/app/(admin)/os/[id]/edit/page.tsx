import OSEditPage from "@/components/os/edit/OSEditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ENGELIGAS & ENQUÍMICA | Ordem de serviço",
    description:
      "A ENGELIGAS & ENQUÍMICA atua desde 2012 oferecendo soluções em Bronze, Cobre, Latão e Alumínio, com excelência, qualidade, tecnologia e compromisso no segmento de metais não ferrosos.",
  };
  


export default function OS() {

    return (
        <div className="space-y-6">
            <OSEditPage />
        </div>
    );
}