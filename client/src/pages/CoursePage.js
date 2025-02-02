import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";
import { API_BASE_URL } from "../config";
import AlertDialog from "../components/AlertDialog";

const CoursePage = () => {
  const { token, student } = useContext(AuthContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (confirmed) => {
    if (confirmed) {
      handleUnenroll();
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    if (!token || !student) {
      setLoading(true);
    }
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // 🔹 Include JWT token
          },
        });
        setCourse(response.data);

        setError(null);
        console.log(response.data.studentsEnrolled);
        console.log(student.studentId);

        const enrolled = response.data.studentsEnrolled?.includes(student.studentId);
        console.log(enrolled);
        setIsEnrolled(enrolled);
      } catch (err) {
        console.error(
          "Error fetching course:",
          err.response?.data?.message || err.message,
        );
        setError(err.response?.data?.message || "Failed to fetch course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, student]);

  const title = course?.title;
  const description = course?.description;
  const content = course?.content;

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/enroll/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      alert(response.data.message);
      setIsEnrolled(true);
    } catch (error) {
      console.error(
        "Enrollment error:",
        error.response?.data?.error || error.message,
      );
      alert(
        error.response?.data?.error || "An error occurred during enrollment.",
      );
    }
  };

  const handleUnenroll = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/enroll/unenroll/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsEnrolled(false);
    } catch (error) {
      console.error(
        "Unenrollment error:",
        error.response?.data?.error || error.message,
      );
      alert(
        error.response?.data?.error || "An error occurred during unenrollment.",
      );
    } finally {

    }
  };

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ textAlign: "center" }}>
          {error}
        </Alert>
      ) : (
        <div>
          <NavBar />
          <Container maxWidth="lg" sx={{}}>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h4" textAlign={"start"}>
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"start"}
                fontWeight={"bold"}
                sx={{ mt: 3 }}
              >
                Course Description:
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"start"}
                sx={{ ml: 2 }}
              >
                {`${description}`}
              </Typography>

              <Typography
                variant="subtitle1"
                textAlign={"start"}
                fontWeight={"bold"}
                sx={{ mt: 2 }}
              >
                Course Content:
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"start"}
                sx={{ ml: 2 }}
              >
                {content}
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "15px" }}
                  onClick={handleEnroll}
                  disabled={isEnrolled}
                >
                  {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </Button>
                {isEnrolled && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, borderRadius: "15px" }}
                    onClick={handleOpenDialog}
                  >
                    Unenroll
                  </Button>
                )}
              </Stack>
            </Box>
          </Container>
          <AlertDialog
            open={openDialog}
            title="Confirm Unenrollment"
            message="Are you sure you want to Unenroll?"
            onClose={handleCloseDialog}
            onConfirm={() => handleCloseDialog(true)}
          />
        </div>
      )}
    </div>
  );
};

export default CoursePage;
