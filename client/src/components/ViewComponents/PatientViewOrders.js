import { Accordion, AccordionSummary, AccordionDetails, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/Pending';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function PatientViewCart(props) {
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
            <Paper sx={{ p: '20px', my: '40px', paddingBottom: 5, border: "none", boxShadow: "none" }}>
                {loading ? (
                    <CircularProgress sx={{ mt: '30px' }} />
                ) : (
                    <Container>
                        <Accordion elevation="3" >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: "20px" }} >
                            <Typography sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '70%', flexShrink: 0, fontWeight: "bold" }}>
                                    ORDER 14234435798 <CheckCircleIcon color="success" sx={{ml: "15px"}} />
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '20%' }}> 05/12/2023 1:03 PM </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '10%' }}> 540 EGP </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ textAlign: "left", mb: "20px" }}> Status: Delivered </Typography>
                                <Typography sx={{ textAlign: "left" }}> 1x Minoxidil 5%: EGP 510 </Typography>
                                <Typography sx={{ textAlign: "left" }}> Delivery Fees: EGP 30 </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion elevation="3">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: "20px" }} >
                                <Typography sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '70%', flexShrink: 0, fontWeight: "bold" }}>
                                    ORDER 34123513523 <PendingIcon color="primary" sx={{ml: "15px"}} />
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '20%' }}> 14/11/2023 5:40 PM </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '10%' }}> 280 EGP </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ textAlign: "left", mb: "20px" }}> Status: Pending </Typography>
                                <Typography sx={{ textAlign: "left" }}> 1x Panadol: EGP 100 </Typography>
                                <Typography sx={{ textAlign: "left" }}> 3x Aspirin: EGP 150 </Typography>
                                <Typography sx={{ textAlign: "left" }}> Delivery Fees: EGP 30 </Typography>
                                <Button component="label" variant="contained" color="error" startIcon={<CancelIcon />}>
                                    Cancel Order
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion elevation="3">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: "20px" }} >
                            <Typography sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '70%', flexShrink: 0, fontWeight: "bold" }}>
                                    ORDER 21358902342 <LocalShippingIcon color="warning" sx={{ml: "15px"}} />
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '20%' }}> 14/11/2023 5:40 PM </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '10%' }}> 280 EGP </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ textAlign: "left", mb: "20px" }}> Status: Shipped </Typography>
                                <Typography sx={{ textAlign: "left" }}> 1x Panadol: EGP 100 </Typography>
                                <Typography sx={{ textAlign: "left" }}> 3x Aspirin: EGP 150 </Typography>
                                <Typography sx={{ textAlign: "left" }}> Delivery Fees: EGP 30 </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion elevation="3">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: "20px" }}>
                            <Typography sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '70%', flexShrink: 0, fontWeight: "bold" }}>
                                    ORDER 21358902342 <CancelIcon color="error" sx={{ml: "15px"}} />
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '20%' }}> 14/11/2023 5:40 PM </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '10%' }}> 280 EGP </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ textAlign: "left", mb: "20px" }}> Status: Canceled </Typography>
                                <Typography sx={{ textAlign: "left" }}> 1x Panadol: EGP 100 </Typography>
                                <Typography sx={{ textAlign: "left" }}> 3x Aspirin: EGP 150 </Typography>
                                <Typography sx={{ textAlign: "left" }}> Delivery Fees: EGP 30 </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Container>
                )}
            </Paper>
        </Container>
    );
}