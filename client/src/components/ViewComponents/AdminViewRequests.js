import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Input, Snackbar, Alert, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

export default function AdminViewRequests(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Query, setQuery] = useState("");
    const statuses = ["all", "pending", "rejected"];
    const [allList, setAllList] = useState([]);
    const [rejectedList, setRejectedList] = useState([]);
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
                    }
                    tempAll.push(key);
                    return null;
                });
                setRejectedList(tempRej);
                setPendingList(tempPen);
                setAllList(tempAll);
                setTimeout(() => setLoading(false), 500);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleAccept = (id) => {
        axios.post(`http://localhost:8000/pharmacists/acceptPharmacist`,{id:id})
          .then((response) => {
            console.log('POST request successful', response);
            fetchTableData();
          })
          .catch((error) => {
            console.error('Error making POST request', error);
          });
      }
    
      const handleReject= (id) => {
        axios.post(`http://localhost:8000/pharmacists/rejectPharmacist`,{id:id})
          .then((response) => {
            console.log('POST request successful', response);
            fetchTableData();
          })
          .catch((error) => {
            console.error('Error making POST request', error);
          });
      }

    useEffect(() => {
        fetchTableData();
    }, [props.dataIsUpdated]);

    const handleFilter = (e) => {
        e.preventDefault();
        let selectedStatus = e.target.value;

        if (selectedStatus === "" || selectedStatus === "all") {
            setData(allList);
        } else if (selectedStatus === "rejected") {
            setData(rejectedList);
        } else {
            setData(pendingList);
        }
    };

    return (
        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }}>
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
                        </Container>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="name" sx={{ fontWeight: "bold" }}>Name</TableCell>
                                    <TableCell key="email" sx={{ fontWeight: "bold" }}>Email</TableCell>
                                    <TableCell key="username" sx={{ fontWeight: "bold" }}>Username</TableCell>
                                    <TableCell key="dateOfBirth" sx={{ fontWeight: "bold" }}>Birth Date</TableCell>
                                    <TableCell key="hourlyRate" sx={{ fontWeight: "bold" }}>Rate</TableCell>
                                    <TableCell key="affiliation" sx={{ fontWeight: "bold" }}>Affiliation</TableCell>
                                    <TableCell key="education" sx={{ fontWeight: "bold" }}>Education</TableCell>
                                    <TableCell key="files" sx={{ fontWeight: "bold" }}>Documents</TableCell>
                                    
                                    <TableCell sx={{ textAlign: 'center', fontWeight: "bold" }}>Status</TableCell>
                                    <TableCell sx={{fontWeight: "bold" }}>Action</TableCell>
                                    
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
                                                <TableCell>{
                                                    <ul>
                                                        {row.files.map((file, index) => (
                                                            <li key={index}>{file.filename}
                                                                <a href={`http://localhost:8000/uploads/` + file.filename} target="_blank">            View</a></li>
                                                        ))}
                                                    </ul>}</TableCell>
                                                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                                    {row.status === 'pending' ? <><PendingIcon style={{ color: '#1976d2', marginRight: '8px' }} /> Pending </> : null}
                                                    {row.status === 'rejected' ? <><CancelIcon style={{ color: '#d33c5c', marginRight: '8px' }} /> Rejected </> : null}
                                                    {row.status === 'accepted' ? <><CheckCircleIcon style={{ color: '#22bb33', marginRight: '8px' }} /> Accepted </> : null}
                                                </TableCell>

                                                <TableCell>
                                                {row.status === 'pending' ? 
                                                    <>
                                                    <IconButton onClick={() => handleAccept(row._id)}>
                                                        <DoneIcon />
                                                    </IconButton>

                                                    <IconButton onClick={() => handleReject(row._id)}>
                                                        <ClearIcon />
                                                    </IconButton>
                                                    </>
                                                 : null}
                                                </TableCell>
                                            </TableRow>
                                        ),
                                )}
                            </TableBody>
                        </Table>
                    </>
                )}
            </Paper>
        </Container >
    );
}
