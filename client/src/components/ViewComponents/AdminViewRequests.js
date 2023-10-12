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
    const statuses = ["all", "accepted", "pending", "rejected"];
    const [allList, setAllList] = useState([]);
    const [rejectedList, setRejectedList] = useState([]);
    const [acceptedList, setAcceptedList] = useState([]);
    const [pendingList, setPendingList] = useState([]);

    const fetchTableData = () => {
        axios
            .get(`http://localhost:8000/pharmacists/listAll`, {})
            .then((res) => {
                setData(res.data);
                let tempAll = [];
                let tempRej = [];
                let tempAcc = [];
                let tempPen = [];
                res.data.map((key) => {
                    if (key.status === 'pending') {
                        tempPen.push(key);
                    } else if (key.status === 'rejected') {
                        tempRej.push(key);
                    } else {
                        tempAcc.push(key);
                    }
                    tempAll.push(key);
                    return null;
                });
                setAcceptedList(tempAcc);
                setRejectedList(tempRej);
                setPendingList(tempPen);
                setAllList(tempAll);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
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

    const handleFilter = (e) => {
        e.preventDefault();
        let selectedStatus = e.target.value;

        if (selectedStatus === "" || selectedStatus === "all") {
            setData(allList);
        } else if (selectedStatus === "rejected") {
            setData(rejectedList);
        } else if (selectedStatus === "accepted") {
            setData(acceptedList);
        } else {
            setData(pendingList);
        }
    };

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
                                placeholder="Search by name..."
                                onChange={(e) => setQuery(e.target.value)}
                                fullWidth
                            />
                        </Container>
                        <Container sx={{ width: "48%" }}>
                            <FormControl fullWidth>
                                <InputLabel id="filter-by-status">Status</InputLabel>
                                <Select
                                    onChange={(e) => handleFilter(e)}
                                    sx={{ textAlign: 'left' }}
                                    labelId="filter-by-status"
                                    id="filter-by-status-select"
                                    label="status"
                                    uncontrolled="true"
                                    fullWidth
                                >
                                    {statuses.map((value) => (
                                        <MenuItem key={value} value={value}>{`${value.charAt(0).toUpperCase()}${value.slice(1)}`}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Container>
                    </Container>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="name" sx={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell key="email" sx={{ fontWeight: "bold" }}>Email</TableCell>
                                <TableCell key="username" sx={{ fontWeight: "bold" }}>Username</TableCell>
                                <TableCell key="dateOfBirth" sx={{ fontWeight: "bold" }}>Birth Date</TableCell>
                                <TableCell key="hourlyRate" sx={{ fontWeight: "bold"}}>Hourly Rate</TableCell>
                                <TableCell key="affiliation" sx={{ fontWeight: "bold"}}>Affiliation</TableCell>
                                <TableCell key="education" sx={{ fontWeight: "bold"}}>Education</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: "bold" }}>Status</TableCell>
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
                                                {row.status === 'rejected' ? <><CancelIcon style={{ color: '#d33c5c', marginRight: '8px' }} /> Rejected </> : null}
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
