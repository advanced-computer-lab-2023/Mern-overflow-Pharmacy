import React, { useEffect, useState } from "react";
import { Container, Button, List, ListItem, Paper, FormControl, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Input, Tooltip, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios";
import panadol from '../../assets/photos/panadol.jpg';

export default function PatientViewMedicines() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [Query, setQuery] = useState("");
    const [uniqueMedicinalUses, setUniqueMedicinalUses] = useState(["All"]);

    const fetchTableData = () => {
        axios
            .get(`http://localhost:8000/medicines/viewAll`, {})
            .then((res) => {
                setData(res.data);
                let temp = ["All"];
                res.data.map((key) => {
                    if (temp.indexOf(key.medicinalUse) === -1) {
                        temp.push(key.medicinalUse);
                    }
                    return null;
                });
                setUniqueMedicinalUses(temp);
            })
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleFilter = (e) => {
        e.preventDefault();
        let medUse = e.target.value;

        if (medUse === "" || medUse === "All") {
            fetchTableData();
        } else {
            axios
                .post(`http://localhost:8000/medicines/filter`, {
                    medicinalUse: medUse,
                })
                .then((res) => {
                    setData(res.data);
                });
        }
    };

    const handleClickOpen = (id) => {
        setOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }}>
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
                                placeholder="Search..."
                                onChange={(e) => setQuery(e.target.value)}
                                fullWidth
                            />
                        </Container>
                        <Container sx={{ width: "48%" }}>
                            <FormControl fullWidth>
                                <InputLabel id="filter-by-medicinalUse">Medicinal Use</InputLabel>
                                <Select
                                    onChange={(e) => handleFilter(e)}
                                    sx={{ textAlign: 'left' }}
                                    labelId="filter-by-medicinalUse"
                                    id="filter-by-medicinalUse-select"
                                    label="medicinalUse"
                                    uncontrolled="true"
                                    fullWidth
                                >
                                    {uniqueMedicinalUses.map((value) => (
                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Container>
                    </Container>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="name" sx={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell key="medicinalUse" sx={{ fontWeight: "bold" }}>Medicinal Use</TableCell>
                                <TableCell key="price" sx={{ fontWeight: "bold" }}>Price</TableCell>
                                <TableCell key="details" sx={{ textAlign: 'right', fontWeight: "bold" }}>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(
                                (row) =>
                                    row.name.toLowerCase().includes(Query.toLowerCase()) && (
                                        <TableRow key={row.name}>
                                            <TableCell >{row.name}</TableCell>
                                            <TableCell>{row.medicinalUse}</TableCell>
                                            <TableCell>EGP {row.price}</TableCell>
                                            <TableCell sx={{ textAlign: 'right' }}>
                                                <IconButton onClick={() => handleClickOpen(row._id)}>
                                                    <InfoOutlinedIcon />
                                                </IconButton>
                                                <Dialog open={open[row._id] || false} onClose={handleClose} BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } }}>
                                                    <DialogTitle>{row.name}</DialogTitle>
                                                    <DialogContent>
                                                        <img src={panadol} alt="Popup Photo" />
                                                        <div style={{ whiteSpace: 'pre-line' }}>
                                                            {`Description: ${row.details.description}\n\nActive Ingredients: ${row.details.activeIngredients}`}
                                                        </div>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose} color="primary">
                                                            Close
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ),
                            )}
                        </TableBody>
                    </Table>

                </Container >
            </Paper>
        </Container >
    );
}
