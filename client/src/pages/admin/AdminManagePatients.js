import AdminViewPatients from "../../components/ViewComponents/AdminViewPatients";
import AdminDashboard from "./AdminDashboard";

const AdminManagePatients = () => {
    return (
        <>
            <AdminDashboard title="Manage System Patients" />
            <AdminViewPatients />
        </>
    );
};

export default AdminManagePatients;
