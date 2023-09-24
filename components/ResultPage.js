import React from "react";
import {
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper,
} from "@mui/material";
import Link from "next/link";

const ResultPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "whitesmoke", 
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px",
            borderRadius: "8px",
            backgroundColor: "white", 
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h3" gutterBottom color="green">
            Congratulations!
          </Typography>
          <Typography variant="body1" paragraph>
            Your form has been submitted successfully.
          </Typography>
          <Link href="/" passHref>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#EFD01B",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              Back to Homepage
            </Button>
          </Link>
        </Paper>
      </Container>
    </div>
  );
};

export default ResultPage;
