import { Box, Typography, Button, Container, Paper, TextField } from "@mui/material";
import axios from 'axios';
import sha256 from 'js-sha256';
import { useForm } from "react-hook-form"

const AddAdmin = (props) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = data => {
    const dataToServer = { ...data };
    dataToServer["passwordHash"] = sha256(data["password"]);
    delete dataToServer.password
    console.log(dataToServer);
    axios.post('http://localhost:8000/adminstators', dataToServer)
      .then((response) => {
        console.log('POST request successful', response);
        props.setDataIsUpdated(false);
      })
      .catch((error) => {
        console.error('Error making POST request', error);
      });

  }

  const handleChange = (event) => {
    if (errors[event.target.name]) {
      setError(event.target.name,
        {
          type: errors[event.target.name]["type"],
          message: errors[event.target.name]["type"]
        })
    }
  }


  return (

    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: '20px', my: '40px' }}>
        <Typography variant="h6" sx={{ mb: 4 }}> Add a New Admin to the System </Typography>
        <Box component="form" sx={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="username"
            label="Username"
            {...register("username", { required: true, maxLength: 80 })}
            error={!!errors["username"]}
            helperText={errors["username"]?.message}
            onBlur={handleChange}
            sx={{ mr: "2%" }} fullWidth />

          <TextField
            id="password"
            label="Password"
            {...register("password", { required: true, maxLength: 80 })}
            error={!!errors["password"]}
            helperText={errors["password"]?.message}
            onBlur={handleChange}
            sx={{ mr: "2%" }} type="password" fullWidth />
          <Button type="submit" variant="outlined" fullWidth sx={{ p: 1.8, fontWeight: 'bold' }}>
            Add Admin
          </Button>
        </Box>
      </Paper>
    </Container>

  );
}

export default AddAdmin;