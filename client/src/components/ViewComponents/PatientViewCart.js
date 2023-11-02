import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MedicationIcon from '@mui/icons-material/Medication';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils'
import emptyCart from "../../assets/photos/empty-cart.png"
import axios from "axios";

export default function PatientViewCart(props) {
    const [data, setData] = useState([]);
    const [meds, setMeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingChange, setLoadingChange] = useState(false);
    const [total, setTotal] = useState(0);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchTableData = () => {
        axios.get(`http://localhost:8000/cart`).then((res) => {
            setData(res.data)
            setMeds(res.data[0].medicines);
            setTimeout(() => setLoading(false), 500);
        });
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    useEffect(() => {
        let total = 0;
        meds.forEach(med => {
            total += med.medPrice * med.medQuantity;
        });
        setTotal(total);
    }, [meds]);

    const handleDelete = (medName) => {
        setLoadingChange(true);
        axios.delete(`http://localhost:8000/cart/${medName}`)
            .then((response) => {
                fetchTableData();
                setSuccessMessage('Medicine removed successfully');
                setLoadingChange(false);
                setSuccessOpen(true);
            })
            .catch((error) => {
                console.error('Error making DELETE request', error);
                alert('Error deleting the medicine: ' + error.message);
            });
    }

    const handleChangeAmount = (medName, newAmount) => {
        setLoadingChange(true);
        axios.post('http://localhost:8000/cart/changeAmount', { medName, newAmount })
            .then((response) => {
                setLoadingChange(false);
                fetchTableData();
            })
            .catch((error) => {
                console.error('Error making POST request', error);
                setErrorMessage(error.response.data);
                setLoadingChange(false);
                setErrorOpen(true);
            });
    }

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    return (
        <Container maxWidth="xl">
            <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert elevation={6} variant="filled" onClose={handleErrorClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
            <Paper elevation={3} sx={{ p: '20px', my: '40px', paddingBottom: 5 }}>
                {loading ? (
                    <CircularProgress sx={{ mt: '30px' }} />
                ) : (
                    <Container>
                        {meds.length > 0 ? (
                            <>
                                <Table sx={{ mt: "20px" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell key="name" sx={{ textAlign: 'center', fontWeight: "bold" }}>Medicine Name</TableCell>
                                            <TableCell key="price" sx={{ textAlign: 'center', fontWeight: "bold" }}>Medicine Price</TableCell>
                                            <TableCell key="quantity" sx={{ textAlign: 'center', fontWeight: "bold" }}>Quantity in Cart</TableCell>
                                            <TableCell key="quantity" sx={{ textAlign: 'center', fontWeight: "bold" }}>Total Price</TableCell>
                                            <TableCell key="action" sx={{ textAlign: 'center', fontWeight: "bold" }}>Remove from Cart </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {meds.map((med) =>
                                            <TableRow key={med.medName}>
                                                <TableCell sx={{ textAlign: 'center' }}> {capitalize(med.medName)} </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}> EGP {med.medPrice} </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <IconButton onClick={() => handleChangeAmount(med.medName, med.medQuantity - 1)}><RemoveCircleOutlineIcon /></IconButton>
                                                    <input
                                                        value={med.medQuantity}
                                                        onChange={(e) => {
                                                            if (e.target.value >= 1 && e.target.value <= 100) {
                                                                handleChangeAmount(med.medName, e.target.value)
                                                            }
                                                        }
                                                        }
                                                        style={{ width: '40px', textAlign: 'center' }}
                                                        min="0"
                                                    />
                                                    <IconButton onClick={() => handleChangeAmount(med.medName, med.medQuantity + 1)}><AddCircleOutlineIcon /></IconButton>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}> EGP {med.medPrice * med.medQuantity} </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <IconButton onClick={() => handleDelete(med.medName)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: "100px" }}>
                                    <Typography> {`Total: EGP ${total}`} </Typography>
                                    <div>
                                        <Button variant="outlined"
                                            component={Link}
                                            to="/patient/medicines"
                                            sx={{ mr: "25px" }}> Back to medicines <MedicationIcon sx={{ ml: "15px" }} /> </Button>
                                        <Button variant="contained"
                                            component={Link}
                                            to="/patient/checkout"> Checkout <PointOfSaleIcon sx={{ ml: "15px" }} /> </Button>
                                    </div>
                                </Container>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5">Your Cart is Empty.</Typography>
                                <Typography variant="h6">Seems like you haven't added anything to your cart yet.</Typography>
                                <Typography variant="h6">Check out our available medicines and start adding to your cart now!</Typography>
                                <Container maxWidth="sm" sx={{my: "30px"}}>
                                    <img src={emptyCart} loading="lazy" width="30%" />
                                </Container>
                                <Button variant="contained"
                                    component={Link}
                                    to="/patient/medicines"
                                    sx={{ mt: "25px" }}> Back to medicines <MedicationIcon sx={{ ml: "15px" }} /> </Button>
                            </>
                        )}
                    </Container>
                )
                }
            </Paper >
            {loadingChange && (
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
                        zIndex: 9999,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <CircularProgress sx={{ color: "white" }} />
                </div>
            )}
        </Container >
    );
}