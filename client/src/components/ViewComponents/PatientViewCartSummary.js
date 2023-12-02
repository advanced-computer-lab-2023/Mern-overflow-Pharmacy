import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    Input,
    Snackbar,
    Alert,
    InputLabel,
    TextField,
    Grid,
    Select,
    MenuItem,
    Button,
    Box,
    Container,
    FormControl,
    Typography,
    Divider,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { capitalize } from "../../utils";
import { useUser } from "../../userContest";

export default function PatientViewCartSummary(props) {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingChange, setLoadingChange] = useState(false);

    const fetchTableData = () => {
        axios.get(`http://localhost:8000/cart/${userId}`).then((res) => {
            setData(res.data);
            props.setMeds(res.data.medicines);
            setTimeout(() => setLoading(false), 500);
        });
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    useEffect(() => {
        let total = 0;
        props.meds.forEach((med) => {
            total += med.medPrice * med.medQuantity;
        });
        props.setTotal(total);
    }, [props.meds]);

    const handleReturnToCart = () => {
        navigate("/patient/cart");
    };

    const handleCheckout = () => {
        setLoadingChange(true);
        const medicines = props.meds;
        const address = props.address;
        const paymentMethod = props.paymentMethod;

        axios
            .post(`http://localhost:8000/orders/${userId}/add`, {
                medicines,
                total: props.total,
                address,
                paymentMethod
            })
            .then((response) => {
                axios.put(`http://localhost:8000/cart/${userId}/empty`).then((response) => {
                    setLoadingChange(false);
                    props.setSuccessMessage("Order received");
                    props.setSuccessOpen(true);
                    fetchTableData();
                    navigate("/patient/orders");
                });
            })
            .catch((error) => {
                console.error("Error creating order:", error);
                setLoadingChange(false);
                if (!props.address) {
                    props.setErrorMessage("Please choose a delivery address.");
                } else if (!props.paymentMethod) {
                    props.setErrorMessage("Please choose a payment method.");
                } else {
                    props.setErrorMessage("Unexpected Error in checking out.");
                }
                props.setErrorOpen(true);
            });
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        props.setSuccessOpen(false);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        props.setErrorOpen(false);
    };

    return (
        <Container maxWidth="md">
            <Snackbar open={props.successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    {props.successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={props.errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert elevation={6} variant="filled" onClose={handleErrorClose} severity="error">
                    {props.errorMessage}
                </Alert>
            </Snackbar>
            <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }}>
                {loading ? (
                    <CircularProgress sx={{ mt: "30px" }} />
                ) : (
                    <Container>
                        <Typography sx={{ fontWeight: "bold", my: "20px", fontFamily: "monospace" }}>
                            Your Order Summary
                        </Typography>
                        <Divider />
                        <Table>
                            <TableHead></TableHead>
                            <TableBody>
                                {props.meds.map((med) => (
                                    <TableRow>
                                        <TableCell sx={{ width: "50%", textAlign: "center", fontFamily: "monospace" }}>
                                            {med.medQuantity}x {capitalize(med.medName)}
                                        </TableCell>
                                        <TableCell sx={{ width: "50%", textAlign: "center", fontFamily: "monospace" }}>
                                            EGP {med.medPrice * med.medQuantity}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell sx={{ width: "50%", textAlign: "center", fontFamily: "monospace" }}>
                                        Total Amount
                                    </TableCell>
                                    <TableCell sx={{ width: "50%", textAlign: "center", fontFamily: "monospace" }}>
                                        EGP {props.total}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            width: "50%",
                                            textAlign: "center",
                                            fontFamily: "monospace",
                                            borderTop: "2px solid #ccc"
                                        }}
                                    >
                                        Delivery Address
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: "50%",
                                            textAlign: "center",
                                            fontFamily: "monospace",
                                            borderTop: "2px solid #ccc"
                                        }}
                                    >
                                        {props.address ? props.address : "——"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ width: "50%", textAlign: "center", fontFamily: "monospace" }}>
                                        Payment Method
                                    </TableCell>
                                    <TableCell sx={{ width: "50%", textAlign: "center", fontFamily: "monospace" }}>
                                        {props.paymentMethod ? props.paymentMethod : "——"}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Container
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                pt: "50px",
                                width: "80%"
                            }}
                        >
                            <Button variant="outlined" onClick={() => handleReturnToCart()} sx={{}}>
                                {" "}
                                <NavigateBeforeIcon sx={{ mr: "15px" }} /> Return to Cart{" "}
                            </Button>
                            <Button variant="contained" onClick={() => handleCheckout()}>
                                {" "}
                                Confirm Order <NavigateNextIcon sx={{ ml: "15px" }} />{" "}
                            </Button>
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
                        zIndex: 9999
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <CircularProgress sx={{ color: "white" }} />
                </div>
            )}
        </Container>
    );
}
