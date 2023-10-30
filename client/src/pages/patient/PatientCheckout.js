import { useState } from "react";
import PatientDashboard from "./PatientDashboard";
import PatientViewCartSummary from "../../components/ViewComponents/PatientViewCartSummary"
import PatientViewAddresses from "../../components/ViewComponents/PatientViewAddresses";
import PatientPay from "../../components/ViewComponents/PatientPay";

const PatientCheckout = () => {
    const [address, setAddress] = useState([]);

    return (
        <>
            <PatientDashboard title="Checkout" />
            <PatientViewCartSummary address={address} />
            <PatientViewAddresses setAddress={setAddress} address={address} />
            <PatientPay />
        </>
    );
}

export default PatientCheckout;