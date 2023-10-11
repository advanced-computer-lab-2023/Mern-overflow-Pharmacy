import PatientViewMedicines from "../../components/ViewComponents/PatientViewMedicines";
import PatientDashboard from "./PatientDashboard";

const PatientManageMedicines = () => {
    return (
        <>
            <PatientDashboard title="View Available Medicines" />
            <PatientViewMedicines />
        </>
    );
}

export default PatientManageMedicines;