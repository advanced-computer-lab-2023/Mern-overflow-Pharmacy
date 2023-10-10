import AddAdmin from "../../components/formComponents/AddAdmin";
import AdminDashboard from "./AdminDashboard";
import { Box, Typography, Button, Container, Paper, TextField } from "@mui/material";

const AdminManageAdmins = () => {
    return (
        <>
            <AdminDashboard title="Manage System Admins" />
            <AddAdmin />
        </>
    );
}

export default AdminManageAdmins;