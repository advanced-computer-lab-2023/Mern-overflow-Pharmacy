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
    key: "action",
    label: "ACTION",
  },
];

export default function AdminViewPatients() {
  const [data, setData] = useState([]);
  const [uniqueSpecialties, setUniqueSpecialties] = useState(["No filter"]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchTableData = () => {
    axios.get(`http://localhost:8000/patients`).then((res) => {
      let temp = ["No filter"];
      res.data.map((key) => {
        if (temp.indexOf(key.speciality) === -1) {
          temp.push(key.speciality);
        }
      });

      setUniqueSpecialties(temp);

      setData(res.data);
      setFilteredData(res.data);
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

  const handleFilter = (e) => {
    e.preventDefault();
    let filter = e.target.value;
    console.log(filter);

    let filteredData = data.filter(
      (row) => filter === "No filter" || row.speciality === filter,
    );
    setFilteredData(filteredData);
  };

  const searchItem = (query) => {
    if (!query) {
      setFilteredData(data);
      return;
    }
    const fuse = new Fuse(filteredData, {
      keys: ["name"],
      threshold: 0.3,
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setFilteredData(finalResult);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: '20px', my: '40px', paddingBottom: 5 }}>
        <Container>
          <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 5 }}>
            <Container sx={{ width: '48%' }}>
              <Input
                size="lg"
                bordered
                clearable
                placeholder="Search..."
                onChange={(e) => searchItem(e.target.value)}
                fullWidth
              />
            </Container>
            <Container sx={{ width: '48%' }}>
              <FormControl fullWidth>
                <InputLabel id="filter-by-speciality">Specialty</InputLabel>
                <Select
                  labelId="filter-by-speciality"
                  id="filter-by-speciality-select"
                  label="speciality"
                  uncontrolled="true"
                  onChange={handleFilter}
                  fullWidth
                >
                  {uniqueSpecialties.map((item) => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Container>
          </Container>
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
              {filteredData.map((row) => (
                <TableRow key={row.username}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.dateOfBirth}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
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
