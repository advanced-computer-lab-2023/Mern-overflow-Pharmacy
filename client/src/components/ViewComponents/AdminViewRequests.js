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

export default function AdminViewRequests() {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [data, setData] = useState([]);
    const [Query, setQuery] = useState("");
    const [uniqueMedicinalUses, setUniqueMedicinalUses] = useState(["All"]);

    const fetchTableData = () => {
        axios
            .get(`http://localhost:8000/pharmacists/listAll`, {})
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
                    </Container>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="name">Name</TableCell>
                                <TableCell key="email">Email</TableCell>
                                <TableCell key="username">Username</TableCell>
                                <TableCell key="dateOfBirth">Date of Birth</TableCell>
                                <TableCell key="hourlyRate">Hourly Rate</TableCell>
                                <TableCell key="affiliation">Affiliation</TableCell>
                                <TableCell key="education">Education</TableCell>
                                <TableCell key="status">Status</TableCell>
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
                                            <TableCell>{row.dateOfBirth}</TableCell>
                                            <TableCell>EGP {row.hourlyRate}</TableCell>
                                            <TableCell>{row.affiliation}</TableCell>
                                            <TableCell>{row.education}</TableCell>
                                            <TableCell>{row.status}</TableCell>
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
