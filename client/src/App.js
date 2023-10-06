import './App.css';
import * as ReactDOM from "react-dom/client";
import ButtonAppBar from './components/ButtonAppBar';
import PatientRegister from './pages/PatientRegister';
import PharmacistRegister from './pages/PharmacistRegister';
import SignIn from './pages/SignIn';

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
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;