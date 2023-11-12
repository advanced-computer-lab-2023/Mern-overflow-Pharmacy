import { useState } from "react";
import PatientDashboard from "./PatientDashboard";
import PatientViewCartSummary from "../../components/ViewComponents/PatientViewCartSummary"
import PatientViewAddresses from "../../components/ViewComponents/PatientViewAddresses";
import PatientPay from "../../components/ViewComponents/PatientPay";

const PatientCheckout = () => {
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    
    return (
        <>
            <PatientDashboard title="Checkout" />
            <PatientViewAddresses setAddress={setAddress} address={address} />
            <PatientPay setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} />
            <PatientViewCartSummary address={address} paymentMethod={paymentMethod} />
        </>
    );
}

export default PatientCheckout;