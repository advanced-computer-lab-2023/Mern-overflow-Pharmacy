import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function PatientViewCartSummary(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(280);
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
                        <Typography sx={{ fontWeight: "bold", my: "20px" }}>Your Order Summary</Typography>
                        <Divider fullwidth />
                        <Table>
                            <TableHead>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'center' }}>1x Panadol</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>EGP 100</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'center' }}>3x Aspirin</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>EGP 150</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'center' }}>Delivery</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>EGP 30</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: "50px" }}>
                            <Typography> {`Total: EGP ${total}`} </Typography>
                            <Button variant="outlined"
                                component={Link}
                                to="/patient/cart"> Return to Cart </Button>
                        </Container>
                    </Container>
                )}
            </Paper>
        </Container>

    );
}