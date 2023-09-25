import React, { useEffect, useState } from "react";
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

const getValidationSchema = (isEdit) => {
  return Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]*$/, "Phone Number must contain only numbers"),
    email: isEdit
      ? Yup.string().email("Invalid email address")
      : Yup.string()
          .required("Email is required")
          .email("Invalid email address"),
    name: Yup.string().required("Name is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
  });
};

const FormPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/users/${username}`
          );
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setIsEdit(true);
          } else {
            setIsEdit(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setIsEdit(false);
        }
      };
      fetchUserData();
    }
  }, [username]);

  const initialFormData = {
    username: userData?.username || "",
    phoneNumber: userData?.phoneNumber || "",
    email: userData?.email || "",
    name: userData?.name || "",
    dateOfBirth: userData?.dateOfBirth || "",
  };

  const initialFormDataForNewUser = {
    username: "",
    phoneNumber: "",
    email: "",
    name: "",
    dateOfBirth: "", 
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const url = isEdit
        ? `http://localhost:8000/users/${username}`
        : "http://localhost:8000/users/register";

      const method = isEdit ? "PUT" : "POST";

      const updatedUser = {
        ...values,
        username,
      };

      if (values.email === "" || values.email === userData?.email) {
        delete updatedUser.email;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        router.push(`/result?username=${username}`);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
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
            {isEdit ? "Edit Profile" : "Register"}
          </Typography>
          <Formik
            initialValues={isEdit ? initialFormData : initialFormDataForNewUser}
            validationSchema={getValidationSchema(isEdit)}
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
                    disabled={isEdit} 
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
                    name="dateOfBirth"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
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
                    {isEdit ? "Update" : "Submit"}
                  </Button>

                  {isEdit && (
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      style={{ marginLeft: "8px" }}
                      onClick={() => router.push("/")}
                    >
                      Cancel
                    </Button>
                  )}
                  {!isEdit && (
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      style={{ marginLeft: "8px" }}
                      onClick={() => router.push("/")}
                    >
                      Cancel
                    </Button>
                  )}
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
