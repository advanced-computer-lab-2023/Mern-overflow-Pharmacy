import AdminDashboard from "./AdminDashboard";
import { Box, Typography, Button, Container, Paper, TextField } from "@mui/material";

const AdminManageAdmins = () => {
    return (
        <>
            <AdminDashboard title="Manage System Admins" />
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                    <Typography variant="h6" sx={{ mb: 4}}> Add a New Admin to the System </Typography>
                    <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField sx={{ mr: "2%" }} label="Username" fullWidth />
                        <TextField sx={{ mr: "2%" }} label="Password" type="password" fullWidth />
                        <Button type="submit" variant="outlined" fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
                            Add Admin
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                    <Typography variant="h6" sx={{ mb: 4}}> Remove an Admin from the System </Typography>
                    <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField sx={{ mr: "2%" }} label="Username" fullWidth />
                        <Button type="submit" variant="outlined" fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
                            Remove Admin
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default AdminManageAdmins;