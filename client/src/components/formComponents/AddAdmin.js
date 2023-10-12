import { Box, Grid, Alert, Typography, Snackbar, InputAdornment, OutlinedInput, InputLabel, FormControl, Button, Container, Paper, TextField } from "@mui/material";
import axios from 'axios';
import sha256 from 'js-sha256';
import { useForm } from "react-hook-form"
import { useState } from "react";

const AddAdmin = (props) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = data => {
    const dataToServer = { ...data };
    dataToServer["passwordHash"] = sha256(data["password"]);
    delete dataToServer.password
    axios.post('http://localhost:8000/adminstators', dataToServer)
      .then((response) => {
        console.log('POST request successful', response);
        setSuccessMessage('Admin created succesfully');
        setSuccessOpen(true);
        setErrorOpen(false);
        props.setDataIsUpdated(false);
      })
      .catch(() => {
        setErrorMessage('This username is already taken. Please choose another one.');
        setErrorOpen(true);
        setSuccessOpen(false);
      });
    console.log('done')
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
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
        <Typography variant="h6" sx={{ mb: 4 }}> Add a New Admin to the System </Typography>
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
        <Box component="form" sx={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="username"
            label="Username"
            {...register("username", { required: true, maxLength: 80 })}
            error={!!errors["username"]}
            helperText={errors["username"]?.message}
            onBlur={handleChange}
            sx={{ mr: "2%" }} fullWidth />

          <TextField
            id="password"
            label="Password"
            {...register("password", { required: true, maxLength: 80 })}
            error={!!errors["password"]}
            helperText={errors["password"]?.message}
            onBlur={handleChange}
            sx={{ mr: "2%" }} type="password" fullWidth />
          <Button type="submit" variant="outlined" fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
            Add Admin
          </Button>
        </Box>
      </Paper>
    </Container>

  );
}

export default AddAdmin;