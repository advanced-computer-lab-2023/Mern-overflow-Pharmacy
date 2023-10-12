import { Input, InputLabel, TextField, Grid, Select, MenuItem, Button, Box, Container, FormControl, Typography, Divider, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Fuse from "fuse.js";
import axios from "axios";

const columns = [
  {
    key: "username",
    label: "Username",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "dateOfBirth",
    label: "Birth Date",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "mobileNumber",
    label: "Phone No.",
  },
  {
    key: "emergencyName",
    label: "Emergency Contact Name",
  },
  {
    key: "emergencyMobileNumber",
    label: "Emergency Phone No.",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function AdminViewPatients(props) {
  const [data, setData] = useState([]);

  const fetchTableData = () => {
    axios.get(`http://localhost:8000/patients`).then((res) => {
      setData(res.data);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/patients/${id}`)
      .then((response) => {
        console.log('DELETE request successful', response);
        fetchTableData();
      })
      .catch((error) => {
        console.error('Error making DELETE request', error);
        alert('Error making DELETE request: ' + error.message);
      });
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: '20px', my: '40px', paddingBottom: 5 }}>
        <Container>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={6} sx={{ fontWeight: "bold", textAlign: "center", borderBottom:'none', borderRight: '1px solid #ccc' }}>PATIENT</TableCell>
                <TableCell colSpan={3} sx={{ fontWeight: "bold", textAlign: "center", color: '#5A5A5A', borderBottom:'none', borderRight: '1px solid #ccc' }}>EMERGENCY CONTACT</TableCell>
                <TableCell key="action" sx={{ textAlign: 'center', fontWeight: "bold", borderBottom: 'none' }}>ACTION</TableCell>

              </TableRow>
              <TableRow>
                <TableCell key="name" sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell key="email" sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell key="username" sx={{ fontWeight: "bold" }}>Username</TableCell>
                <TableCell key="dateOfBirth" sx={{ fontWeight: "bold" }}>Birth Date</TableCell>
                <TableCell key="gender" sx={{ fontWeight: "bold" }}>Gender</TableCell>
                <TableCell key="mobileNumber" sx={{ fontWeight: "bold", borderRight: '1px solid #ccc' }}>Phone No.</TableCell>
                <TableCell key="emergencyContactName" sx={{ fontWeight: "bold", color: '#5A5A5A' }}>Name</TableCell>
                <TableCell key="emerencyContactMobileNumber" sx={{ fontWeight: "bold", color: '#5A5A5A' }}>Phone No.</TableCell>
                <TableCell key="emerencyContactRelation" sx={{ fontWeight: "bold", color: '#5A5A5A', borderRight: '1px solid #ccc' }}>Relation</TableCell>
                <TableCell sx={{textAlign: 'center', fontWeight: "bold"}}>Delete</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.username}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.dateOfBirth.slice(0, 10)}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell sx={{borderRight: '1px solid #ccc'}} >{row.mobileNumber}</TableCell>
                  <TableCell sx={{ color: '#5A5A5A' }}>{row.emergencyContact.name}</TableCell>
                  <TableCell sx={{ color: '#5A5A5A' }}>{row.emergencyContact.mobileNumber}</TableCell>
                  <TableCell sx={{ color: '#5A5A5A', borderRight: '1px solid #ccc' }}>{row.emergencyContact.relation}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </Paper>
    </Container>

  );
}