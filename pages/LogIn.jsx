import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const SignupSchema = Yup.object().shape({
  Username: Yup.string().email().required("Required"),
  Password: Yup.string().max(50, "Too Long!").required("Required"),
});

export default function LogIn() {
  const router = useRouter();
  const [value, setValues] = useState();
  const [valueSubmitted, setValueSubmitted] = useState(false);
  useEffect(() => {
    const signedInObject = window.localStorage.getItem("signedInObject");
    setValues(JSON.parse(signedInObject));
    setValueSubmitted(false);
  }, [valueSubmitted]);

  return (
    <Box
      p={{ base: "25px", md: "80px" }}
      height="100vh"
      display="flex"
      alignItems="center"
    >
      <Box
        m="auto"
        boxShadow={"0px 0px 25px #00000094"}
        w="100%"
        display="flex"
      >
        <Box
          width={{ base: "0%", md: "50%" }}
          backgroundImage={
            "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
          }
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
        ></Box>
        <Box
          width={{ base: "100%", md: "50%" }}
          p={{ base: "20px 40px", md: "70px 60px" }}
          bg="#015bea"
        >
          <Box
            fontSize={{ base: "30px", md: "45px" }}
            color="#fff"
            fontWeight="700"
            display="inline-block"
          >
            Welcome!
          </Box>
          <Box mt="20px">
            <Formik
              initialValues={{
                Username: "",
                Password: "",
              }}
              onSubmit={(values) => {
                const userObj = localStorage.getItem("signedInObject");
                let userParsedObj = JSON.parse(userObj);
                let validUser = true;
                for (let index = 0; index < userParsedObj.length; index++) {
                  const element = userParsedObj[index];
                  if (
                    values.Username == element.email &&
                    values.Password == element.password
                  ) {
                    validUser = true;
                    break;
                  } else {
                    validUser = false;
                  }
                }
                if (!validUser) {
                  alert("Invalid Username or Password");
                } else {
                  localStorage.setItem(
                    "username",
                    JSON.stringify(values.Username)
                  );
                  router.push("/Profile");
                }
              }}
              validationSchema={SignupSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box>
                    <Box py="10px">
                      <FormControl>
                        <FormLabel
                          color="#fff"
                          fontSize="20px"
                          fontWeight="400"
                        >
                          Email
                        </FormLabel>
                        <Field
                          name="Username"
                          as={Input}
                          bg="#fff"
                          color="#000"
                          borderRadius="25px"
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
                        <FormLabel
                          color="#fff"
                          fontSize="20px"
                          fontWeight="400"
                        >
                          Password
                        </FormLabel>
                        <Field
                          name="Password"
                          as={Input}
                          borderRadius="25px"
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
                        bg="linear-gradient(90deg, rgba(203,104,5,1) 0%, rgba(255,171,3,1) 59%)"
                        fontSize="16px"
                        px={{ base: "25px", md: "50px" }}
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
    </Box>
  );
}
