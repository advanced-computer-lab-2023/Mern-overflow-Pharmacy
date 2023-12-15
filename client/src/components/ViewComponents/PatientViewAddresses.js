import {
    List,
    ListItem,
    Paper,
    CircularProgress,
    Snackbar,
    Alert,
    TextField,
    Button,
    Container,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useUser } from "../../userContest";

export default function PatientViewAddresses(props) {
    const { userId } = useUser();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingChange, setLoadingChange] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [triedSubmit, setTriedSubmit] = useState(false);

    const fetchAddresses = () => {
        axios.get(`http://localhost:8001/patients/address/${userId}`).then((res) => {
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
        setTriedSubmit(false);
    };

    const handleSubmit = () => {
        if (newAddress.length >= 20 && !data.addresses.some((existingAddress) => existingAddress === newAddress)) {
            setLoadingChange(true);
            axios.put(`http://localhost:8001/patients/address/${userId}`, { newAddress: newAddress })
                .then((response) => {
                    fetchAddresses();
                    setLoadingChange(false);
                    setNewAddress("");
                    setSuccessMessage("Address added successfully.");
                    setSuccessOpen(true);
                    setTriedSubmit(false);
                })
                .catch((error) => {
                    setLoadingChange(false);
                    console.error("Error adding address:", error);
                });
        }
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") {
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
            <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }}>
                {loading ? (
                    <CircularProgress sx={{ mt: "30px" }} />
                ) : (
                    <Container>
                        <Typography sx={{ fontWeight: "bold", my: "20px" }}>Choose Delivery Address</Typography>
                        <RadioGroup value={selectedAddress} onChange={handleAddressChange}>
                            <List>
                                {data.addresses.map((address, index) => (
                                    <ListItem key={index}>
                                        <FormControlLabel value={address} control={<Radio />} label={address} />
                                    </ListItem>
                                ))}
                            </List>
                        </RadioGroup>
                        <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <TextField
                                label="New Address"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                sx={{ width: "70%" }}
                                inputProps={{ minLength: 20 }}
                                error={
                                    (newAddress.length < 20 && triedSubmit) ||
                                    data.addresses.some((existingAddress) => existingAddress === newAddress)
                                }
                                helperText={
                                    newAddress.length < 20 && triedSubmit
                                        ? "Minimum 20 characters required"
                                        : data.addresses.some((existingAddress) => existingAddress === newAddress)
                                        ? "This address already exists"
                                        : ""
                                }
                            />
                            <Button
                                type="submit"
                                variant="outlined"
                                sx={{ height: "55px" }}
                                startIcon={<AddIcon />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTriedSubmit(true);
                                    handleSubmit();
                                }}
                            >
                                Add Address
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
