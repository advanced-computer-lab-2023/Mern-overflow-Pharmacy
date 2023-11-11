import { Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import Fuse from "fuse.js";
import axios from "axios";

const columns = [
    {
        key: "username",
        label: "USERNAME",
    },
    {
        key: "action",
        label: "ACTION",
    },
];

export default function AdminViewAdmins(props) {
    const [data, setData] = useState([]);
    const [Query, setQuery] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchTableData = () => {
        axios.get(`http://localhost:8000/adminstrators`).then((res) => {
            setData(res.data);
            props.setDataIsUpdated(true);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/adminstrators/${id}`)
            .then((response) => {
                console.log('DELETE request successful', response);
                fetchTableData();
                setSuccessMessage('Admin deleted succesfully');
                setSuccessOpen(true);
            })
            .catch((error) => {
                console.error('Error making DELETE request', error);
                alert('Error deleting the admin: ' + error.message);
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
                                        <IconButton onClick={() => handleDelete(row._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            </Paper>
        </Container>

    );
}