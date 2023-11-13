import { useState } from "react";
import PatientDashboard from "./PatientDashboard";
import PatientViewCartSummary from "../../components/ViewComponents/PatientViewCartSummary"
import PatientViewAddresses from "../../components/ViewComponents/PatientViewAddresses";
import PatientPay from "../../components/ViewComponents/PatientPay";

const PatientCheckout = () => {
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    return (
        <>
            <PatientDashboard title="Checkout" />
            <PatientViewAddresses setAddress={setAddress} address={address} />
            <PatientPay setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} 
            successOpen = {successOpen} setSuccessOpen = {setSuccessOpen}
            successMessage = {successMessage} setSuccessMessage = {setSuccessMessage}
            errorOpen = {errorOpen} setErrorOpen = {setErrorOpen}
            errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}
            
            />
            <PatientViewCartSummary address={address} paymentMethod={paymentMethod} 
                        successOpen = {successOpen} setSuccessOpen = {setSuccessOpen}
                        successMessage = {successMessage} setSuccessMessage = {setSuccessMessage}
                        errorOpen = {errorOpen} setErrorOpen = {setErrorOpen}
                        errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}
            />
        </>
    );
}

export default PatientCheckout;