import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment, Accordion, AccordionDetails, AccordionSummary, ButtonBase, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import axios from "axios";
import panadol from '../../assets/photos/panadol.jpg';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { capitalize } from '../../utils'

export default function AdminViewMedicines() {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Query, setQuery] = useState("");
    const [uniqueMedicinalUses, setUniqueMedicinalUses] = useState(["All"]);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

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
                setTimeout(() => setLoading(false), 500);
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


        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }} >
                {loading ? (
                    <CircularProgress sx={{ mt: '30px' }} />
                ) : (
                    <>
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
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
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
                                            boxShadow: "none"
                                        }}
                                    >
                                        <Accordion elevation="3">
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: "20px" }} >
                                                <ButtonBase sx={{ width: 128, height: '100%' }}>
                                                    <Img alt={row.name} src={panadol} />
                                                </ButtonBase>
                                                <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                                    <Typography fontWeight="bold" gutterBottom variant="subtitle1" component="div">
                                                        {capitalize(row.name)}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {row.medicinalUse}
                                                    </Typography>
                                                    <Container sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: "center", justifyItems: "center", flexDirection: "column" }}>
                                                        <Typography sx={{ my: "10px", fontFamily: "monospace" }}>
                                                            EGP {row.price}
                                                        </Typography>
                                                        {row.overTheCounter ? (<></>
                                                        ) : <></>}
                                                    </Container>
                                                </Container>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" sx={{ textAlign: "left", mb: "5px" }}>
                                                    {row.details.description}
                                                </Typography>
                                                <Typography variant="body1" sx={{ textAlign: "left", color: "#777", mb: "5px"  }}>
                                                    Active Ingredients: {row.details.activeIngredients.join(', ')}
                                                </Typography>
                                                <Typography variant="body1" sx={{ color: "#777", textAlign: "center" }}>
                                                    {row.overTheCounter? "Over the Counter" : "Prescription Needed"}
                                                </Typography>

                                            </AccordionDetails>
                                        </Accordion>
                                    </Paper>
                                );
                            })}
                        </Container>
                    </>
                )}
            </Paper >
        </Container >
    );
}
