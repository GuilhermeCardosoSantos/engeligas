import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import User from "@/components/users/Users"

export default function Users() {
    return(
        <div> 
            <PageBreadcrumb pageTitle="Consultar usuários"  />
            <User/>
        </div>
    )
}