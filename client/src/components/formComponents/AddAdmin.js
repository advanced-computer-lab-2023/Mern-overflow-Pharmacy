import {
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
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
    TextField
} from "@mui/material";
import axios from "axios";
import sha256 from "js-sha256";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddAdmin = (props) => {
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

  const onSubmit = data => {
    setLoadingAdd(true);
    const dataToServer = { ...data };
    dataToServer["passwordHash"] = sha256(data["password"]);
    delete dataToServer.password
    axios.post('http://localhost:8001/adminstrators', dataToServer)
      .then((response) => {
        setSuccessMessage('Admin created succesfully');
        setSuccessOpen(true);
        setErrorOpen(false);
        props.setDataIsUpdated(false);
        setLoadingAdd(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('This username is already taken. Please choose another one.');
        setErrorOpen(true);
        setSuccessOpen(false);
        setLoadingAdd(false);
      });
  }

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
                            Add an Admin to the System
                        </Typography>
                        <AddCircleIcon color="primary" sx={{ mb: 2, fontSize: 40 }} />
                    </Container>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        component="form"
                        sx={{ display: "flex", alignItems: "center" }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            id="username"
                            label="Username"
                            {...register("username", { required: true, maxLength: 80 })}
                            error={!!errors["username"]}
                            helperText={errors["username"]?.message}
                            onBlur={handleChange}
                            sx={{ mr: "2%" }}
                            fullWidth
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            {...register("email", { required: true, maxLength: 80 })}
                            error={!!errors["email"]}
                            helperText={errors["email"]?.message}
                            onBlur={handleChange}
                            sx={{ mr: "2%" }}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Password"
                            {...register("password", { required: true, maxLength: 80 })}
                            error={!!errors["password"]}
                            helperText={errors["password"]?.message}
                            onBlur={handleChange}
                            sx={{ mr: "2%" }}
                            type="password"
                            fullWidth
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ p: 1.8, fontWeight: "bold" }}>
                            Add Admin
                        </Button>
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

export default AddAdmin;
