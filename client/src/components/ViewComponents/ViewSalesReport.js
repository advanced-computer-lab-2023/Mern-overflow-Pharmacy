import {
  Alert,
  CircularProgress,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableFooter,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TextField, Grid } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

export default function ViewSalesReport() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uniqueMedicines, setUniqueMedicines] = useState([]);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [filter, setFilter] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState("all");

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    handleFilterByDate("");
  }, [filter]);

  const handleFilterByDate = (e) => {
    if (e === undefined) {
      return;
    }
    let selectedDate = e.$d;
    if (selectedDate !== undefined) {
      let userTimezoneOffset = selectedDate.getTimezoneOffset() * 60000;

      selectedDate = new Date(
        selectedDate.getTime() - userTimezoneOffset,
      ).toISOString();
    }
    console.warn(
      "DEBUGPRINT[7]: ViewSalesReport.js:64: selectedDate=",
      selectedDate,
    );
    axios
      .get(`http://localhost:8001/orders/salesreport`, {
        params: { date: selectedDate, filter: filter },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        let temp = [];
        res.data.map((key) => {
          if (temp.indexOf(key.name) === -1) {
            temp.push(key.name);
          }
          return null;
        });
        setUniqueMedicines(temp);
        setTimeout(() => setLoading(false), 500);
      });
  };
  const handleSetFilter = (e) => {
    setFilter(e.target.value === "true");
  };

  const handleFilterByMedicine = (e) => {
    setSelectedMedicine(e.target.value);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Snackbar
          open={errorOpen}
          autoHideDuration={5000}
          onClose={handleErrorClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleErrorClose}
            severity="error"
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleSuccessClose}
            severity="success"
          >
            {successMessage}
          </Alert>
        </Snackbar>

        <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }}>
          {loading ? (
            <CircularProgress sx={{ mt: "30px" }} />
          ) : (
            <>
              <Container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 5,
                }}
              >
                <Container sx={{ width: "48%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {filter === false ? (
                      <DatePicker
                        sx={{ width: "100%" }}
                        openTo="month"
                        views={["year", "month"]}
                        label="Select Date to filter by"
                        onMonthChange={handleFilterByDate}
                        defaultValue={dayjs(Date.now())}
                      ></DatePicker>
                    ) : (
                      <DatePicker
                        sx={{ width: "100%" }}
                        openTo="day"
                        views={["year", "month", "day"]}
                        mask="____-__-__"
                        format="DD-MM-YYYY"
                        label="Select Date to filter by"
                        inputFormat="DD-MM-YYYY"
                        onAccept={handleFilterByDate}
                      ></DatePicker>
                    )}
                  </LocalizationProvider>
                  <InputLabel id="filter-by-date">
                    Filter By Month Only?
                  </InputLabel>
                  <Select
                    onChange={(e) => handleSetFilter(e)}
                    sx={{ textAlign: "left" }}
                    labelId="filter-by-date"
                    id="filter-by-date-select"
                    label="fiterByDate"
                    uncontrolled="true"
                    defaultValue="false"
                    fullWidth
                  >
                    <MenuItem key="false" value="false">
                      Filter By Month Only
                    </MenuItem>
                    <MenuItem key="true" value="true">
                      Filter By Day
                    </MenuItem>
                  </Select>
                  <Container sx={{ width: "48%" }}>
                    <InputLabel id="filter-by-medicine">
                      Medicines to show
                    </InputLabel>
                    <Select
                      onChange={(e) => handleFilterByMedicine(e)}
                      sx={{ textAlign: "left" }}
                      labelId="filter-by-medicine"
                      id="filter-by-medicine-select"
                      label="medicine"
                      uncontrolled="true"
                      defaultValue="all"
                      fullWidth
                    >
                      <MenuItem key="all" value="all">
                        Show All
                      </MenuItem>
                      {uniqueMedicines.map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Container>
                </Container>
              </Container>

              <Container
                sx={{
                  p: "20px",
                  my: "40px",
                  paddingBottom: 5,
                  maxWidth: 350,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {loadingEdit && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      background: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 9999,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CircularProgress color="primary" />
                  </div>
                )}
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Container>
                    {data.length !== 0 ? (
                      <Container>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell key="name" sx={{ fontWeight: "bold" }}>
                                Name
                              </TableCell>
                              <TableCell
                                key="sales"
                                sx={{ fontWeight: "bold" }}
                              >
                                Sales
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.map(
                              (row) =>
                                (selectedMedicine === "all" ||
                                  row.name === selectedMedicine) && (
                                  <TableRow key={row.name + row.sales}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>EGP {row.sales}</TableCell>
                                  </TableRow>
                                ),
                            )}
                          </TableBody>
                        </Table>
                        <br />
                        <Typography>
                          <b>Total: </b> EGP{" "}
                          {data.reduce(
                            (acc, row) =>
                              selectedMedicine === "all" ||
                              row.name === selectedMedicine
                                ? acc + parseFloat(row.sales)
                                : acc,
                            0,
                          )}
                        </Typography>
                      </Container>
                    ) : (
                      <Typography>
                        There were no sales on the chosen date/month, please
                        select another.
                      </Typography>
                    )}
                  </Container>
                </Container>
              </Container>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}
