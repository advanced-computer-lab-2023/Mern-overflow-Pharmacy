import React, { useState } from "react";
import {
    Paper,
    CssBaseline,
    TextField,
    Grid,
    Snackbar,
    Alert,
    Button,
    Box,
    Container,
    FormControl,
    Typography,
    Divider,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Avatar,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import sha256 from "js-sha256";
import logo from "../../assets/gifs/logo.gif";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useUser } from "../../userContest";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function PatientRegister() {
    const navigate = useNavigate();
    const { userId, setUserId, userRole, setUserRole } = useUser();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        control
    } = useForm();
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = (data) => {
        const dataToServer = { ...data };

        if (dataToServer.mobileNumber.toString().length < 8 || dataToServer.mobileNumber.toString().length > 16) {
            setErrorMessage("Your mobile number must be between 8 and 16 digits.");
            setErrorOpen(true);
            setSuccessOpen(false);
            setError("mobileNumber", {
                message: "Must be between 8 and 16 digits"
            });
        } else if (
            dataToServer.EmergencyPhone.toString().length < 8 ||
            dataToServer.EmergencyPhone.toString().length > 16
        ) {
            setErrorMessage("Your emergency contact's mobile number must be between 8 and 16 digits.");
            setErrorOpen(true);
            setSuccessOpen(false);
            setError("EmergencyPhone", {
                message: "Must be between 8 and 16 digits"
            });
        } else {
            dataToServer["passwordHash"] = sha256(data["password"]);
            dataToServer["emergencyContact"] = {
                name: data["EmergencyName"],
                mobileNumber: data["EmergencyPhone"],
                relation: data["relation"]
            };
            delete dataToServer.EmergencyName;
            delete dataToServer.EmergencyPhone;
            delete dataToServer.relation;
            delete dataToServer.password;
            delete dataToServer.Password;

            console.log("Data to server" + JSON.stringify(dataToServer));
            axios
                .post("http://localhost:8000/patients", dataToServer)
                .then((response) => {
                    console.log("POST request successful", response);
                    const userId = response.data._id;
                    setUserId(userId);
                    setUserRole("Patient");
                    axios
                        .post("http://localhost:8000/auth/login", {
                            username: dataToServer.username,
                            passwordHash: dataToServer.passwordHash
                        })
                        .then(() => {
                            navigate("/patient/medicines");
                        });
                })
                .catch((error) => {
                    console.error("Error making POST request", error);
                    alert("Error making POST request: " + error.message);
                });
        }
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

    return (
        <ThemeProvider theme={defaultTheme}>
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
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{ backgroundSize: "cover", backgroundColor: "#132629", backgroundPosition: "center" }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: "white",
                            position: "fixed",
                            top: "15%",
                            left: "20%"
                        }}
                    >
                        El7a2ny Pharmacy
                    </Typography>
                    <img
                        src={logo}
                        alt=""
                        style={{
                            height: "50%",
                            position: "fixed",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Avatar sx={{ m: 0, bgcolor: "secondary.main", width: 40, height: 40 }}>
                            <ContactPageIcon sx={{ width: 30, height: 30 }} />
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
                            {" "}
                            Patient Registration{" "}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container md={12} spacing={2} sx={{ mt: 3 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        id="name"
                                        label="Name"
                                        {...register("name", { required: true, maxLength: 80 })}
                                        error={!!errors["name"]}
                                        helperText={errors["name"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker"]}>
                                            <Controller
                                                control={control}
                                                name="dateOfBirth"
                                                render={({ field }) => (
                                                    <DatePicker
                                                        sx={{ width: "100%" }}
                                                        openTo="year"
                                                        views={["year", "month", "day"]}
                                                        mask="____-__-__"
                                                        format="DD-MM-YYYY"
                                                        label="Date of Birth"
                                                        inputFormat="DD-MM-YYYY"
                                                        value={field.value || null}
                                                        onChange={(date) => field.onChange(date)}
                                                    >
                                                        {({ inputProps, inputRef }) => (
                                                            <TextField
                                                                {...inputProps}
                                                                sx={{ width: "100%" }}
                                                                error={!!errors["dateOfBirth"]}
                                                                helperText={errors["dateOfBirth"]?.message}
                                                                inputRef={inputRef}
                                                            />
                                                        )}
                                                    </DatePicker>
                                                )}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="mobileNumber"
                                        label="Mobile Number"
                                        type="number"
                                        {...register("mobileNumber", { required: true })}
                                        error={!!errors["mobileNumber"]}
                                        helperText={errors["mobileNumber"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        id="username"
                                        type="text"
                                        label="Username"
                                        {...register("username", { required: true, maxLength: 80 })}
                                        error={!!errors["username"]}
                                        helperText={errors["username"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        {...register("email", { required: true, maxLength: 80 })}
                                        error={!!errors["email"]}
                                        helperText={errors["email"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        {...register("password", { required: true, maxLength: 80 })}
                                        error={!!errors["password"]}
                                        helperText={errors["password"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl sx={{ mt: 2 }}>
                                        <FormLabel id="gender-label">Gender</FormLabel>
                                        <Controller
                                            control={control}
                                            name="gender"
                                            defaultValue="male"
                                            render={({ field }) => (
                                                <RadioGroup row {...field}>
                                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                    <FormControlLabel
                                                        value="female"
                                                        control={<Radio />}
                                                        label="Female"
                                                    />
                                                </RadioGroup>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Divider
                                    sx={{
                                        width: "60%",
                                        borderWidth: "1px",
                                        mx: "auto",
                                        my: 5,
                                        borderColor: "#ccc",
                                        filter: "blur(1px)"
                                    }}
                                />
                                <Typography
                                    sx={{ align: "center", width: "100%", mb: 2, fontWeight: "bold" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Emergency Contact{" "}
                                </Typography>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="emergencyName"
                                        label="Name"
                                        {...register("EmergencyName", { required: true, maxLength: 80 })}
                                        error={!!errors["EmergencyName"]}
                                        helperText={errors["EmergencyName"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="emergencyMobileNumber"
                                        label="Mobile Number"
                                        type="number"
                                        {...register("EmergencyPhone", { required: true })}
                                        error={!!errors["EmergencyPhone"]}
                                        helperText={errors["EmergencyPhone"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="relation">Relation</InputLabel>
                                        <Select
                                            {...register("relation", { required: true, maxLength: 80 })}
                                            error={!!errors["relation"]}
                                            helperText={errors["relation"]?.message}
                                            onBlur={handleChange}
                                            type="number"
                                            fullWidth
                                            required
                                            sx={{ textAlign: "left" }}
                                            labelId="relation-label"
                                            id="relation-select"
                                            label="Relation"
                                        >
                                            <MenuItem value="husband">Husband</MenuItem>
                                            <MenuItem value="wife">Wife</MenuItem>
                                            <MenuItem value="child">Child</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, p: 2, fontWeight: "bold" }}
                            >
                                Submit
                            </Button>
                        </Box>
                        <Typography
                            sx={{ align: "center", width: "100%", mt: 5, mb: 2, fontWeight: "bold", color: "#555" }}
                            variant="h6"
                        >
                            {" "}
                            OR{" "}
                        </Typography>
                        <Button
                            fullWidth
                            type="submit"
                            variant="outlined"
                            sx={{ mt: 3, mb: 2, p: 2, fontWeight: "bold" }}
                            component={Link}
                            to="/signin"
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            type="submit"
                            variant="outlined"
                            sx={{ mt: 3, mb: 2, p: 2, fontWeight: "bold" }}
                            component={Link}
                            to="/register/pharmacist"
                        >
                            Pharmacist Registration
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
