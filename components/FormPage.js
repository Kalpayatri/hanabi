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
import * as Yup from "yup";

const validationFormSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]*$/, "Phone Number must contain only numbers"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  name: Yup.string().required("Name is required"),
  dob: Yup.string().required("Date of Birth is required"),
});

const FormPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const initialFormData = {
    phoneNumber: "",
    email: "",
    name: "",
    dob: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push(`/result?username=${username}`);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setSubmitting(false);
  };

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
            Register
          </Typography>
          <Formik
            initialValues={initialFormData}
            validationSchema={validationFormSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form style={{ width: "100%", marginTop: "16px" }}>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="dob"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    error={touched.dob && Boolean(errors.dob)}
                    helperText={touched.dob && errors.dob}
                  />
                </Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "16px",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#EFD01B", color: "black" }}
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    style={{ marginLeft: "8px" }} 
                    onClick={() => router.push("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default FormPage;
