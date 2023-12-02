import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PendingIcon from "@mui/icons-material/Pending";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MedicationIcon from "@mui/icons-material/Medication";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link } from "react-router-dom";
import axios from "axios";
import { capitalize } from "../../utils";
import { useUser } from "../../userContest";

export default function PatientViewCart(props) {
    const { userId } = useUser();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingChange, setLoadingChange] = useState(false);
    const [total, setTotal] = useState(0);
    const [Query, setQuery] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const fetchTableData = () => {
        axios.get(`http://localhost:8000/orders/${userId}`).then((res) => {
            const reversedData = res.data.reverse();
            setData(reversedData);
            setTimeout(() => setLoading(false), 500);
        });
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const displayDate = (date) => {
        date = new Date(date);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };

    const handleCancel = (orderId) => {
        setLoadingChange(true);
        axios
            .put(`http://localhost:8000/orders/${orderId}`)
            .then((response) => {
                setSuccessMessage(`Order ${orderId.toUpperCase()} has been cancelled.`);
                setLoadingChange(false);
                setSuccessOpen(true);
                fetchTableData();
            })
            .catch((error) => {
                console.error("Error making PUT request", error);
                setSuccessOpen(false);
                setLoadingChange(false);
            });
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessOpen(false);
    };

    return (
        <Container maxWidth="xl">
            <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert elevation={6} variant="filled" onClose={handleSuccessClose} severity="info">
                    {successMessage}
                </Alert>
            </Snackbar>
            <Paper sx={{ p: "20px", my: "40px", paddingBottom: 5, border: "none", boxShadow: "none" }}>
                <Container maxWidth="sm">
                    <Paper
                        elevation={3}
                        width="md"
                        sx={{ p: "20px", mb: "40px", display: "flex", justifyContent: "space-around" }}
                    >
                        <Button variant="outlined" component={Link} to="/patient/cart">
                            Go To Cart <ShoppingCartIcon sx={{ ml: "15px" }} />
                        </Button>
                        <Button variant="contained" component={Link} to="/patient/medicines">
                            Go To Medicines <MedicationIcon sx={{ ml: "15px" }} />
                        </Button>
                    </Paper>
                </Container>
                {loading ? (
                    <CircularProgress sx={{ mt: "30px" }} />
                ) : (
                    <Container>
                        {data.map((order, index) => (
                            <Accordion elevation="3" defaultExpanded={index == 0}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: "20px" }}>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "left",
                                            width: "60%",
                                            flexShrink: 0,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {order.status == "pending" ? (
                                            <PendingIcon color="primary" sx={{ mr: "15px" }} />
                                        ) : order.status == "delivered" ? (
                                            <CheckCircleIcon color="success" sx={{ mr: "15px" }} />
                                        ) : order.status == "shipped" ? (
                                            <LocalShippingIcon color="warning" sx={{ mr: "15px" }} />
                                        ) : (
                                            <CancelIcon color="error" sx={{ mr: "15px" }} />
                                        )}
                                        ORDER {order._id.toUpperCase()}
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary", width: "30%" }}>
                                        {" "}
                                        {displayDate(order.date)}{" "}
                                    </Typography>
                                    {order.paymentMethod.toLowerCase() == "cash on delivery" ? (
                                        <PaymentsIcon color="action" />
                                    ) : order.paymentMethod.toLowerCase() == "wallet" ? (
                                        <AccountBalanceWalletIcon color="action" />
                                    ) : (
                                        <CreditCardIcon color="action" />
                                    )}
                                    <Typography sx={{ color: "text.secondary", width: "10%" }}>
                                        {" "}
                                        {order.total} EGP{" "}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ textAlign: "left" }}>
                                        {" "}
                                        Status: {capitalize(order.status)}{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "left" }}>
                                        {" "}
                                        Delivery Address: {order.address}{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "left", mb: "20px" }}>
                                        {" "}
                                        Payment Method:{" "}
                                        {order.paymentMethod.toLowerCase() == "cash on delivery"
                                            ? "Cash on Delivery"
                                            : order.paymentMethod.toLowerCase() == "wallet"
                                            ? "Wallet"
                                            : "Credit Card"}{" "}
                                    </Typography>
                                    {order.medicines.map((medicine) => (
                                        <Typography sx={{ textAlign: "left" }}>
                                            {" "}
                                            {medicine.medQuantity}x {capitalize(medicine.medName)}: EGP{" "}
                                            {medicine.medPrice * medicine.medQuantity}{" "}
                                        </Typography>
                                    ))}
                                    {order.status == "pending" && (
                                        <Button
                                            component="label"
                                            variant="outlined"
                                            color="error"
                                            startIcon={<CancelIcon />}
                                            sx={{ mb: "10px" }}
                                            onClick={() => handleCancel(order._id)}
                                        >
                                            Cancel Order
                                        </Button>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        ))}
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
                    <CircularProgress color="primary" />
                </div>
            )}
        </Container>
    );
}
