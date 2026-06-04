import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import User from "@/components/users/Users"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ENGELIGAS & ENQUÍMICA | Usuários",
    description:
      "A ENGELIGAS & ENQUÍMICA atua desde 2012 oferecendo soluções em Bronze, Cobre, Latão e Alumínio, com excelência, qualidade, tecnologia e compromisso no segmento de metais não ferrosos.",
  };

export default function Users() {
    return(
        <div> 
            <PageBreadcrumb pageTitle="Consultar usuários"  />
            <User/>
        </div>
    )
}