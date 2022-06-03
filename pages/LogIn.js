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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const SignupSchema = Yup.object().shape({
  Username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  Password: Yup.string().max(50, "Too Long!").required("Required"),
});

export default function LogIn() {
  const router = useRouter();
const [userdata, setItems] = useState([]);

useEffect(() => {
  const userdata = JSON.parse(localStorage.getItem("signedInObject"));
  if (userdata) {
    setItems(userdata);
  }
}, []);
const handleSubmit = (values) => {
  userdata.map((items) => {
    if (items.email === values.Username) {
      localStorage.setItem("loginedUser", JSON.stringify(values.Username));
      router.push("/Profile");
    } else {
    }
  });
  // router.push("/Profile");
};
return (
  <Box p="50px">
    <Box m="auto" bg="#3997f8" borderRadius="25px" p="40px" w="50%">
      <Box textAlign="center" as="h1" fontSize="5xl" color="#fff">
        Log In
      </Box>
      <Box>
        <Formik
          initialValues={{
            Username: "",
            Password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <Box>
                <Box py="10px">
                  <FormControl>
                    <FormLabel color="#fff" fontSize="16px" fontWeight="700">
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
                </Box>
                <Box py="10px">
                  <FormControl>
                    <FormLabel color="#fff" fontSize="16px" fontWeight="700">
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
                </Box>
                <Box textAlign="center">
                  <Button
                    mt="20px"
                    bg="#f3ca39"
                    fontSize="16px"
                    px="80px"
                    type="submit"
                  >
                    Log in
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  </Box>
);
}
