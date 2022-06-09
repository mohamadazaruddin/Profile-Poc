import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
const SignupSchema = Yup.object().shape({
  Username: Yup.string().email().required("Required"),
  Password: Yup.string().max(50, "Too Long!").required("Required"),
});

export default function LogIn() {
  const router = useRouter();
  const [value, setValues] = useState();
  const [valueSubmitted, setValueSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  useEffect(() => {
    const signedInObject = window.localStorage.getItem("signedInObject");
    setValues(JSON.parse(signedInObject));
    setValueSubmitted(false);
  }, [valueSubmitted]);

  return (
    <Box bg="#E3F2FD">
      <Flex
        maxW={{ md: "70%", sm: "100%", base: "100%" }}
        height="100vh"
        margin="auto"
        display="flex"
        alignItems="center"
      >
        <Box
          m={{ base: "10px", sm: "50px", md: "auto" }}
          boxShadow={"0px 0px 25px #00000094"}
          w="100%"
          height={{ md: "auto", base: "" }}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Box
            width={{ base: "0%", md: "50%" }}
            backgroundImage="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
          ></Box>
          <Box
            width={{ base: "100%", md: "55%" }}
            p={{
              sm: "50px 40px",
              base: "30px 20px",
              md: "30px 20px",
              lg: "70px 50px",
            }}
            h="100%"
            background="
linear-gradient(196deg, rgba(4,25,124,1) 11%, rgba(15,42,168,1) 44%, rgba(35,147,247,1) 100%);"
          >
            <Box width="100%" display="flex" mb="10px" justifyContent="center">
              <Box
                border="2px solid #fff"
                borderRadius="50%"
                p={{ md: "10px", base: "5px" }}
                height={{ base: "35px", md: "60px" }}
                w={{ base: "35px", md: "60px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  viewBox="0 0 448 512"
                  width="100%"
                  height="100%"
                >
                  <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                </svg>
              </Box>
            </Box>
            <Box
              fontSize={{ base: "15px", sm: "20px", md: "30px" }}
              color="#fff"
              fontWeight="700"
              display="inline-block"
              width="100%"
              textAlign="center"
              fontStyle="italic"
            >
              Log in
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
                      values.Username == element.Email &&
                      values.Password == element.Password
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
                            fontSize={{ base: "16px", md: "18px" }}
                            fontWeight="400"
                          >
                            Email
                          </FormLabel>
                          <Field
                            name="Username"
                            as={Input}
                            bg="#fff"
                            color="#000"
                            borderRadius="8px"
                            placeholder="Email"
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
                            fontSize={{ base: "16px", md: "18px" }}
                            fontWeight="400"
                          >
                            Password
                          </FormLabel>
                          <Flex>
                            <Field
                              name="Password"
                              as={Input}
                              border="none"
                              _focus={{
                                border: "none",
                              }}
                              borderRadius="0px"
                              borderTopLeftRadius="8px"
                              borderBottomLeftRadius="8px"
                              bg="#fff"
                              type={showPassword ? "text" : "password"}
                              color="#000"
                              placeholder="Password"
                            />
                            <Button
                              borderRadius="0px"
                              borderTopRightRadius="8px"
                              ml="-2px"
                              borderBottomRightRadius="8px"
                              _focus={{
                                border: "none",
                              }}
                              _hover={{ bg: "#fff" }}
                              _active={{ bg: "#fff" }}
                              bg="#fff"
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </Flex>
                          {errors.Password && touched.Password ? (
                            <Text color="red" fontSize="14px" fontWeight="600">
                              {errors.Password}
                            </Text>
                          ) : (
                            <Text
                              color="transparent"
                              fontSize="14px"
                              fontWeight="600"
                            >
                              Required
                            </Text>
                          )}
                        </FormControl>
                      </Box>
                      <Box textAlign="center">
                        <Button
                          mt="20px"
                          bg="transparent"
                          _hover={{ bg: "#ffffff3d" }}
                          fontSize="16px"
                          px={{ base: "25px", md: "50px" }}
                          w="100%"
                          type="submit"
                          border="1px solid white"
                          color="#fff"
                          onClick={() =>
                            toast({
                              title: "Account created.",
                              description:
                                "We've created your account for you.",
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            })
                          }
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
      </Flex>
    </Box>
  );
}
