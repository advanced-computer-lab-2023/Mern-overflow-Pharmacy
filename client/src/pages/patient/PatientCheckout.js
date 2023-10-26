import PatientDashboard from "./PatientDashboard";
import PatientViewCartSummary from "../../components/ViewComponents/PatientViewCartSummary"
import PatientViewAddresses from "../../components/ViewComponents/PatientViewAddresses";
import PatientPay from "../../components/ViewComponents/PatientPay";

const PatientCheckout = () => {
    return (
        <>
            <PatientDashboard title="Checkout" />
            <PatientViewCartSummary />
            <PatientViewAddresses />
            <PatientPay />
        </>
    );
}

export default PatientCheckout;