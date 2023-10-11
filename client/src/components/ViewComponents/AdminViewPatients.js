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
    label: "USERNAME",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "dateOfBirth",
    label: "DATE OF BIRTH",
  },
  {
    key: "gender",
    label: "GENDER",
  },
  {
    key: "mobileNumber",
    label: "MOBILE NUMBER",
  },
  {
    key: "emergencyName",
    label: "EMERGENCY CONTACT NAME",
  },
  {
    key: "emergencyMobileNumber",
    label: "EMERGENCY MOBILE NUMBER",
  },
  {
    key: "action",
    label: "ACTION",
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
          });
  }

  useEffect(() => {
      fetchTableData();
  }, []);

  return (
      <Container maxWidth="xl">
          <Paper elevation={3} sx={{ p: '20px', my: '40px', paddingBottom: 5 }}>
              <Container>
                  <Container>
                      <Table>
                          {/* ... rest of the code ... */}
                      </Table>
                  </Container>

                  <Table>
                      <TableHead>
                          <TableRow>
                              {columns.map((column) => (
                                  <TableCell key={column.key}>{column.label}</TableCell>
                              ))}
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {data.map((row) => (
                              <TableRow key={row.username}>
                              <TableCell>{row.username}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>{row.dateOfBirth}</TableCell>
                              <TableCell>{row.gender}</TableCell>
                              <TableCell>{row.mobileNumber}</TableCell>
                              <TableCell>{row.emergencyContact.name}</TableCell>
                              <TableCell>{row.emergencyContact.mobileNumber}</TableCell>
                              <TableCell>
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