import PharmacistDashboard from "./PharmacistDashboard";
import { Box, Typography, FormControl, Button, Container, Paper, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const PharmacistManageMedicines = () => {
    return (
        <>
            <PharmacistDashboard title="Manage Available Medicines" />
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                    <Typography variant="h6" sx={{ mb: 4 }}> Add a New Medicine to the System </Typography>
                    <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField sx={{ mr: "2%" }} label="Active Ingredients" fullWidth />
                        <FormControl sx={{ mr: "2%" }} fullWidth >
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
                        <TextField sx={{ mr: "2%" }} label="Available Quantity" type="number" fullWidth />
                        <Button type="submit" variant="outlined" fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
                            Add Medicine
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default PharmacistManageMedicines;