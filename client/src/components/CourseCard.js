import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Typography,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";


const CourseCard = ({ course, onClick }) => {
    const { student } = useContext(AuthContext);
    const truncateText = (text, limit) => {
        if (text && text.length > limit) {
            return text.slice(0, limit) + "...";
        }
        return text;
    };

    const [isEnrolled, setIsEnrolled] = useState(false);

    return (
        <div>
            <Card
                onClick={onClick}
                sx={{
                    position: "relative",
                    width: "330px",
                    borderRadius: "15px",
                    minHeight: "100px",
                    boxShadow: 7,
                    padding: "16px",
                    overflow: "hidden",
                }}
            >
                <CardActionArea
                    sx={{
                        height: "100%",
                        "&[data-active]": {
                            backgroundColor: "action.selected",
                            "&:hover": {
                                backgroundColor: "action.selectedHover",
                            },
                        },
                    }}
                >
                    <CardContent sx={{ height: "100%" }}>
                        <Typography
                            variant="h6"
                            component="div"
                            textAlign={"center"}
                            sx={{
                                color: "secondary.darker",
                                backgroundColor: "primary.main",
                                padding: "6px",
                                borderRadius: "10px",
                                fontWeight: "500",
                            }}
                        >
                            {truncateText(course.title, 25)}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                textAlign: "justify",
                                marginBottom: 1,
                                marginTop: 1,
                                color: "#757575",
                            }}
                        >
                            {truncateText(course.description, 40)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default CourseCard;
