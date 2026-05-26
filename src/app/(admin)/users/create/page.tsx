import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import UserForm from "@/components/users/UserForm";

export default function CreateUserPage() {
  return (
    <div>
        <PageBreadcrumb pageTitle="Cadastrar usúario" backTitle="Usuários" to="/users" />
        <UserForm />
    </div>
  );
}