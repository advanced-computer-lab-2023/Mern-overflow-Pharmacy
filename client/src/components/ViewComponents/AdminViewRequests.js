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
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";

export default function AdminViewRequests(props) {
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
    }, [props.dataIsUpdated]);

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
                                {[
                                    "Name", "Email", "Username",
                                    "Birth Date", "Hourly Rate",
                                    "Affiliation", "Education", "Status"
                                ].map(header => (
                                    <TableCell key={header} style={{ fontWeight: "bold" }}>
                                        {header}
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
                                            <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                                {row.status === 'pending' ? <><PendingIcon style={{ color: '#1976d2', marginRight: '8px' }} /> Pending </> : null}
                                                {row.status === 'rejected' ? <><CancelIcon style={{ color: '#bb2124', marginRight: '8px' }} /> Rejected </> : null}
                                                {row.status === 'accepted' ? <><CheckCircleIcon style={{ color: '#22bb33', marginRight: '8px' }} /> Accepted </> : null}
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
