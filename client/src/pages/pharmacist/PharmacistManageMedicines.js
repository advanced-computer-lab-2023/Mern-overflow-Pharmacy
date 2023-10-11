import PharmacistDashboard from "./PharmacistDashboard";
import PharmacistViewMedicines from "../../components/ViewComponents/PharmacistViewMedicines";
import AddMedicine from "../../components/formComponents/AddMedicine";

const PharmacistManageMedicines = () => {
    return (
        <>
            <PharmacistDashboard title="Manage Available Medicines" />
            <AddMedicine />
            <PharmacistViewMedicines />
        </>
    );
}

export default PharmacistManageMedicines;