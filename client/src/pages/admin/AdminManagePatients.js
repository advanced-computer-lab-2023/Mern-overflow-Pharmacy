import AdminDashboard from "./AdminDashboard";
import { Box, Typography, Button, Container, Paper, TextField } from "@mui/material";

const AdminManagePatients = () => {
    return (
        <>
            <AdminDashboard title="Manage System Patients" />
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                    <Typography variant="h6" sx={{ mb: 4 }}> Remove a Patient from the System </Typography>
                    <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField sx={{ mr: "2%" }} label="Username" fullWidth />
                        <Button type="submit" variant="outlined" fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
                            Remove Patient
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default AdminManagePatients;