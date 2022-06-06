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
  Username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
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
maxW={{md:"70%", sm:"100%",base:"100%"}}
      height="100vh"
      margin='auto'
      display="flex"
      alignItems="center"
    >
      <Box
        m="auto"
        boxShadow={"0px 0px 25px #00000094"}
        w="100%"
        height={{md:"auto",base:"100%"}}
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
          p={{sm:"50px 40px" ,base: "50px 15px", md: "70px 40px" }}
          bg="#015bea"
        >
          <Box
           width='100%'
       display='flex'
       mb='10px'
       justifyContent='center'>
         <Box border='2px solid #fff' borderRadius='50%' p={{md:'10px',base:"5px"}} height={{base:"35px", md:"60px"}}  w={{base:"35px", md:"60px"}}><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 448 512" width="100%" height='100%'><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg></Box></Box>
          <Box
            fontSize={{ base: "25px",sm:"30px", md: "45px" }}
            color="#fff"
            fontWeight="700"
            display="inline-block"
            width='100%'
            textAlign='center'
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
                          fontSize={{base:"16px",md:"20px"}}
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
                          fontSize={{base:"16px",md:"20px"}}
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
                        w={{base:"100%", sm:"auto", md:"auto"}}
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
