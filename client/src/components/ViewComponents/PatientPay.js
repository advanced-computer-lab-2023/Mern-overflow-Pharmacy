import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FaceIcon from '@mui/icons-material/Face';
import StarIcon from '@mui/icons-material/Star';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useUser } from "../../userContest";

export default function PatientPay(props) {
    const { userId } = useUser();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [Query, setQuery] = useState("");
    const [value, setValue] = useState('');
    const [cash, setCash] = useState(false);
    const [credit, setCredit] = useState(false);
    const [wallet, setWallet] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleCash = (event) => {
        props.setPaymentMethod("Cash on Delivery");
        setCash(true);
        setCredit(false);
        setWallet(false);
    };

    const handleCredit = (event) => {
        props.setPaymentMethod("Credit Card");
        setCash(false);
        setCredit(true);
        setWallet(false);
        console.log("before fetch");
        {
            fetch("http://localhost:8000/create-checkout-session/shoppingCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pId: userId
                }),
            })
                .then(res => {
                    console.log("after fetch");
                    if (res.ok) return res.json()
                    return res.json().then(json => Promise.reject(json))
                })
                .then(({ url }) => {
                    window.location = url
                })
                .catch(e => {
                    console.error(e.error)
                })
        }
    };

    const handleWallet = (event) => {
        props.setPaymentMethod("Wallet");
        setCash(false);
        setCredit(false);
        setWallet(true);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: '20px', my: '40px', paddingBottom: 5 }}>
                {loading ? (
                    <CircularProgress sx={{ mt: '30px' }} />
                ) : (
                    <Container>
                        <Typography sx={{ fontWeight: "bold", my: "20px" }}>Choose Payment Method</Typography>
                        <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: '50px' }}>
                            <Button elevation={3} variant={cash ? "contained" : "outlined"} sx={{ color: cash ? "white" : "#036704", backgroundColor: cash ? "#036704" : "transparent", borderColor: '#036704', padding: 2, textAlign: 'center', width: "30%", '&:hover': { backgroundColor: cash ? "#036704" : "transparent" } }} onClick={() => handleCash()} style={{ textTransform: 'none' }}>
                                <PaymentsIcon fontSize="large" />
                                <Typography variant="body1" sx={{ ml: "10px" }}>Cash on Delivery</Typography>
                            </Button>

                            <Button elevation={3} variant={credit ? "contained" : "outlined"} sx={{ color: credit ? "white" : "#023047", backgroundColor: credit ? "#023047" : "transparent", borderColor: '#023047', padding: 2, textAlign: 'center', width: "30%", '&:hover': { backgroundColor: credit ? "#023047" : "transparent" } }} onClick={() => handleCredit()} style={{ textTransform: 'none' }}>
                                <CreditCardIcon fontSize="large" />
                                <Typography variant="body1" sx={{ ml: "10px" }}>Credit Card</Typography>
                            </Button>

                            <Button elevation={3} variant={wallet ? "contained" : "outlined"} sx={{ color: wallet ? "white" : "#7C4700", backgroundColor: wallet ? "#7C4700" : "transparent", borderColor: '#7C4700', padding: 2, textAlign: 'center', width: "30%", '&:hover': { backgroundColor: wallet ? "#7C4700" : "transparent" } }} onClick={() => handleWallet()} style={{ textTransform: 'none' }}>
                                <AccountBalanceWalletIcon fontSize="large" />
                                <Typography variant="body1" sx={{ ml: "10px" }}>Wallet</Typography>
                            </Button>
                        </Container>
                    </Container>
                )}
            </Paper>
        </Container>

    );
}