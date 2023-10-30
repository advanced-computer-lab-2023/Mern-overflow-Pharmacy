import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { capitalize } from '../../utils'

export default function PatientViewCartSummary(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [meds, setMeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingChange, setLoadingChange] = useState(false);
    const [total, setTotal] = useState(0);
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleCheckout = () => {
        setLoadingChange(true);
        const medicines = meds;
        const address = props.address;
        axios.post('http://localhost:8000/orders/add', { medicines, total, address })
            .then(response => {
                axios.put('http://localhost:8000/cart/empty').then((response) => {
                    setLoadingChange(false);
                    setSuccessMessage("Order received");
                    setSuccessOpen(true);
                    fetchTableData();
                    navigate('/patient/orders');
                });
            })
            .catch(error => {
                console.error('Error creating order:', error);
                setLoadingChange(false);
                setErrorMessage("Error in checking out");
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
            <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert elevation={6} variant="filled" onClose={handleErrorClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Paper elevation={3} sx={{ p: '20px', my: '40px', paddingBottom: 5 }}>
                {loading ? (
                    <CircularProgress sx={{ mt: '30px' }} />
                ) : (
                    <Container>
                        <Typography sx={{ fontWeight: "bold", my: "20px" }}>Your Order Summary</Typography>
                        <Divider fullwidth />
                        <Table>
                            <TableHead>
                            </TableHead>
                            <TableBody>
                                {meds.map((med) =>
                                    <TableRow>
                                        <TableCell sx={{ textAlign: 'center' }}>{med.medQuantity}x {capitalize(med.medName)}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>EGP {med.medPrice * med.medQuantity}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: "50px" }}>
                            <Typography> {`Total: EGP ${total}`} </Typography>
                            <div>
                                <Button variant="outlined"
                                    component={Link}
                                    to="/patient/cart"
                                    sx={{ mr: "25px" }}> Return to Cart </Button>
                                <Button variant="contained" onClick={() => handleCheckout()}> Proceed </Button>
                            </div>
                        </Container>
                    </Container>
                )}
            </Paper>
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
        </Container>
    );
}
