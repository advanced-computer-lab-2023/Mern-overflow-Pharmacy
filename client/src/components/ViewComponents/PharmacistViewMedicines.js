import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, ButtonBase, Container, Card, CardHeader, CardMedia, CardContent, Typography, Button, Paper, FormControl, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Input, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadIcon from '@mui/icons-material/Upload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";
import panadol from '../../assets/photos/panadol.jpg';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function PharmacistViewMedicines(props) {
    const theme = useTheme();

    const navigate = useNavigate();
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

    const capitalize = (string) => {
        return string.replace(/\b\w/g, function (match) {
            return match.toUpperCase();
        });
    };

    const fetchTableData = () => {
        axios
            .get(`http://localhost:8000/medicines/viewAll`, {})
            .then((res) => {
                setData(res.data);
                props.setDataIsUpdated(true);
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
    }, [props.dataIsUpdated]);

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

    const handleClickEdit = (id) => {
        navigate(`/pharmacist/medicines/${id}`);
    };

    return (
        <>
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
                                {data.map(
                                    (row) =>
                                        row.name.toLowerCase().includes(Query.toLowerCase()) && (
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
                                                                <Typography variant="body2" sx={{ color: "#777", mt: '15px' }}>
                                                                    {row.overTheCounter == true ? "Over the counter medicine" : "Prescription needed"}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: "center", }}>
                                                        <Typography>
                                                            EGP {row.price}
                                                        </Typography>
                                                        <Typography>
                                                            {row.availableQuantity} In stock
                                                        </Typography>
                                                        <Typography>
                                                            {row.sales} Sold
                                                        </Typography>
                                                        <IconButton onClick={() => handleClickEdit(row._id)} sx={{ '&:hover': { color: theme.palette.info.main } }}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        ),
                                )}
                            </Container>
                        </>
                    )}
                </Paper >
            </Container >
        </>
    );
}
