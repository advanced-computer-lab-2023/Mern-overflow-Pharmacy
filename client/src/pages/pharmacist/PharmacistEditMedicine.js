import PharmacistDashboard from "./PharmacistDashboard";
import { Box, Typography, FormControl, Button, Container, Paper, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import EditMedicine from "../../components/formComponents/EditMedicine";

const PharmacistManageMedicines = () => {
    return (
        <>
            <PharmacistDashboard title="Manage Available Medicines" />
            <EditMedicine />
        </>
    );
}

export default PharmacistManageMedicines;