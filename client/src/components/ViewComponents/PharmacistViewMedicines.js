import {
    Input,
    Tooltip,
    Container,
    Button,
    List,
    ListItem,
    Paper,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios";

export default function PharmacistViewMedicines() {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
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

            // axios
            //     .get(`http://localhost:8000/medicines/filter`, {
            //         data: {
            //             medicinalUse: medUse,
            //         }
            //     })
            //     .then((res) => {
            //         setData(res.data);
            //         console.log(medUse);
            //     });
        }
    };

    const handleDetails = (id) => {
        setTooltipOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }

    const handleCloseTooltip = () => {
        setSelectedRowId(null);
        setTooltipOpen(false);
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
                                <TableCell key="name">Name</TableCell>
                                <TableCell key="medicinalUse">Medicinal Use</TableCell>
                                <TableCell key="price">Price</TableCell>
                                <TableCell key="availableQuantity">Available Quantity</TableCell>
                                <TableCell key="sales">Sales</TableCell>
                                <TableCell key="details" sx={{ textAlign: 'right' }}>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(
                                (row) =>
                                    row.name.toLowerCase().includes(Query.toLowerCase()) && (
                                        <TableRow key={row.username}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.medicinalUse}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.availableQuantity}</TableCell>
                                            <TableCell>{row.sales}</TableCell>
                                            <TableCell sx={{ textAlign: 'right' }}>
                                                <IconButton onClick={() => handleDetails(row._id)}>
                                                    <InfoOutlinedIcon />
                                                </IconButton>
                                                <Tooltip
                                                    open={tooltipOpen[row._id] || false}
                                                    onClose={handleCloseTooltip}
                                                    title={
                                                        <div style={{ whiteSpace: 'pre-line' }}>
                                                            {`Description: ${row.details.description}\n\nActive Ingredients: ${row.details.activeIngredients}`}
                                                        </div>
                                                    }
                                                >
                                                    <span />
                                                </Tooltip>
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
