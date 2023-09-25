import React from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { validationSchema } from "../utils/validationSchema";

const Homepage = () => {
  const router = useRouter();

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" component="h1">
            Homepage
          </Typography>
          <Formik
            initialValues={{ username: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (values.username.trim() !== "") {
                router.push(`/form?username=${values.username}`);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form style={{ width: "100%", marginTop: "16px" }}>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Enter your username"
                    variant="outlined"
                    fullWidth
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Box>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#EFD01B",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
