import AdminViewRequests from "../../components/ViewComponents/AdminViewRequests";
import AdminDashboard from "./AdminDashboard";

const AdminManagePharmacistRequests = () => {
    return (
        <>
            <AdminDashboard title="Manage Pharmacists Registration Requests" />
            <AdminViewRequests />
        </>
    );
}

export default AdminManagePharmacistRequests;