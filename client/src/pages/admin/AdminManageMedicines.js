import AdminViewMedicines from "../../components/ViewComponents/AdminViewMedicines";
import AdminDashboard from "./AdminDashboard";

const AdminManageMedicines = () => {
    return (
        <>
            <AdminDashboard title="View Available Medicines" />
            <AdminViewMedicines />
        </>
    );
};

export default AdminManageMedicines;
