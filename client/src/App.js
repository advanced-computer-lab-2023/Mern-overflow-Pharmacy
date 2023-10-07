import './App.css';
import * as ReactDOM from "react-dom/client";
import ButtonAppBar from './components/ButtonAppBar';
import PatientRegister from './pages/authentication/PatientRegister';
import PharmacistRegister from './pages/authentication/PharmacistRegister';
import SignIn from './pages/authentication/SignIn';
import AdminManageAdmins from './pages/admin/AdminManageAdmins';
import AdminManagePharmacists from './pages/admin/AdminManagePharmacists';
import AdminManagePatients from './pages/admin/AdminManagePatients'
import AdminManagePharmacistRequests from './pages/admin/AdminManagePharmacistRequests';
import AdminManageMedicines from './pages/admin/AdminManageMedicines';
import PharmacistManageMedicines from './pages/pharmacist/PharmacistManageMedicines';
import PharmacistEditMedicine from './pages/pharmacist/PharmacistEditMedicine'
import PatientManageMedicines from './pages/patient/PatientManageMedicines';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register/patient",
      element: <PatientRegister />,
    },
    {
      path: "/register/pharmacist",
      element: <PharmacistRegister />
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/admin/admins",
      element: <AdminManageAdmins />,
    },
    {
      path: "/admin/pharmacists",
      element: <AdminManagePharmacists />,
    },
    {
      path: "/admin/patients",
      element: <AdminManagePatients />,
    },
    {
      path: "/admin/pharmacist-requests",
      element: <AdminManagePharmacistRequests />,
    },
    {
      path: "/admin/medicines",
      element: <AdminManageMedicines />,
    },
    {
      path: "/pharmacist/medicines",
      element: <PharmacistManageMedicines />,
    },
    {
      path: "/pharmacist/medicines/1",
      element: <PharmacistEditMedicine />,
    },
    {
      path: "/patient/medicines",
      element: <PatientManageMedicines />,
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;