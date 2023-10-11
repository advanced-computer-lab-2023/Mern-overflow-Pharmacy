import {
  Input,
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

export default function DoctorViewPatients() {
  const [data, setData] = useState([]);
  const [Query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState({});
  console.log(selectedPatient);

  const id = "6526a25ec258c85350a575cd";

  const fetchTableData = () => {
    axios
      .get(`http://localhost:8000/doctors/${id}/patients`, {
        params: { id: id },
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
      axios
        .get(`http://localhost:8000/doctors/${id}/res`, {
          params: { id: id },
        })
        .then((res) => {
          setData(res.data);
        });
    }
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
        </Container>
      </Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="name">Name</TableCell>
            <TableCell key="email">Email</TableCell>
            <TableCell key="dateOfBirth">Date of Birth</TableCell>
            <TableCell key="gender">Gender</TableCell>
            <TableCell key="mobileNumber">Mobile Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (row) =>
              row.name.toLowerCase().includes(Query.toLowerCase()) && (
                <TableRow key={row.username}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.dateOfBirth}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell>
                    <Button onClick={() => setSelectedPatient(row)}>
                      Select Patient
                    </Button>
                  </TableCell>
                </TableRow>
              ),
          )}
        </TableBody>
      </Table>
      {typeof selectedPatient.name !== "undefined" && (
        <List>
          <ListItem>{"Name: " + selectedPatient.name}</ListItem>
          <ListItem>{"Email: " + selectedPatient.email}</ListItem>
          <ListItem>{"Date of Birth: " + selectedPatient.dateOfBirth}</ListItem>
          <ListItem>{"Gender: " + selectedPatient.gender}</ListItem>
          <ListItem>
            {"Mobile Number: " + selectedPatient.mobileNumber}
          </ListItem>
          {
            //   selectedPatient.emergencyContact.map((item) => {
            //   <>
            //     <ListItem>{item.name}</ListItem>
            //     <ListItem>{item.name}</ListItem>
            //     <ListItem>{item.name}</ListItem>
            //   </>;
            // })
          }
        </List>
      )}
    </Container>
  );
}
