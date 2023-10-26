import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function PatientViewCart(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [Query, setQuery] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchTableData = () => {
        // axios.get(`http://localhost:8000/cart`).then((res) => {
        //     setData(res.data);
        //     setTimeout(() => setLoading(false), 500);
        //     props.setDataIsUpdated(true);
        // });
    };

    const handleDelete = (id) => {
        // axios.delete(`http://localhost:8000/adminstators/${id}`)
        //     .then((response) => {
        //         console.log('DELETE request successful', response);
        //         fetchTableData();
        //         setSuccessMessage('Admin deleted succesfully');
        //         setSuccessOpen(true);
        //     })
        //     .catch((error) => {
        //         console.error('Error making DELETE request', error);
        //         alert('Error deleting the admin: ' + error.message);
        //     });
    }

    // useEffect(() => {
    //     fetchTableData();
    // }, [props.dataIsUpdated]);

    // const handleSuccessClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setSuccessOpen(false);
    // };

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
                        <Container
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                my: 5,
                            }}
                        >
                            <Container sx={{ width: "48%" }}>
                                <Input
                                    size="lg"
                                    placeholder="Search by name..."
                                    onChange={(e) => setQuery(e.target.value)}
                                    fullWidth
                                />
                            </Container>
                        </Container>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="name" sx={{ textAlign: 'center', fontWeight: "bold" }}>Name</TableCell>
                                    <TableCell key="price" sx={{ textAlign: 'center', fontWeight: "bold" }}>Price</TableCell>
                                    <TableCell key="quantity" sx={{ textAlign: 'center', fontWeight: "bold" }}>Quantity</TableCell>
                                    <TableCell key="action" sx={{ textAlign: 'center', fontWeight: "bold" }}>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => row.name.toLowerCase().includes(Query.toLowerCase()) && (
                                    <TableRow key={row.name}>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.price}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.quantity}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <IconButton onClick={() => handleDelete(row._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: "100px" }}>
                            <Typography> {`Total: ${total}`} </Typography>
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