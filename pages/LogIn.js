import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useEffect } from "react";
const SignupSchema = Yup.object().shape({
  Username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  Password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function LogIn() {
  useEffect(() => {
    const signedInObject = window.localStorage.getItem("signedInObject");
    console.log("signedInObject", JSON.parse(signedInObject));
  }, []);
  return (
    <Box>
      <Box m="auto" bg="#39BEF8" borderRadius="25px" w="314px">
        <Text textAlign="center" fontSize="32px" fontWeight="700" color="#fff">
          Login
        </Text>
        <Box>
          <Formik
            initialValues={{
              Username: "",
              Password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box p="40px">
                  <FormControl>
                    <FormLabel
                      color="#fff"
                      fontSize="16px"
                      fontWeight="700"
                      pb="10px"
                    >
                      User Name
                    </FormLabel>
                    <Field
                      name="Username"
                      as={Input}
                      bg="#fff"
                      color="#000"
                      placeholder="Username"
                    />
                    {errors.Username && touched.Username ? (
                      <Text color="red" fontSize="14px" fontWeight="600">
                        {errors.Username}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      color="#fff"
                      fontSize="16px"
                      fontWeight="700"
                      py="10px"
                    >
                      Password
                    </FormLabel>
                    <Field
                      name="Password"
                      as={Input}
                      bg="#fff"
                      color="#000"
                      placeholder="Password"
                    />
                    {errors.Password && touched.Password ? (
                      <Text color="red" fontSize="14px" fontWeight="600">
                        {errors.Password}
                      </Text>
                    ) : null}
                  </FormControl>
                  <Button
                    my="40px"
                    borderRadius="25px"
                    bg="#FFC803"
                    fontSize="16px"
                    px="80px"
                    type="submit"
                  >
                    Log in
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
