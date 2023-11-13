import React from "react";
import {
  Paper,
  CssBaseline,
  createTheme,
  ThemeProvider,
  TextField,
  Grid,
  Button,
  Box,
  Container,
  FormControl,
  Typography,
  Divider,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import logo from "../../assets/gifs/logo.gif";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../userContest";
import axios from "axios";
import sha256 from "js-sha256";

const defaultTheme = createTheme();

export default function SignIn() {
  const { userId, setUserId, userRole, setUserRole } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  axios.defaults.withCredentials = true;

  const onSubmit = (data) => {
    data["passwordHash"] = sha256(data["Password"]);
    data["username"] = data["Username"];
    delete data.Username;
    delete data.Password;
    console.log("Data to server" + JSON.stringify(data));
    axios
      .post("http://localhost:8000/auth/login", data)
      .then((response) => {
        console.log(response);
        const type = response.data.type;
        const userId = response.data.userId;
        setUserId(userId);
        console.log(type);
        if (type === "Patient") {
          setUserRole("Patient");
          navigate("/patient/medicines");
        } else if (type === "pharmacist") {
          setUserRole("Pharmacist");
          navigate("/pharmacist/medicines");
        } else if (type === "Adminstrator") {
          setUserRole("Adminstrator");
          navigate("/admin/patients");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log(errors);

  const handleChange = (event) => {
    if (errors[event.target.name]) {
      setError(event.target.name, {
        type: errors[event.target.name]["type"],
        message: errors[event.target.name]["type"],
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundSize: "cover",
            backgroundColor: "#132629",
            backgroundPosition: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              position: "fixed",
              top: "15%",
              left: "20%",
            }}
          >
            El7a2ni Pharmacy
          </Typography>
          <img
            src={logo}
            alt=""
            style={{
              height: "50%",
              position: "fixed",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 0, bgcolor: "secondary.main", width: 40, height: 40 }}
            >
              <LockOpenIcon sx={{ width: 30, height: 30 }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
              {" "}
              Sign in{" "}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
              <Grid container md={12} spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    id="username"
                    type="text"
                    label="Username"
                    required
                    {...register("Username", { required: true, maxLength: 80 })}
                    error={!!errors["Username"]}
                    helperText={errors["Username"]?.message}
                    onBlur={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    required
                    {...register("Password", { required: true, maxLength: 80 })}
                    error={!!errors["Password"]}
                    helperText={errors["Password"]?.message}
                    onBlur={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 2, fontWeight: "bold" }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 2, fontWeight: "bold" }}
                component={Link}
                to="/auth/forgotpassword"
              >
                Forgot Password
              </Button>
            </Box>

            <Typography
              sx={{
                align: "center",
                width: "100%",
                mt: 5,
                mb: 2,
                fontWeight: "bold",
                color: "#555",
              }}
              variant="h6"
            >
              {" "}
              OR{" "}
            </Typography>
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2, p: 2, fontWeight: "bold" }}
              component={Link}
              to="/register/patient"
            >
              Patient Registration
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2, p: 2, fontWeight: "bold" }}
              component={Link}
              to="/register/pharmacist"
            >
              Pharmacist Registration
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

