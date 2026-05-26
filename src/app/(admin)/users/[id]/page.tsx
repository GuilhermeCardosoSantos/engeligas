import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import UserForm from "@/components/users/UserForm";

const mockUser = {
  id: 1,
  name: "Guilherme Cardoso",
  email: "gui@gmail.com",
  phone: "(11) 99999-9999",
  cpf: "000.000.000-00",
  role: "Administrador",
  status: "Ativo",
};

export default function UserDetailsPage() {
  return (
    <div>
        <PageBreadcrumb pageTitle={mockUser.name} to="/users" backTitle="Usuários"/>
        <UserForm
            defaultValues={mockUser}
            isEditing
        />
    </div>
  );
}