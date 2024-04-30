import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Select, MenuItem, FormControl, Snackbar, Alert } from "@mui/material";

const defaultTheme = createTheme();

export default function SignIn() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: "",
    severity: "error", // can be "error", "success", "info", or "warning"
  });
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarInfo({ message, severity });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState("patient");
  const [amka, setAmka] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ amka: "", password: "" });

  useEffect(() => {
    // Clear errors when userType changes
    setError({});
  }, [userType]);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "amka") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Only keep digits
      setAmka(numericValue);
      // Validate AMKA to be exactly 11 digits.
      if (numericValue && !/^\d{11}$/.test(numericValue)) {
        setError((prev) => ({
          ...prev,
          amka: "AMKA must be exactly 11 numeric digits.",
        }));
      } else {
        setError((prev) => ({ ...prev, amka: "" }));
      }
    } else if (name === "password") {
      setPassword(value);
      if (value) setError((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!amka) {
      setError((prev) => ({ ...prev, amka: "AMKA is required" }));
      hasError = true;
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    }

    if (hasError) {
      handleSnackbarOpen("Please fill in all required fields.", "error");
      return;
    }

    try {
      await login(amka, password, userType);
      navigate("/");
    } catch (error) {
      handleSnackbarOpen("Login failed: Invalid AMKA or Password", "error");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <FormControl fullWidth margin="normal">
            <Select
              value={userType}
              onChange={handleUserTypeChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="amka"
              label="AMKA"
              name="amka"
              autoFocus
              value={amka}
              onChange={handleChange}
              error={!!error.amka}
              helperText={error.amka}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
              error={!!error.password}
              helperText={error.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link component={RouterLink} to="/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarInfo.severity}
            sx={{ width: "100%" }}
          >
            {snackbarInfo.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
