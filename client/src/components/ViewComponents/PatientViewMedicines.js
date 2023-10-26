import React, { useEffect, useState } from "react";
import { Snackbar, Alert, ButtonGroup, CircularProgress, Grid, ButtonBase, Container, Card, CardHeader, CardMedia, CardContent, Typography, Button, Paper, FormControl, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Input, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from "axios";
import panadol from '../../assets/photos/panadol.jpg';
import { styled } from '@mui/material/styles';


export default function PatientViewMedicines() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Query, setQuery] = useState("");
    const [uniqueMedicinalUses, setUniqueMedicinalUses] = useState(["All"]);
    const [counts, setCounts] = useState([]);
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

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
                setCounts(new Array(res.data.length).fill(0));
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

    const handleClickOpen = (id) => {
        setOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    return (
        <>
            <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
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

                                                    </Grid>
                                                </Grid>
                                                <Grid item sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: "center", }}>
                                                    <Typography>
                                                        EGP {row.price}
                                                    </Typography>
                                                    <div>
                                                        <ButtonGroup
                                                            disableElevation
                                                            variant="outlined"
                                                        >
                                                            <Button onClick={() => setCounts(prevCounts => {
                                                                const updatedCounts = [...prevCounts];
                                                                updatedCounts[index] = Math.max(0, updatedCounts[index] - 1);
                                                                return updatedCounts;
                                                            })}> - </Button>
                                                            <Button style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>{counts[index]}</Button>
                                                            <Button onClick={() => setCounts(prevCounts => {
                                                                const updatedCounts = [...prevCounts];
                                                                updatedCounts[index] = Math.min(100, updatedCounts[index] + 1);
                                                                return updatedCounts;
                                                            })}> + </Button>
                                                        </ButtonGroup>
                                                        <IconButton sx={{ ml: "15px" }} disabled={!counts[index]} onClick={() => {
                                                            if (counts[index] > 0) {
                                                                setSuccessOpen(true);
                                                                setSuccessMessage(counts[index] == 1 ? `${counts[index]} ${capitalize(row.name)} has been added to your cart.` : `${counts[index]} ${capitalize(row.name)} have been added to your cart.`);
                                                                setCounts(prevCounts => {
                                                                    const updatedCounts = [...prevCounts];
                                                                    updatedCounts[index] = 0;
                                                                    return updatedCounts;
                                                                });
                                                            }
                                                        }}>
                                                            <AddShoppingCartIcon color={!counts[index]? "grey" : "primary"} />
                                                        </IconButton>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    );
                                })}
                            </Container>
                        </>
                    )}
                </Paper >
            </Container >
        </>
    );
}
