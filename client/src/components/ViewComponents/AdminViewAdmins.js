import { Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useTheme } from '@mui/material/styles';


const columns = [{ key: "username", label: "USERNAME", }, { key: "action", label: "ACTION", },];
export default function AdminViewAdmins(props) {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDel, setLoadingDel] = useState(false);
    const [Query, setQuery] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchTableData = () => {
        axios.get(`http://localhost:8000/adminstrators`).then((res) => {
            setData(res.data);
            setTimeout(() => setLoading(false), 500);
            props.setDataIsUpdated(true);
        });
    };

    const handleDelete = (id) => {
        setLoadingDel(true);
        axios.delete(`http://localhost:8000/adminstrators/${id}`)
            .then((response) => {
                fetchTableData();
                setSuccessMessage('Admin deleted succesfully');
                setSuccessOpen(true);
                setLoadingDel(false);
            })
            .catch((error) => {
                console.error('Error making DELETE request', error);
                alert('Error deleting the admin: ' + error.message);
                setLoadingDel(false);
            });
    }

    useEffect(() => {
        fetchTableData();
    }, [props.dataIsUpdated]);

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    return (
        <Container maxWidth="xl">
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
                                    placeholder="Search by username..."
                                    onChange={(e) => setQuery(e.target.value)}
                                    fullWidth
                                />
                            </Container>
                        </Container>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="username" sx={{ fontWeight: "bold" }}>Username</TableCell>
                                    <TableCell key="action" sx={{ textAlign: 'right', fontWeight: "bold" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => row.username.toLowerCase().includes(Query.toLowerCase()) && (
                                    <TableRow key={row.username}>
                                        <TableCell>{row.username}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            <IconButton onClick={() => handleDelete(row._id)} sx={{ '&:hover': { color: theme.palette.error.main } }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Container>
                )}
            </Paper>
            {loadingDel && (
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