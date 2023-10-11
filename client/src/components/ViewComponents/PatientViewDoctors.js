import { Input, Container } from "@mui/material";
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

  const fetchTableData = () => {
    axios.get(`http://localhost:8000/patients`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <Container>
      <Container>
        <Input
          size="lg"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="name">Name</TableCell>
            <TableCell key="speciality">Specialty</TableCell>
            <TableCell key="hourlyRate">Hourly Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (row) =>
              row.name.toLowerCase().includes(Query.toLowerCase()) && (
                <TableRow key={row.username}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.speciality}</TableCell>
                  <TableCell>{row.hourlyRate}</TableCell>
                </TableRow>
              ),
          )}
        </TableBody>
      </Table>
    </Container>
  );
}
