import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function PatientViewAddresses(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [Query, setQuery] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

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
                        <Typography sx={{ fontWeight: "bold", my: "20px" }}>Choose Delivery Address</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="name" sx={{ textAlign: 'center', fontWeight: "bold" }}>Apartment Number</TableCell>
                                    <TableCell key="price" sx={{ textAlign: 'center', fontWeight: "bold" }}>Street</TableCell>
                                    <TableCell key="quantity" sx={{ textAlign: 'center', fontWeight: "bold" }}>Town</TableCell>
                                    <TableCell key="action" sx={{ textAlign: 'center', fontWeight: "bold" }}>City</TableCell>
                                    <TableCell key="action" sx={{ textAlign: 'center', fontWeight: "bold" }}>Country</TableCell>
                                    <TableCell key="action" sx={{ textAlign: 'center', fontWeight: "bold" }}>Selected</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                        </Table>
                        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: "100px" }}>
                            <Typography></Typography>
                            <Button variant="outlined"
                                component={Link}
                                to="/patient/cart"> Add an Address </Button>
                        </Container>
                    </Container>
                )}
            </Paper>
        </Container>

    );
}