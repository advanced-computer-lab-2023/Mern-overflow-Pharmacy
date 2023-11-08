import { List, ListItem, ListItemText, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

export default function PatientViewAddresses(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingChange, setLoadingChange] = useState(false);
    const [total, setTotal] = useState(0);
    const [Query, setQuery] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState('');

    const fetchAddresses = () => {
        const patientId = "6527d5aa11c64e3b65860e67";
        axios.get(`http://localhost:8000/patients/address/${patientId}`).then((res) => {
            setData(res.data);
            setTimeout(() => setLoading(false), 500);
        });
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
        props.setAddress(event.target.value);
    };

    const handleSubmit = () => {
        setLoadingChange(true);
        const patientId = "6527d5aa11c64e3b65860e67";
        axios.put(`http://localhost:8000/patients/address/${patientId}`, { newAddress: newAddress })
            .then((response) => {
                fetchAddresses();
                setLoadingChange(false);
                setNewAddress('');
                setSuccessMessage("Address added successfully.")
                setSuccessOpen(true);
            })
            .catch((error) => {
                setLoadingChange(false);
                console.error('Error adding address:', error);
            });
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    return (
        <Container maxWidth="md">
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
                        <Typography sx={{ fontWeight: "bold", my: "20px" }}>Choose Delivery Address</Typography>
                        <RadioGroup value={selectedAddress} onChange={handleAddressChange}>
                            <List>
                                {data.addresses.map((address, index) => (
                                    <ListItem key={index}>
                                        <FormControlLabel
                                            value={address}
                                            control={<Radio />}
                                            label={address}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </RadioGroup>
                        <form onSubmit={handleSubmit}>
                            <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <TextField
                                    label="New Address"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    sx={{ width: "70%" }}
                                />
                                <Button type="submit" variant="outlined" startIcon={<AddIcon />}>
                                    Add Address
                                </Button>
                            </Container>
                        </form>
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