import { Grid, Select, MenuItem, CircularProgress, Box, Typography, Snackbar, Alert, FormControl, Button, Container, Paper, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const EditMedicine = () => {
    let { id } = useParams();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [medicinalUse, setMedicinalUse] = useState("");
    const [description, setDescription] = useState("");
    const [activeIngredients, setActiveIngredients] = useState("");
    const [price, setPrice] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState("");
    const [sales, setSales] = useState("");
    const [overTheCounter, setOverTheCounter] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loadingEdit, setLoadingEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('started fetching');
                const response = await axios.get(`http://localhost:8000/medicines/viewAll`);
                const medicine = response.data.find(item => item._id === id);
                setName(medicine.name);
                setMedicinalUse(medicine.medicinalUse);
                setDescription(medicine.details.description);
                setActiveIngredients(JSON.stringify(medicine.details.activeIngredients).replace(/[\[\]"\\"']/g, ''));
                setPrice(medicine.price);
                setAvailableQuantity(medicine.availableQuantity);
                setSales(medicine.sales);
                setOverTheCounter(medicine.overTheCounter)
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = data => {
        setLoadingEdit(true);
        const details = { activeIngredients: activeIngredients.split(',').map(item => item.trim()), description: description }
        const dataToServer = { name, medicinalUse, details, price, availableQuantity, sales };
        axios.put(`http://localhost:8000/medicines/${id}`, dataToServer)
            .then((response) => {
                console.log('PUT request successful', response);
                setSuccessMessage('Medicine updated succesfully');
                setSuccessOpen(true);
                setErrorOpen(false);
                setLoadingEdit(false);
            })
            .catch((error) => {
                console.error('Error making PUT request', error);
                setErrorMessage(error.response.data.message || 'Unknown error');
                setErrorOpen(true);
                setSuccessOpen(false);
                setLoadingEdit(false);
            });
    }

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Snackbar open={errorOpen} autoHideDuration={5000} onClose={handleErrorClose}>
                <Alert elevation={6} variant="filled" onClose={handleErrorClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
            {loading ? (
                <CircularProgress sx={{ mt: '30px' }} />
            ) : (
                <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                    <Typography variant="h6" sx={{ mb: 4 }}> Update Medicine </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            sx={{ mb: 3 }}
                            value={name}
                            type="text"
                            label="Name"
                            fullWidth
                            disabled
                            autoFocus
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            value={medicinalUse}
                            type="text"
                            label="Medicinal Use"
                            disabled
                            fullWidth
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            type="text"
                            label="Description"
                            required
                            fullWidth
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            value={activeIngredients}
                            onChange={(e) => { setActiveIngredients(e.target.value) }}
                            type="text"
                            label="Active Ingredients (Separate by commas)"
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
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            id="sales"
                            label="Sales"
                            type="number"
                            fullWidth
                            disabled
                            value={sales}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            id="overTheCounter"
                            label="Over The Counter"
                            type="text"
                            fullWidth
                            disabled
                            value={overTheCounter}
                            onChange={(e) => { setSales(e.target.value) }}
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mb: 3, p: 1.8, fontWeight: 'bold' }}>
                            Update Medicine
                        </Button>
                        <Button type="button" variant="outlined" fullWidth sx={{ mb: 3, p: 1.8, fontWeight: 'bold' }}
                            component={Link}
                            to="/pharmacist/medicines">
                            Return
                        </Button>
                    </Box>
                </Paper>
            )}
            {loadingEdit && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <CircularProgress color="primary" />
                </div>
            )}
        </Container>
    );
}

export default EditMedicine;