import React from 'react';
import { useState, useEffect } from 'react'
import { TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// import FormControl from '@mui/material/FormControl';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller, SubmitHandler } from "react-hook-form"


export default function Register(props) {
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
        <>
            
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        my: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#FFF',
                        borderRadius: 5,
                        padding: 3,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4 }}> New Patient Registration </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container md={12} spacing={2} sx={{ mt: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    id="name"
                                    label="Name"
                                    {...register("Name", { required: true, maxLength: 80 })}
                                    error={!!errors["Name"]}
                                    helperText={errors["Name"]?.message}
                                    onBlur={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            disableFuture
                                            sx={{ minWidth: "200px", width: "225px" }}
                                            label="Date of Birth"
                                            style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="phone"
                                    label="Phone"
                                    type="tel"
                                    {...register("Phone", { required: true, minLength: 4, maxLength: 12 })}
                                    error={!!errors["Phone"]}
                                    helperText={errors["Phone"]?.message}
                                    onBlur={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    id="username"
                                    type="text"
                                    // placeholder="username"
                                    label="Username"
                                    {...register("Username", { required: true, maxLength: 80 })}
                                    error={!!errors["Username"]}
                                    helperText={errors["Username"]?.message}
                                    onBlur={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    {...register("Email", { required: true, maxLength: 80 })}
                                    error={!!errors["Email"]}
                                    helperText={errors["Email"]?.message}
                                    onBlur={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    {...register("Password", { required: true, maxLength: 80 })}
                                    error={!!errors["Password"]}
                                    helperText={errors["Password"]?.message}
                                    onBlur={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} >
                                <FormControl sx={{ mt: 2 }}>
                                    <FormLabel id="gender-label">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        defaultValue="male"
                                        id="gender"
                                        name="gender"
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
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
                                    id="emergencyPhone"
                                    label="Phone"
                                    {...register("EmergencyPhone", { required: true, maxLength: 80 })}
                                    error={!!errors["EmergencyPhone"]}
                                    helperText={errors["EmergencyPhone"]?.message}
                                    onBlur={handleChange}
                                />
                            </Grid>
                        </Grid>



                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container >
        </>
    )
}
