import PatientDashboard from "./PatientDashboard";
import PatientViewCart from "../../components/ViewComponents/PatientViewCart";

const PatientManageCart = () => {
    return (
        <>
            <PatientDashboard title="Manage Your Cart" />
            <PatientViewCart />
        </>
    );
};

export default PatientManageCart;
