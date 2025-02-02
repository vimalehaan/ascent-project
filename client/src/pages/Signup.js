import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Grid2,
    Link,
    Stack,
} from "@mui/material";

import {formValidation} from "../functions/FormValidation";
import {API_BASE_URL} from "../config";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const { isValid, errors } = formValidation(formData);
        if (isValid) {
            try {
                await axios.post(
                    `${API_BASE_URL}/api/students/register`,
                    {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    },
                );
                navigate("/login");
            } catch (error) {
                if (error.response) {
                    console.error("Error:", error.response.data.error);
                    alert(`Error: ${error.response.data.error}`)
                } else {
                    console.error("Request error:", error.message);
                    alert(`Error: ${error.message}`)
                }
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <div>
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100vh",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        p: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: "20px",
                        boxShadow: 5,
                        width: "60%",
                    }}
                >
                    <Typography variant="h5">Sign Up</Typography>
                    <Box sx={{ width: "100%", mt: "20px" }}>
                        <Grid2 container spacing={4} sx={{ width: "100%" }}>
                            <Grid2 size={12} sx={{ width: "100%" }}>
                                <TextField
                                    variant={"outlined"}
                                    label={"Name"}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name}
                                    sx={{ width: "100%" }}
                                />
                            </Grid2>
                            <Grid2 size={12} sx={{ width: "100%" }}>
                                <TextField
                                    variant={"outlined"}
                                    label={"Email"}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                    sx={{ width: "100%" }}
                                />
                            </Grid2>
                            <Grid2 size={12} sx={{ width: "100%" }}>
                                <TextField
                                    variant={"outlined"}
                                    label={"Password"}
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}
                                    sx={{ width: "100%" }}
                                />
                            </Grid2>
                            <Grid2 size={12} sx={{ width: "100%" }}>
                                <TextField
                                    variant={"outlined"}
                                    label={"Confirm Password"}
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword}
                                    sx={{ width: "100%" }}
                                />
                            </Grid2>

                            <Stack
                                direction="row"
                                spacing={4}
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Button variant={"contained"} onClick={handleSubmit}>
                                    Register
                                </Button>
                                <Link href="/login" underline="hover">
                                    {"Already have an account?"}
                                </Link>
                            </Stack>
                        </Grid2>
                    </Box>
                </Box>
            </Container>

        </div>
    );
};

export default Signup;
