import "./App.css";
import * as ReactDOM from "react-dom/client";
import ButtonAppBar from "./components/ButtonAppBar";
import axios from "axios";
import PatientRegister from "./pages/authentication/PatientRegister";
import PharmacistRegister from "./pages/authentication/PharmacistRegister";
import SignIn from "./pages/authentication/SignIn";
import AdminManageAdmins from "./pages/admin/AdminManageAdmins";
import AdminManagePharmacists from "./pages/admin/AdminManagePharmacists";
import AdminManagePatients from "./pages/admin/AdminManagePatients";
import AdminManagePharmacistRequests from "./pages/admin/AdminManagePharmacistRequests";
import AdminManageMedicines from "./pages/admin/AdminManageMedicines";
import PharmacistManageMedicines from "./pages/pharmacist/PharmacistManageMedicines";
import PharmacistEditMedicine from "./pages/pharmacist/PharmacistEditMedicine";
import PatientManageMedicines from "./pages/patient/PatientManageMedicines";
import PatientManageCart from "./pages/patient/PatientManageCart";
import PatientManageOrders from "./pages/patient/PatientManageOrders";
import PatientCheckout from "./pages/patient/PatientCheckout";
import PatientProfile from "./pages/patient/PatientProfile";
import PharmacistProfile from "./pages/pharmacist/PharmacistProfile";
import NotFoundPage from "./NotFoundPage";
import ChangePassword from "./pages/authentication/ChangePassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import ForgotPassword from "./pages/authentication/ForgotPassword";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
    axios.defaults.withCredentials = true;

    const router = createBrowserRouter([
        {
            path: "/signin",
            element: <SignIn />
        },
        {
            path: "/",
            element: <SignIn />
        },
        {
            path: "/register/patient",
            element: <PatientRegister />
        },
        {
            path: "/register/pharmacist",
            element: <PharmacistRegister />
        },
        {
            path: "/admin/admins",
            element: <AdminManageAdmins />
        },
        {
            path: "/admin/pharmacists",
            element: <AdminManagePharmacists />
        },
        {
            path: "/admin/patients",
            element: <AdminManagePatients />
        },
        {
            path: "/admin/pharmacist-requests",
            element: <AdminManagePharmacistRequests />
        },
        {
            path: "/admin/medicines",
            element: <AdminManageMedicines />
        },
        {
            path: "/pharmacist/medicines",
            element: <PharmacistManageMedicines />
        },
        {
            path: "/pharmacist/medicines/:id",
            element: <PharmacistEditMedicine />
        },
        {
            path: "/patient/medicines",
            element: <PatientManageMedicines />
        },
        {
            path: "/patient/cart",
            element: <PatientManageCart />
        },
        {
            path: "/patient/orders",
            element: <PatientManageOrders />
        },
        {
            path: "/patient/checkout",
            element: <PatientCheckout />
        },
        {
            path: "/patient/profile",
            element: <PatientProfile />
        },
        {
            path: "/pharmacist/profile",
            element: <PharmacistProfile />
        },
        {
            path: "/auth/changepassword",
            element: <ChangePassword />
        },
        {
            path: "/auth/resetpassword",
            element: <ResetPassword />
        },
        {
            path: "/auth/forgotpassword",
            element: <ForgotPassword />
        },

        { path: "*", element: <NotFoundPage /> }
    ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
