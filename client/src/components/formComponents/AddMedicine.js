import {
    Select,
    MenuItem,
    CircularProgress,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    Alert,
    Typography,
    Snackbar,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormControl,
    Button,
    Container,
    Paper,
    TextField,
    IconButton
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AddMedicine = (props) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [file, setFile] = useState();

    const onSubmit = (data) => {
        setLoadingAdd(true);
        if (file) {
            const imageName = file.name;
            console.log(imageName);

            // Include imageName in the data sent to the server
            data.image = imageName;
        }

        const dataToServer = { ...data };
        dataToServer["sales"] = 0;
        dataToServer["details"] = {
            description: data["description"],
            activeIngredients: data["activeIngredients"].split(",").map((item) => item.trim())
        };
        delete dataToServer.description;
        delete dataToServer.activeIngredients;
        axios
            .post("http://localhost:8000/medicines", dataToServer)
            .then((response) => {
                setSuccessMessage("Medicine added succesfully");
                setSuccessOpen(true);
                setErrorOpen(false);
                props.setDataIsUpdated(false);
                setLoadingAdd(false);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.data.code === 11000) {
                    setErrorMessage("This medicine name already exists. Please use another name.");
                } else {
                    setErrorMessage(error.response.data.message || "Unknown error");
                }
                setErrorOpen(true);
                setSuccessOpen(false);
                setLoadingAdd(false);
            });
    };

    const handleChange = (event) => {
        if (errors[event.target.name]) {
            setError(event.target.name, {
                type: errors[event.target.name]["type"],
                message: errors[event.target.name]["type"]
            });
        }
    };

    const handleErrorClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setErrorOpen(false);
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessOpen(false);
    };

    const handleImageUpload = (e) => {
        const formData = new FormData();
        formData.append("file", file);
        axios
            .post("http://localhost:8000/upload", formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1
    });

    return (
        <Container maxWidth="lg" sx={{ mt: "50px" }}>
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
            <Accordion sx={{ px: "20px", pt: "20px", pb: "0" }} elevation={3}>
                <AccordionSummary>
                    <Container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            {" "}
                            Add a Medicine to the System
                        </Typography>
                        <AddCircleIcon color="primary" sx={{ mb: 2, fontSize: 40 }} />
                    </Container>
                </AccordionSummary>
                <AccordionDetails>
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
                            <Grid item xs={12} sm={4}>
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
                                <FormControl fullWidth>
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
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="overTheCounter">Over the Counter</InputLabel>
                                    <Select
                                        {...register("overTheCounter", { required: true, maxLength: 80 })}
                                        error={!!errors["overTheCounter"]}
                                        helperText={errors["overTheCounter"]?.message}
                                        onBlur={handleChange}
                                        type="text"
                                        fullWidth
                                        required
                                        sx={{ textAlign: "left" }}
                                        labelId="overTheCounter-label"
                                        id="overTheCounter-select"
                                        label="Over the Counter"
                                    >
                                        <MenuItem value="true">Yes</MenuItem>
                                        <MenuItem value="false">No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
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

                            {/*
                            <Grid item xs={12} sm={3}>
                            <input type="file" onChange={e => setFile(e.target.files[0])} />
                                <Button component="label" variant="outlined" startIcon={<UploadIcon />} fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
                                    Upload Image
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </Grid> */}

                            {/* <Grid item xs={12} sm={3}>
                                <Button component="label" variant="outlined" startIcon={<UploadIcon />} fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
                                    Upload Image
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </Grid> */}

                            <input type="hidden" {...register("imageName")} />
                            <Grid item xs={12} sm={3}>
                                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                                <Button type="button" onClick={handleImageUpload}>
                                    Upload Medicine Image
                                </Button>
                            </Grid>

                            {/* <Grid item xs={12} sm={3}>
                            <input
                                type="file"
                                onChange={e => setFile(e.target.files[0])}
                                style={{ display: 'none' }}
                                id="fileInput" // Provide an ID for associating with the label
                            />
                            <label htmlFor="fileInput">
                                <button type = "button" onClick={handleImageUpload}>Upload</button>
                            </label>
                            </Grid> */}
                            <Grid item xs={12} sm={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    fullWidth
                                    sx={{ p: 1.8, fontWeight: "bold" }}
                                >
                                    Add Medicine
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </AccordionDetails>
            </Accordion>
            {loadingAdd && (
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
                        zIndex: 9999
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <CircularProgress sx={{ color: "white" }} />
                </div>
            )}
        </Container>
    );
};

export default AddMedicine;
