import AdminViewPharmacists from "../../components/ViewComponents/AdminViewPharmacists";
import AdminDashboard from "./AdminDashboard";

const AdminManagePharmacists = () => {
    return (
        <>
            <AdminDashboard title="Manage System Pharmacists" />
            <AdminViewPharmacists />
        </>
    );
}

export default AdminManagePharmacists;