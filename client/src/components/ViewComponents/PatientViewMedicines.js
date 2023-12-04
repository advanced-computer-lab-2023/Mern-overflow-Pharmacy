import React, { useEffect, useState, createContext, useContext } from "react";
import {
  InputAdornment,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Snackbar,
  Alert,
  ButtonGroup,
  CircularProgress,
  Grid,
  ButtonBase,
  Container,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Paper,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import panadol from "../../assets/photos/panadol.jpg";
import { styled } from "@mui/material/styles";
import { capitalize } from "../../utils";
import { useUser } from "../../userContest";

export default function PatientViewMedicines(props) {
  const { userId } = useUser();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChange, setLoadingChange] = useState(false);
  const [Query, setQuery] = useState("");
  const [uniqueMedicinalUses, setUniqueMedicinalUses] = useState(["All"]);
  const [counts, setCounts] = useState([]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const fetchTableData = () => {
    axios.get(`http://localhost:8000/medicines/view`, {}).then((res) => {
      setData(res.data);
      let temp = ["All"];
      res.data.map((key) => {
        if (temp.indexOf(key.medicinalUse) === -1) {
          temp.push(key.medicinalUse);
        }
        return null;
      });
      setUniqueMedicinalUses(temp);
      setCounts(new Array(res.data.length).fill(0));
      setTimeout(() => setLoading(false), 500);
    });
  };

  const handleAddMedicine = (medName, medPrice, medQuantity, e) => {
    e.preventDefault();
    e.stopPropagation();
    const requestData = {
      medName: medName,
      medPrice: medPrice,
      medQuantity: medQuantity,
    };
    setLoadingChange(true);
    axios
      .post(`http://localhost:8000/cart/${userId}/add`, requestData)
      .then((response) => {
        setLoadingChange(false);
        setSuccessOpen(true);
      })
      .catch((error) => {
        setLoadingChange(false);
        console.error("Error making POST request", error);
        setErrorOpen(true);

        setErrorMessage("Error adding medicine to cart: " + error.message);
      });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    let medUse = e.target.value;

    if (medUse === "" || medUse === "All") {
      fetchTableData();
    } else {
      axios
        .post(`http://localhost:8000/medicines/filter`, {
          medicinalUse: medUse,
        })
        .then((res) => {
          setData(res.data);
        });
    }
  };

  const handleClickOpen = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  return (
    <>
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
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
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
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ p: "20px", my: "40px", paddingBottom: 5 }}>
          {loading ? (
            <CircularProgress sx={{ mt: "30px" }} />
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
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </Container>
                  <Container sx={{ width: "48%" }}>
                    <FormControl fullWidth>
                      <InputLabel id="filter-by-medicinalUse">
                        Medicinal Use
                      </InputLabel>
                      <Select
                        onChange={(e) => handleFilter(e)}
                        sx={{ textAlign: "left" }}
                        labelId="filter-by-medicinalUse"
                        id="filter-by-medicinalUse-select"
                        label="medicinalUse"
                        uncontrolled="true"
                        fullWidth
                      >
                        {uniqueMedicinalUses.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                {data.map((row, index) => {
                  const count = 0;
                  return (
                    row.name.toLowerCase().includes(Query.toLowerCase()) &&
                    !row.isArchived && (
                      <Paper
                        sx={{
                          p: 2,
                          my: "20px",
                          width: "40%",
                          maxWidth: "465px",
                          flexGrow: 1,
                          boxShadow: "none",
                        }}
                      >
                        <Accordion elevation="3">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ py: "20px" }}
                          >
                            <ButtonBase sx={{ width: 128, height: "100%" }}>
                              <Img
                                alt={row.name}
                                src={`http://localhost:8000/images/${row.image}`}
                              />
                            </ButtonBase>
                            <Container
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                fontWeight="bold"
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                              >
                                {capitalize(row.name)}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                {row.medicinalUse}
                              </Typography>
                              <Container
                                sx={{
                                  width: "100%",
                                  display: "flex",
                                  flexWrap: "wrap",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  justifyItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <Typography
                                  sx={{ my: "10px", fontFamily: "monospace" }}
                                >
                                  EGP {row.price}
                                </Typography>
                                {row.overTheCounter ? (
                                  <div>
                                    <ButtonGroup
                                      disableElevation
                                      variant="outlined"
                                    >
                                      <Button
                                        onClick={(e) =>
                                          setCounts((prevCounts) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const updatedCounts = [
                                              ...prevCounts,
                                            ];
                                            updatedCounts[index] = Math.max(
                                              0,
                                              updatedCounts[index] - 1,
                                            );
                                            return updatedCounts;
                                          })
                                        }
                                      >
                                        {" "}
                                        -{" "}
                                      </Button>
                                      <Button
                                        style={{
                                          pointerEvents: "none",
                                          cursor: "not-allowed",
                                        }}
                                      >
                                        {counts[index]}
                                      </Button>
                                      <Button
                                        onClick={(e) =>
                                          setCounts((prevCounts) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const updatedCounts = [
                                              ...prevCounts,
                                            ];
                                            updatedCounts[index] = Math.min(
                                              100,
                                              updatedCounts[index] + 1,
                                            );
                                            return updatedCounts;
                                          })
                                        }
                                      >
                                        {" "}
                                        +{" "}
                                      </Button>
                                    </ButtonGroup>
                                    <IconButton
                                      sx={{ ml: "15px" }}
                                      disabled={!counts[index]}
                                      onClick={(e) => {
                                        if (counts[index] > 0) {
                                          handleAddMedicine(
                                            row.name,
                                            row.price,
                                            counts[index],
                                            e,
                                          );
                                          setSuccessMessage(
                                            counts[index] === 1
                                              ? `${counts[index]} ${capitalize(
                                                  row.name,
                                                )} has been added to your cart.`
                                              : `${counts[index]} ${capitalize(
                                                  row.name,
                                                )} have been added to your cart.`,
                                          );
                                          setCounts((prevCounts) => {
                                            const updatedCounts = [
                                              ...prevCounts,
                                            ];
                                            updatedCounts[index] = 0;
                                            return updatedCounts;
                                          });
                                        }
                                      }}
                                    >
                                      <AddShoppingCartIcon
                                        color={
                                          !counts[index] ? "grey" : "primary"
                                        }
                                      />
                                    </IconButton>
                                  </div>
                                ) : (
                                  <Typography>Prescription Needed </Typography>
                                )}
                              </Container>
                            </Container>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              variant="body1"
                              sx={{ textAlign: "left", mb: "5px" }}
                            >
                              {row.details.description}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ textAlign: "left", color: "#777" }}
                            >
                              Active Ingredients:{" "}
                              {row.details.activeIngredients.join(", ")}
                            </Typography>{" "}
                          </AccordionDetails>
                        </Accordion>
                      </Paper>
                    )
                  );
                })}
              </Container>
            </>
          )}
        </Paper>
        {loadingChange && (
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
            <CircularProgress sx={{ color: "white" }} />
          </div>
        )}
      </Container>
    </>
  );
}
