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
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const columns = [
    {
        key: "name",
        label: "Name"
    },
    {
        key: "email",
        label: "Email"
    },
    {
        key: "username",
        label: "Username"
    },
    {
        key: "dateOfBirth",
        label: "Birth Date"
    },
    {
        key: "hourlyRate",
        label: "Hourly Rate"
    },
    {
        key: "affiliation",
        label: "Affiliation"
    },
    {
        key: "education",
        label: "Education"
    },
    {
        key: "action",
        label: "Action"
    }
];

export default function AdminViewPharmacists(props) {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDel, setLoadingDel] = useState(false);
    const [Query, setQuery] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const fetchTableData = () => {
        axios.get(`http://localhost:8000/pharmacists`).then((res) => {
            setData(res.data);
            setTimeout(() => setLoading(false), 500);
        });
    };

    const handleDelete = (id) => {
        setLoadingDel(true);
        axios
            .delete(`http://localhost:8000/pharmacists/${id}`)
            .then((response) => {
                fetchTableData();
                setSuccessMessage("Pharmacist deleted succesfully");
                setSuccessOpen(true);
                setLoadingDel(false);
            })
            .catch((error) => {
                console.error("Error making DELETE request", error);
                alert("Error deleting the pharmacist: " + error.message);
                setLoadingDel(false);
            });
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") {
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
            <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }}>
                {loading ? (
                    <CircularProgress sx={{ mt: "30px" }} />
                ) : (
                    <Container>
                        <Container
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                my: 5
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
                                    {columns.map((column) => (
                                        <TableCell key={column.key} sx={{ fontWeight: "bold" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map(
                                    (row) =>
                                        row.name.toLowerCase().includes(Query.toLowerCase()) && (
                                            <TableRow key={row.username}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.username}</TableCell>
                                                <TableCell>{row.dateOfBirth.slice(0, 10)}</TableCell>
                                                <TableCell>EGP {row.hourlyRate}</TableCell>
                                                <TableCell>{row.affiliation}</TableCell>
                                                <TableCell>{row.education}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => handleDelete(row._id)}
                                                        sx={{ "&:hover": { color: theme.palette.error.main } }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                )}
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
