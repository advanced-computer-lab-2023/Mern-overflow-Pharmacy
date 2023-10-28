import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function PatientViewCart(props) {
    const [data, setData] = useState([]);
    const [meds, setMeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
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

    const handleDelete = (medName) => {
        axios.delete(`http://localhost:8000/cart/${medName}`)
            .then((response) => {
                console.log(medName);
                console.log('DELETE request successful', response);
                fetchTableData();
                setSuccessMessage('Medicine removed successfully');
                setSuccessOpen(true);
            })
            .catch((error) => {
                console.error('Error making DELETE request', error);
                alert('Error deleting the medicine: ' + error.message);
            });
    }

    return (
        <Container maxWidth="xl">
            {/* <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar> */}
            <Paper elevation={3} sx={{ p: '20px', my: '40px', paddingBottom: 5 }}>
                {loading ? (
                    <CircularProgress sx={{ mt: '30px' }} />
                ) : (
                    <Container>
                        <Table sx={{ mt: "20px" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="name" sx={{ textAlign: 'center', fontWeight: "bold" }}>Medicine Name</TableCell>
                                    <TableCell key="price" sx={{ textAlign: 'center', fontWeight: "bold" }}>Medicine Price</TableCell>
                                    <TableCell key="quantity" sx={{ textAlign: 'center', fontWeight: "bold" }}>Quantity in Cart</TableCell>
                                    <TableCell key="action" sx={{ textAlign: 'center', fontWeight: "bold" }}>Remove from Cart </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meds.map((med) =>
                                    <TableRow key={med.medName}>
                                        <TableCell sx={{ textAlign: 'center' }}> {med.medName} </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}> EGP {med.medPrice} </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <IconButton aria-label="delete"><RemoveCircleOutlineIcon /></IconButton>
                                            {med.medQuantity}
                                            <IconButton aria-label="delete"><AddCircleOutlineIcon /></IconButton>
                                        </TableCell>
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
                            <Button variant="contained"
                                component={Link}
                                to="/patient/checkout"> Checkout </Button>
                        </Container>
                    </Container>
                )}
            </Paper>
        </Container>
    );
}