import { useState } from "react";
import AdminViewAdmins from "../../components/ViewComponents/AdminViewAdmins";
import AddAdmin from "../../components/formComponents/AddAdmin";
import AdminDashboard from "./AdminDashboard";

const AdminManageAdmins = () => {
    const [dataIsUpdated, setDataIsUpdated] = useState(true);

    return (
        <>
            <AdminDashboard title="Manage System Admins" />
            <AddAdmin setDataIsUpdated= {setDataIsUpdated} />
            <AdminViewAdmins dataIsUpdated= {dataIsUpdated} setDataIsUpdated={setDataIsUpdated} />
        </>
    );
}

export default AdminManageAdmins;