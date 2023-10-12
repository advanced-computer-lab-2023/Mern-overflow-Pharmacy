import * as React from 'react';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Grid, Snackbar, Alert, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from "react-hook-form"
import Avatar from '@mui/material/Avatar';
import logo from '../../assets/gifs/logo.gif';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sha256 from 'js-sha256';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function PatientRegister() {
  const { register, handleSubmit, setError, formState: { errors }, control } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = data => {
    const dataToServer = { ...data };
    dataToServer["passwordHash"] = sha256(data["password"]);
    dataToServer["emergencyContact"] = { name: data["EmergencyName"], mobileNumber: data["EmergencyPhone"], relation: data["relation"] };
    delete dataToServer.EmergencyName
    delete dataToServer.EmergencyPhone
    delete dataToServer.relation
    delete dataToServer.Password
    delete dataToServer.password
    axios.post('http://localhost:8000/patients', dataToServer)
      .then((response) => {
        console.log('POST request successful', response);
        setSuccessMessage('You have succesfully registered.');
        setSuccessOpen(true);
        setErrorOpen(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.code === 11000) {
          setErrorMessage('This username already exists. Please use another one.');
        } else {
          setErrorMessage(error.response.data.message || 'Unknown error');
        }
        setErrorMessage(error.response.data);
        setErrorOpen(true);
        setSuccessOpen(false);
      });
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
            <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}> Patient Registration </Typography>
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone"
                    type="number"
                    {...register("mobileNumber", { required: true, minLength: 8, maxLength: 16 })}
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

                <Grid item xs={12} >
                  <FormControl sx={{ mt: 2 }}>
                    <FormLabel id="gender-label">Gender</FormLabel>
                    <Controller
                      control={control}
                      name="gender" // Ensure the name matches the one used in RadioGroup
                      defaultValue="male" // Set the default value if needed
                      render={({ field }) => (
                        <RadioGroup
                          row
                          {...field} // Spread the field props to RadioGroup
                        >
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Divider sx={{
                  width: '60%',
                  borderWidth: '1px',
                  mx: 'auto',
                  my: 5,
                  borderColor: '#ccc',
                  filter: 'blur(1px)'
                }} />
                <Typography sx={{ align: "center", width: "100%", mb: 2, fontWeight: 'bold' }} variant="h6"> Emergency Contact </Typography>

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
                    id="emergencyPhone"
                    label="Phone"
                    type="number"
                    {...register("EmergencyPhone", { required: true, minLength: 8, maxLength: 16 })}
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
                      sx={{ textAlign: 'left' }}
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
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold' }}>
                Submit
              </Button>
            </Box>
            <Typography sx={{ align: "center", width: "100%", mt: 5, mb: 2, fontWeight: 'bold', color: '#555' }} variant="h6"> OR </Typography>
            <Button fullWidth type="submit" variant="outlined" sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold' }}
              component={Link}
              to="/signin">
              Sign In
            </Button>
            <Button fullWidth type="submit" variant="outlined" sx={{ mt: 3, mb: 2, p: 2, fontWeight: 'bold' }}
              component={Link}
              to="/register/pharmacist">
              Pharmacist Registration
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}