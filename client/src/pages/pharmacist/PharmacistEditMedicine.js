import PharmacistDashboard from "./PharmacistDashboard";
import EditMedicine from "../../components/formComponents/EditMedicine";

const PharmacistManageMedicines = () => {
    return (
        <>
            <PharmacistDashboard title="Manage Available Medicines" />
            <EditMedicine />
        </>
    );
}

export default PharmacistManageMedicines;