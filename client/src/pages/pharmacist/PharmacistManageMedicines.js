import PharmacistDashboard from "./PharmacistDashboard";
import PharmacistViewMedicines from "../../components/ViewComponents/PharmacistViewMedicines";
import AddMedicine from "../../components/formComponents/AddMedicine";
import { useState } from "react";

const PharmacistManageMedicines = () => {
    const [dataIsUpdated, setDataIsUpdated] = useState(true);

    return (
        <>
            <PharmacistDashboard title="Manage Available Medicines" />
            <AddMedicine setDataIsUpdated= {setDataIsUpdated} />
            <PharmacistViewMedicines  dataIsUpdated= {dataIsUpdated} setDataIsUpdated={setDataIsUpdated} />
        </>
    );
}

export default PharmacistManageMedicines;