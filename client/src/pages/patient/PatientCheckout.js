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
    const [meds, setMeds] = useState([]);
    const [total, setTotal] = useState(0);
    
    return (
        <>
            <PatientDashboard title="Checkout" />
            <PatientViewAddresses setAddress={setAddress} address={address} />
            <PatientPay setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} 
            successOpen = {successOpen} setSuccessOpen = {setSuccessOpen}
            successMessage = {successMessage} setSuccessMessage = {setSuccessMessage}
            errorOpen = {errorOpen} setErrorOpen = {setErrorOpen}
            errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}
            address = {address} setAddress = {setAddress}
            meds = {meds} setMeds = {setMeds}
            total = {total} setTotal = {setTotal}
            
            />
            <PatientViewCartSummary address={address} paymentMethod={paymentMethod} 
                        successOpen = {successOpen} setSuccessOpen = {setSuccessOpen}
                        successMessage = {successMessage} setSuccessMessage = {setSuccessMessage}
                        errorOpen = {errorOpen} setErrorOpen = {setErrorOpen}
                        errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}
                        meds = {meds} setMeds = {setMeds}
                        total = {total} setTotal = {setTotal}
            />
        </>
    );
}

export default PatientCheckout;