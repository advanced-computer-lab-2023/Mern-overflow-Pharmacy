import { Box, Grid, Typography, FormControl, Button, Container, Paper, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import sha256 from 'js-sha256';
import { useForm } from "react-hook-form"

const AddMedicine = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = data => {
        const dataToServer = { ...data };
        dataToServer["sales"] = 0;
        axios.post('http://localhost:8000/medicines', dataToServer)
            .then((response) => {
                console.log('POST request successful', response);
            })
            .catch((error) => {
                console.error('Error making POST request', error);
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

    return (
        < Container maxWidth="lg" >
            <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
                <Typography variant="h6" sx={{ mb: 4 }}> Add a Medicine to the System </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="name"
                                label="Name"
                                {...register("name", { required: true, maxLength: 80 })}
                                error={!!errors["name"]}
                                helperText={errors["name"]?.message}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="medicinalUse"
                                label="Medicinal Use"
                                {...register("medicinalUse", { required: true, maxLength: 80 })}
                                error={!!errors["medicinalUse"]}
                                helperText={errors["medicinalUse"]?.message}
                                type="text"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="details"
                                label="Active Ingredients"
                                {...register("details", { required: true, maxLength: 80 })}
                                error={!!errors["details"]}
                                helperText={errors["details"]?.message}
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
                                    {...register("price", { required: true, maxLength: 80 })}
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
                                {...register("availableQuantity", { required: true, maxLength: 80 })}
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