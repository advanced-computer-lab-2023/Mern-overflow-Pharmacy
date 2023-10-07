import PharmacistDashboard from "./PharmacistDashboard";
import { Box, Typography, FormControl, Button, Container, Paper, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';

const PharmacistManageMedicines = () => {
    return (
        <>
            <PharmacistDashboard title="Manage Available Medicines" />
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                    <Typography variant="h6" sx={{ mb: 4 }}> Update Medicine </Typography>
                    <Box component="form">
                        <TextField sx={{ mb: 3 }} label="Active Ingredients" fullWidth />
                        <FormControl sx={{ mb: 3 }} fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
                                fullWidth
                                inputProps={{ max: 10000 }}
                                type="number"
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">EGP</InputAdornment>}
                                label="Price"
                            />
                        </FormControl>
                        <TextField sx={{ mb: 3 }} label="Available Quantity" type="number" fullWidth />
                        <Button type="submit" variant="contained" fullWidth sx={{ mb: 3, p: 1.8, fontWeight: 'bold' }}
                            component={Link}
                            to="/pharmacist/medicines">
                            Update Medicine
                        </Button>
                        <Button type="submit" variant="outlined" fullWidth sx={{ mb: 3, p: 1.8, fontWeight: 'bold' }}
                            component={Link}
                            to="/pharmacist/medicines">
                            Cancel
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default PharmacistManageMedicines;