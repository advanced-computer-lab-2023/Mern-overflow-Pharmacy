import * as React from 'react';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Grid, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from "react-hook-form"
import Avatar from '@mui/material/Avatar';
import logo from '../assets/gifs/logo.gif';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const defaultTheme = createTheme();

export default function SignIn() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log("Data to server" + JSON.stringify(data));
    }
    console.log(errors);

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
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundSize: 'cover',
                        backgroundColor: '#d9d9d9',
                        backgroundPosition: 'center',
                    }}
                >
                    <img src={logo} style={{
                        height: '50%',
                        position: 'fixed',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }} />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 0, bgcolor: 'secondary.main', width: 40, height: 40 }}>
                            <LockOpenIcon sx={{ width: 30, height: 30 }} />
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}> Sign in </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container md={12} spacing={2} sx={{ mt: 3 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        id="username"
                                        type="text"
                                        label="Username"
                                        {...register("Username", { required: true, maxLength: 80 })}
                                        error={!!errors["Username"]}
                                        helperText={errors["Username"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        {...register("Password", { required: true, maxLength: 80 })}
                                        error={!!errors["Password"]}
                                        helperText={errors["Password"]?.message}
                                        onBlur={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold' }}
                            >
                                Sign In
                            </Button>
                        </form>

                        <Typography sx={{ align: "center", width: "100%", mt: 5, mb: 2, fontWeight: 'bold', color: '#555' }} variant="h6"> OR </Typography>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold', width: "50%" }}>
                            Patient Registration
                        </Button>
                        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold', width: "50%" }}>
                            Pharmacist Registration
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}