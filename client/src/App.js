import axios from "axios";
import "./App.css";
import NotFoundPage from "./NotFoundPage";
import AdminManageAdmins from "./pages/admin/AdminManageAdmins";
import AdminManageMedicines from "./pages/admin/AdminManageMedicines";
import AdminManagePatients from "./pages/admin/AdminManagePatients";
import AdminManagePharmacistRequests from "./pages/admin/AdminManagePharmacistRequests";
import AdminManagePharmacists from "./pages/admin/AdminManagePharmacists";
import ChangePassword from "./pages/authentication/ChangePassword";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import PatientRegister from "./pages/authentication/PatientRegister";
import PharmacistRegister from "./pages/authentication/PharmacistRegister";
import ResetPassword from "./pages/authentication/ResetPassword";
import SignIn from "./pages/authentication/SignIn";
import PatientCheckout from "./pages/patient/PatientCheckout";
import PatientManageCart from "./pages/patient/PatientManageCart";
import PatientManageMedicines from "./pages/patient/PatientManageMedicines";
import PatientManageOrders from "./pages/patient/PatientManageOrders";
import PharmacistEditMedicine from "./pages/pharmacist/PharmacistEditMedicine";
import PatientProfile from "./pages/patient/PatientProfile";
import PharmacistProfile from "./pages/pharmacist/PharmacistProfile";
import PharmacistManageMedicines from "./pages/pharmacist/PharmacistManageMedicines";
import AdminViewSalesReports from "./pages/admin/AdminViewSalesReport";
import PharmacistViewSalesReports from "./pages/pharmacist/PharmacistViewSalesReport";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chatpage from "./pages/Chatpage"

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
            path: "/admin/salesreport",
            element: <AdminViewSalesReports />,
        },
        {
            path: "/pharmacist/salesreport",
            element: <PharmacistViewSalesReports />,
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
        {
            path: "/chat",
            element: <Chatpage />
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
