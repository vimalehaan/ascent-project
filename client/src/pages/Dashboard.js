import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    CircularProgress,
    Stack,
    Button,
} from "@mui/material";

import CourseCard from "../components/CourseCard";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import {API_BASE_URL} from "../config";

const Dashboard = () => {
    const navigate = useNavigate();
    const { token, student } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token || !student) {
            setLoading(true);
        }
        const fetchCourses = async () => {
            try {
                const response = await axios.get( `${API_BASE_URL}/api/courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourses(response.data.courses);
                setError(null);
            } catch (error) {
                console.error(
                    "Error fetching courses:",
                    error.response?.data?.error || error.message,
                );
                setError(
                    error.response?.data?.error ||
                    "An error occurred while fetching courses.",
                );
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div>
            <NavBar />
            <Container maxWidth="lg" sx={{}}>
                <Box sx={{ width: "100%", minHeight: "100vh", p: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Typography variant="h4" textAlign={"start"} fontWeight={"600"}>
                            Courses
                        </Typography>
                    </Stack>
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                                gap: "30px 55px",
                                mt: 3,
                            }}
                        >
                            {courses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    onClick={() => handleClick(course.id)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default Dashboard;
