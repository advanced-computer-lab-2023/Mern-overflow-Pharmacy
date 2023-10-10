import PharmacistDashboard from "./PharmacistDashboard";

import AddMedicine from "../../components/formComponents/AddMedicine";

const PharmacistManageMedicines = () => {
    return (
        <>
            <PharmacistDashboard title="Manage Available Medicines" />
            <AddMedicine />
        </>
    );
}

export default PharmacistManageMedicines;