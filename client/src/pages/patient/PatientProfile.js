import PatientDashboard from "./PatientDashboard";
import PatientInfo from "../../components/ViewComponents/PatientInfo";

const PatientProfile = () => {
    return (
        <>
            <PatientDashboard title="My Profile" />
            <PatientInfo />
        </>
    );
};

export default PatientProfile;
