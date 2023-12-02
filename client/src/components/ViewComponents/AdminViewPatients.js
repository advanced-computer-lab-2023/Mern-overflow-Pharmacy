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
        key: "username",
        label: "Username"
    },
    {
        key: "name",
        label: "Name"
    },
    {
        key: "email",
        label: "Email"
    },
    {
        key: "dateOfBirth",
        label: "Birth Date"
    },
    {
        key: "gender",
        label: "Gender"
    },
    {
        key: "mobileNumber",
        label: "Phone No."
    },
    {
        key: "emergencyName",
        label: "Emergency Contact Name"
    },
    {
        key: "emergencyMobileNumber",
        label: "Emergency Phone No."
    },
    {
        key: "action",
        label: "Action"
    }
];

export default function AdminViewPatients(props) {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDel, setLoadingDel] = useState(false);
    const [Query, setQuery] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const fetchTableData = () => {
        axios.get(`http://localhost:8000/patients`).then((res) => {
            setData(res.data);
            setTimeout(() => setLoading(false), 500);
        });
    };

    const handleDelete = (id) => {
        setLoadingDel(true);
        axios
            .delete(`http://localhost:8000/patients/${id}`)
            .then((response) => {
                fetchTableData();
                setSuccessMessage("Patient deleted succesfully");
                setSuccessOpen(true);
                setLoadingDel(false);
            })
            .catch((error) => {
                console.error("Error making DELETE request", error);
                alert("Error deleting the patient: " + error.message);
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
                                mt: 5,
                                mb: 8
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
                                <TableRow sx={{ height: "50%" }}>
                                    <TableCell colSpan={6} sx={{ fontWeight: "bold", textAlign: "center" }}>
                                        PATIENT
                                    </TableCell>
                                    <TableCell
                                        colSpan={3}
                                        sx={{ fontWeight: "bold", textAlign: "center", color: "#5A5A5A" }}
                                    >
                                        EMERGENCY CONTACT
                                    </TableCell>
                                    <TableCell
                                        key="action"
                                        sx={{ textAlign: "center", fontWeight: "bold" }}
                                    ></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell key="name" sx={{ fontWeight: "bold" }}>
                                        Name
                                    </TableCell>
                                    <TableCell key="email" sx={{ fontWeight: "bold" }}>
                                        Email
                                    </TableCell>
                                    <TableCell key="username" sx={{ fontWeight: "bold" }}>
                                        Username
                                    </TableCell>
                                    <TableCell key="dateOfBirth" sx={{ fontWeight: "bold" }}>
                                        Birth Date
                                    </TableCell>
                                    <TableCell key="gender" sx={{ fontWeight: "bold" }}>
                                        Gender
                                    </TableCell>
                                    <TableCell
                                        key="mobileNumber"
                                        sx={{ fontWeight: "bold", borderRight: "1px solid #ccc" }}
                                    >
                                        Phone No.
                                    </TableCell>
                                    <TableCell key="emergencyContactName" sx={{ fontWeight: "bold", color: "#5A5A5A" }}>
                                        Name
                                    </TableCell>
                                    <TableCell
                                        key="emerencyContactMobileNumber"
                                        sx={{ fontWeight: "bold", color: "#5A5A5A" }}
                                    >
                                        Phone No.
                                    </TableCell>
                                    <TableCell
                                        key="emerencyContactRelation"
                                        sx={{ fontWeight: "bold", color: "#5A5A5A", borderRight: "1px solid #ccc" }}
                                    >
                                        Relation
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>Action</TableCell>
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
                                                <TableCell>{row.gender}</TableCell>
                                                <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                                                    {row.mobileNumber}
                                                </TableCell>
                                                <TableCell sx={{ color: "#5A5A5A" }}>
                                                    {row.emergencyContact.name}
                                                </TableCell>
                                                <TableCell sx={{ color: "#5A5A5A" }}>
                                                    {row.emergencyContact.mobileNumber}
                                                </TableCell>
                                                <TableCell sx={{ color: "#5A5A5A", borderRight: "1px solid #ccc" }}>
                                                    {row.emergencyContact.relation}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
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
