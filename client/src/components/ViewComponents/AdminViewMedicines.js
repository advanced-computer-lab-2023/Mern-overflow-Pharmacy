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

export default function AdminViewMedicines() {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [data, setData] = useState([]);
    const [Query, setQuery] = useState("");

    const fetchTableData = () => {
        axios
            .get(`http://localhost:8000/medicines/viewAll`, {
            })
            .then((res) => {
                setData(res.data);
            });
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleFilter = (e) => {
        e.preventDefault();
        let filter = e.target.value;

        if (filter === "all") {
            fetchTableData();
        } else {
            // axios
            //     .get(`http://localhost:8000/doctors/${id}/res`, {
            //         params: { id: id },
            //     })
            //     .then((res) => {
            //         setData(res.data);
            //     });
        }
    };

    const handleDetails = (id) => {
        // axios.delete(`http://localhost:8000/patients/${id}`)
        //     .then((response) => {
        //         console.log('DELETE request successful', response);
        //         fetchTableData();
        //     })
        //     .catch((error) => {
        //         console.error('Error making DELETE request', error);
        //     });

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
                                bordered
                                clearable
                                placeholder="Search..."
                                onChange={(e) => setQuery(e.target.value)}
                                fullWidth
                            />
                        </Container>
                        <Container sx={{ width: "48%" }}>
                            <FormControl fullWidth>
                                <InputLabel id="filter-by-status">Status</InputLabel>
                                <Select
                                    labelId="filter-by-status"
                                    id="filter-by-status-select"
                                    label="status"
                                    uncontrolled="true"
                                    onChange={handleFilter}
                                    fullWidth
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="upcoming">Upcoming</MenuItem>
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
