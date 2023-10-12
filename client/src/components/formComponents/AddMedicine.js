import { Box, Grid, Alert, Typography, Snackbar, InputAdornment, OutlinedInput, InputLabel, FormControl, Button, Container, Paper, TextField } from "@mui/material";
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState } from "react";

const AddMedicine = (props) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = data => {
        const dataToServer = { ...data };
        dataToServer["sales"] = 0;
        dataToServer["details"] = { description: data["description"], activeIngredients: data["activeIngredients"].split(',').map(item => item.trim()) }
        delete dataToServer.description
        delete dataToServer.activeIngredients
        axios.post('http://localhost:8000/medicines', dataToServer)
            .then((response) => {
                console.log('POST request successful', response);
                setSuccessMessage('Medicine added succesfully');
                setSuccessOpen(true);
                setErrorOpen(false);
                props.setDataIsUpdated(false);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.data.code === 11000) {
                    setErrorMessage('This medicine name already exists. Please use another name.');
                } else {
                    setErrorMessage(error.response.data.message || 'Unknown error');
                }
                setErrorOpen(true);
                setSuccessOpen(false);
            });
    }

    const handleChange = (event) => {
        if (errors[event.target.name]) {
            setError(event.target.name,
                {
                    type: errors[event.target.name]["type"],
                    message: errors[event.target.name]["type"]
                })
        }
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
        <Container maxWidth="lg" >
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
            <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                <Typography variant="h6" sx={{ mb: 4 }}> Add a Medicine to the System </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="name"
                                label="Name"
                                {...register("name", { required: true })}
                                error={!!errors["name"]}
                                helperText={errors["name"]?.message}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="description"
                                label="Description"
                                {...register("description", { required: true })}
                                error={!!errors["description"]}
                                helperText={errors["description"]?.message}
                                type="text"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="medicinalUse"
                                label="Medicinal Use"
                                {...register("medicinalUse", { required: true })}
                                error={!!errors["medicinalUse"]}
                                helperText={errors["medicinalUse"]?.message}
                                type="text"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="activeIngredients"
                                label="Active Ingredients (Separate by comma)"
                                {...register("activeIngredients", { required: true })}
                                error={!!errors["activeIngredients"]}
                                helperText={errors["activeIngredients"]?.message}
                                type="text"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="price">Price</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    inputProps={{ min: 1, max: 10000 }}
                                    type="number"
                                    id="price"
                                    startAdornment={<InputAdornment position="start">EGP</InputAdornment>}
                                    label="Price"
                                    {...register("price", { required: true })}
                                    error={!!errors["price"]}
                                    helperText={errors["price"]?.message}
                                    onBlur={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="availableQuantity"
                                label="Available Quantity"
                                {...register("availableQuantity", { required: true })}
                                error={!!errors["availableQuantity"]}
                                helperText={errors["availableQuantity"]?.message}
                                type="number"
                                fullWidth
                                required
                                inputProps={{ min: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button type="submit" variant="outlined" fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
                                Add Medicine
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container >
    );
}

export default AddMedicine;