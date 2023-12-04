import React, { useEffect, useState } from "react";
import {
  Snackbar,
  Alert,
  InputAdornment,
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import UploadIcon from "@mui/icons-material/Upload";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import panadol from "../../assets/photos/panadol.jpg";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils";
import Archive from "@mui/icons-material/Archive";

export default function PharmacistViewMedicines(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Query, setQuery] = useState("");
  const [uniqueMedicinalUses, setUniqueMedicinalUses] = useState(["All"]);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const fetchTableData = () => {
    axios.get(`http://localhost:8000/medicines/viewAll`, {}).then((res) => {
      setData(res.data);
      props.setDataIsUpdated(true);
      let temp = ["All"];
      res.data.map((key) => {
        if (temp.indexOf(key.medicinalUse) === -1) {
          temp.push(key.medicinalUse);
        }
        return null;
      });
      setUniqueMedicinalUses(temp);
      setTimeout(() => setLoading(false), 500);
    });
  };

  useEffect(() => {
    fetchTableData();
  }, [props.dataIsUpdated]);

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

  const handleClickEdit = (id) => {
    navigate(`/pharmacist/medicines/${id}`);
  };

  const handleClickArchive = (id, isArchived) => {
    setLoadingEdit(true);
    axios
      .put(`http://localhost:8000/medicines/${id}/archive`)
      .then((response) => {
        isArchived == true
          ? setSuccessMessage("Medicine has been unarchived succesfully")
          : setSuccessMessage("Medicine has been archived succesfully");
        setSuccessOpen(true);
        setErrorOpen(false);
        setLoadingEdit(false);
        fetchTableData();
      })
      .catch((error) => {
        console.error("Error making PUT request", error);
        setErrorMessage(error.response.data.message || "Unknown error");
        setErrorOpen(true);
        setSuccessOpen(false);
        setLoadingEdit(false);
      });
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
                {data.map(
                  (row) =>
                    row.name.toLowerCase().includes(Query.toLowerCase()) && (
                      <Paper
                        sx={{
                          p: 2,
                          my: "20px",
                          width: "40%",
                          maxWidth: "465px",
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
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#777",
                                textAlign: "center",
                                mt: "10px",
                              }}
                            >
                              {row.overTheCounter
                                ? "Over the Counter"
                                : "Prescription Needed"}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#777",
                                textAlign: "center",
                                mt: "10px",
                              }}
                            >
                              {row.isArchived
                                ? "Medicine is archived"
                                : "Medicine is visible"}
                            </Typography>
                            <Container
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                                mt: "10px",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    row.availableQuantity === 0
                                      ? "red"
                                      : "green",
                                }}
                              >
                                {row.availableQuantity} In stock
                              </Typography>
                              <Typography>{row.sales} Sold</Typography>
                              <IconButton
                                onClick={() => handleClickEdit(row._id)}
                                sx={{
                                  "&:hover": { color: theme.palette.info.main },
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  handleClickArchive(row._id, row.isArchived)
                                }
                                sx={{
                                  "&:hover": { color: theme.palette.info.main },
                                }}
                              >
                                {row.isArchived ? (
                                  <>
                                    <UnarchiveIcon />
                                    <Typography sx={{ ml: "3px" }}>
                                      Unarchive
                                    </Typography>
                                  </>
                                ) : (
                                  <>
                                    <ArchiveIcon />
                                    <Typography sx={{ ml: "3px" }}>
                                      Archive
                                    </Typography>
                                  </>
                                )}
                              </IconButton>
                            </Container>
                          </AccordionDetails>
                        </Accordion>
                      </Paper>
                    ),
                )}
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
              </Container>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}
