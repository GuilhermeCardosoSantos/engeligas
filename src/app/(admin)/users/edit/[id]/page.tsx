import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserForm from "@/components/users/UserForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENGELIGAS & ENQUÍMICA | Perfil",
  description:
    "A ENGELIGAS & ENQUÍMICA atua desde 2012 oferecendo soluções em Bronze, Cobre, Latão e Alumínio, com excelência, qualidade, tecnologia e compromisso no segmento de metais não ferrosos.",
};

export default async function EditUserPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } = await params;

  return (
    <div>
      <PageBreadcrumb
        pageTitle="Editar usuário"
        backTitle="Usuários"
        to="/users"
      />

      <UserForm
        isEditing
        userId={id}
      />
    </div>
  );
}