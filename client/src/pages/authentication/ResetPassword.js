import PasswordIcon from "@mui/icons-material/Password";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { sha256 } from "js-sha256";
import axios from "axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPassword = new FormData(event.currentTarget).get("newPassword");
    axios
      .post("http://localhost:8000/auth/resetwithtoken", {
        newPassword: sha256(newPassword),
        token: searchParams.get("token") || "",
      })
      .then(() => {
        alert("Password reset successful!");
        navigate("/signin");
      })
      .catch(() => alert("Password reset failed!"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PasswordIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight={"bold"}>
            Password Reset
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              type="password"
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              autoComplete="current-password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
