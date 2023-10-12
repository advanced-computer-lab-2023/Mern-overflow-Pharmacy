import React, { useState } from 'react';
import { Paper, CssBaseline, TextField, Grid, Snackbar, Alert, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio, Avatar, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sha256 from 'js-sha256';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import logo from '../../assets/gifs/logo.gif';

const defaultTheme = createTheme();

export default function PharmacistRegister() {
  const { register, handleSubmit, setError, formState: { errors }, control } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = data => {
    const dataToServer = { ...data };

    dataToServer["passwordHash"] = sha256(data["password"]);
    delete dataToServer.password
    console.log('sending data')
    console.log(JSON.stringify(dataToServer));

    axios.post('http://localhost:8000/pharmacists', dataToServer)
      .then((response) => {
        console.log('POST request successful', response);
        setSuccessMessage('Your request has been succesfully sent.');
        setSuccessOpen(true);
        setErrorOpen(false);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.response.data.message || 'Unknown error');
        if (error.response.data.indexOf("registered") !== -1) {
          setError('email', {
            data: 'Email is registered'
          });
        } else if (error.response.data.indexOf("Username") !== -1) {
          setError('username', {
            data: 'Username already exists'
          });
        }
        setErrorMessage(error.response.data);
        setErrorOpen(true);
        setSuccessOpen(false);
      });
    console.log("sent data");
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
              <ContactPageIcon sx={{ width: 30, height: 30 }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}> Pharmacist Registration Request </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <Grid item xs={12} >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <Controller
                        control={control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <DatePicker
                            sx={{ width: "100%" }}
                            openTo="year"
                            views={['year', 'month', 'day']}
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
                  <FormControl fullWidth >
                    <InputLabel htmlFor="outlined-adornment-amount">Hourly Rate</InputLabel>
                    <OutlinedInput
                      fullWidth
                      inputProps={{ max: 10000 }}
                      type="number"
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">EGP</InputAdornment>}
                      label="Hourly Rate"
                      {...register("hourlyRate", { required: true, maxLength: 80 })}
                      error={!!errors["hourlyRate"]}
                      helperText={errors["hourlyRate"]?.message}
                      onBlur={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="affiliation"
                    label="Affiliation (Hospital)"
                    type="text"
                    {...register("affiliation", { required: true, maxLength: 80 })}
                    error={!!errors["affiliation"]}
                    helperText={errors["affiliation"]?.message}
                    onBlur={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="education"
                    label="Educational Background"
                    type="text"
                    {...register("education", { required: true, maxLength: 80 })}
                    error={!!errors["education"]}
                    helperText={errors["education"]?.message}
                    onBlur={handleChange}
                  />
                </Grid>

              </Grid>
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold' }}>
                Submit
              </Button>
            </form>
            <Typography sx={{ align: "center", width: "100%", mt: 5, mb: 2, fontWeight: 'bold', color: '#555' }} variant="h6"> OR </Typography>
            <Button fullWidth type="submit" variant="outlined" sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold' }}
              component={Link}
              to="/signin">
              Sign In
            </Button>
            <Button fullWidth type="submit" variant="outlined" sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold' }}
              component={Link}
              to="/register/patient">
              Patient Registration
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
}