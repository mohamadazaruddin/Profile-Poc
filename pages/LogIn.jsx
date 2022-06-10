import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Image
} from "@chakra-ui/react";
import { TextField, styled } from "@material-ui/core";
import { makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignupSchema = Yup.object().shape({
  Username: Yup.string().email().required("Required"),
  Password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    "Password must be strong"
  )
    .required("Required"),
});


export default function LogIn() {
  const router = useRouter();
  const [value, setValues] = useState();
  const [valueSubmitted, setValueSubmitted] = useState(false);
  const [cssStyle, setCssStyle] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const CssTextField = styled(TextField)({
      '& label.MuiFormLabel-root': {
        color: "#fff",
      },
      '& label.Mui-focused': {
        color: '#fff',
        fontSize: "25px"
      },
      '& .MuiInputLabel-shrink': {
        top: "-10px"
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#fff !important',
      },
      '& .MuiOutlinedInput-root': {
        color: "#fff",
        '& fieldset': {
          borderColor: '#fff',
        },
        '&:hover fieldset': {
          borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#fff',
        },
      },
      '& .MuiInputBase-input::-webkit-input-placeholder': {
        color: "#fff"
      },
      '& .MuiInput-underline:hover:not:before': {
        borderBottomColor: "#fff !important",
      },
      '& .MuiInput-root': {
        color: "#fff"
      }
    });
    setCssStyle(CssTextField)
  }, [])
  useEffect(() => {
    const signedInObject = window.localStorage.getItem("signedInObject");
    setValues(JSON.parse(signedInObject));
    setValueSubmitted(false);
  }, [valueSubmitted]);

  return (
    <Box bg="#E3F2FD" overflow="auto" h="100%">
      <Flex
        maxW={{ md: "70%", sm: "100%", base: "100%" }}
        margin="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="600px"
      >
        <Box
          m={{ base: "10px", sm: "50px", md: "auto" }}
          boxShadow={"0px 0px 25px #00000094"}
          w="100%"
          height={{ md: "", base: "" }}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Box width={{ base: "0%", md: "50%" }}>
            <Box
              backgroundImage="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              backgroundAttachment="inherit"
              w="100%"
              h="100%"
            ></Box>
          </Box>
          <Box
            width={{ base: "100%", md: "55%" }}
            p={{
              sm: "50px 40px",
              base: "30px 20px",
              md: "30px 20px",
              lg: "70px 50px",
            }}
            h="100%"
            bg="#406086"
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
                          <Field
                            name="Username"
                            label="Email"
                            borderColor="#fff"
                            as={cssStyle}
                            placeholder="Email"
                            style={{
                              width: "100%"
                            }}
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
                          <Box display='flex' alignItems="end" justifyContent='end'>
                            <Field
                              name="Password"
                              type={showPassword ? 'text' : 'password'}
                              label="Password"
                              as={cssStyle}
                              placeholder="Password"
                              style={{
                                width: "100%"
                              }}
                            />
                            <Button
                              color='white'
                              bg='transparent'
                              _hover={{ bg: 'transparent' }}
                              _active={{ bg: 'transparent' }}
                              _focus={{ boxShadow: 'none' }}
                              onClick={() =>
                                setShowPassword(!showPassword)
                              }>
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button></Box>
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
                          bg="#406086"
                          _hover={{ bg: "#577392" }}
                          fontSize="16px"
                          px={{ base: "25px", md: "50px" }}
                          w="100%"
                          type="submit"
                          border="1px solid white"
                          color="#fff"
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
      </Flex >
    </Box>
  );
}
