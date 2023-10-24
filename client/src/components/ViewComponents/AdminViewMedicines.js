import React, { useEffect, useState } from "react";
import { Grid, ButtonBase, Typography, Container, Button, List, ListItem, Paper, FormControl, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Input, Tooltip, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import panadol from '../../assets/photos/panadol.jpg';
import { styled } from '@mui/material/styles';


export default function AdminViewMedicines() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [Query, setQuery] = useState("");
    const [uniqueMedicinalUses, setUniqueMedicinalUses] = useState(["All"]);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const capitalize = (string) => {
        return string.replace(/\b\w/g, function (match) {
            return match.toUpperCase();
        });
    };

    const fetchTableData = () => {
        axios
            .get(`http://localhost:8000/medicines/view`, {})
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

    return (
        <>
            <Container maxWidth="xl">
                <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }} >
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
                                    placeholder="Search by name..."
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
                    </Container >

                    <Container sx={{ p: "20px", my: "40px", paddingBottom: 5, maxWidth: 350, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {data.map((row, index) => {
                            const count = 0;
                            return row.name.toLowerCase().includes(Query.toLowerCase()) && (
                                <Paper
                                    sx={{
                                        p: 2,
                                        my: '20px',
                                        width: '40%',
                                        maxWidth: '465px',
                                        flexGrow: 1,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <ButtonBase sx={{ width: 128, height: '100%' }}>
                                                <Img alt={row.name} src={panadol} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography fontWeight="bold" gutterBottom variant="subtitle1" component="div">
                                                        {capitalize(row.name)}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {row.medicinalUse}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2">
                                                        {row.details.description}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: "#777" }}>
                                                        Active Ingredients: {row.details.activeIngredients.join(', ')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography>
                                                        EGP {row.price}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            );
                        })}
                    </Container>
                </Paper >
            </Container >
        </>
    );
}
