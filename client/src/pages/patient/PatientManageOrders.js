import PatientDashboard from "./PatientDashboard";
import PatientViewOrders from "../../components/ViewComponents/PatientViewOrders";

const PatientManageOrders = () => {
    return (
        <>
            <PatientDashboard title="Manage Your Orders" />
            <PatientViewOrders />
        </>
    );
}

export default PatientManageOrders;