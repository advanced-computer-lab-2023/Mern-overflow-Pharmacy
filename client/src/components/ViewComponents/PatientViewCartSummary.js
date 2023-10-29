import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import axios from "axios";
import {capitalize} from '../../utils'

export default function PatientViewCartSummary(props) {
    const [data, setData] = useState([]);
    const [meds, setMeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(280);

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

    return (
        <Container maxWidth="xl">
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