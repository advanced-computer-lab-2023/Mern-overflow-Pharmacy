import { Box, Typography, FormControl, Button, Container, Paper, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

const EditMedicine = () => {
    let { id } = useParams();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [name, setName] = useState("");
    const [medicinalUse, setMedicinalUse] = useState("");
    const [details, setDetails] = useState("");
    const [price, setPrice] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState("");
    const [sales, setSales] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('started fetching');
                const response = await axios.get(`http://localhost:8000/medicines/viewAll`);
                const medicine = response.data.find(item => item._id === id);
                // setName(medicine.name);
                // setMedicinalUse(medicine.medicinalUse);
                setDetails(medicine.details);
                setPrice(medicine.price);
                // setAvailableQuantity(medicine.availableQuantity);
                // setSales(medicine.sales);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = data => {
        const dataToServer = { name, medicinalUse, details, price, availableQuantity, sales };
        axios.put(`http://localhost:8000/medicines/${id}`, dataToServer)
            .then((response) => {
                console.log('PUT request successful', response);
            })
            .catch((error) => {
                console.error('Error making PUT request', error);
            });
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                <Typography variant="h6" sx={{ mb: 4 }}> Update Medicine </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        sx={{ mb: 3 }}
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        type="text"
                        label="Name"
                        fullWidth
                        disabled
                        autoFocus
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        value={medicinalUse}
                        onChange={(e) => { setMedicinalUse(e.target.value) }}
                        type="text"
                        label="Medicinal Use"
                        disabled
                        fullWidth
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        value={details}
                        onChange={(e) => { setDetails(e.target.value) }}
                        type="text"
                        label="Active Ingredients"
                        required
                        fullWidth
                    />
                    <FormControl fullWidth >
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <OutlinedInput
                            sx={{ mb: 3 }}
                            fullWidth
                            required
                            inputProps={{ min: 1, max: 10000 }}
                            type="number"
                            id="price"
                            startAdornment={<InputAdornment position="start">EGP</InputAdornment>}
                            label="Price"
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                        />
                    </FormControl>
                    <TextField
                        sx={{ mb: 3 }}
                        id="availableQuantity"
                        label="Available Quantity"
                        type="number"
                        fullWidth
                        disabled
                        inputProps={{ min: 1 }}
                        value={availableQuantity}
                        onChange={(e) => { setAvailableQuantity(e.target.value) }}
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        id="sales"
                        label="Sales"
                        type="number"
                        fullWidth
                        disabled
                        value={sales}
                        onChange={(e) => { setSales(e.target.value) }}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mb: 3, p: 1.8, fontWeight: 'bold' }}>
                        Update Medicine
                    </Button>
                </Box>
            </Paper>
        </Container>

    );
}

export default EditMedicine;