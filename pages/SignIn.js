import React from "react";
import { Box, Button, FormLabel, Input, Link } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Router, useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  return (
    <Box p="50px">
      <Box
        w="50%"
        bg="#3997f8"
        color="#fff"
        p="30px"
        mt="10px"
        margin="auto"
        borderRadius="10px"
        boxShadow="0px 0px 10px #000"
      >
        <Formik
          initialValues={{
            FullName: "",
            MobNo: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            localStorage.setItem("signedInObject", JSON.stringify(values));
            router.push("/Profile");
          }}
          validationSchema={Yup.object({
            FullName: Yup.string().max(15, "Too Long").required("Required"),
            MobNo: Yup.string()
              .max(10, "Number To Long")
              .min(10, "Number To Short")
              .required("Required"),
            email: Yup.string().email("Enter Valid Email").required("Required"),
            password: Yup.string()
              .min(8, "Minimum 8 Characters Required")
              .max(15, "Maximum 15 Characters Required")
              .required("Required"),
            conPassword: Yup.string(),
          })}
        >
          {({ errors, touched }) => (
            <Form>
              <Box textAlign="center" as="h1" fontSize="5xl">
                Sign In
              </Box>
              <Box py="10px">
                <FormLabel htmlFor="FullName" fontSize="20px" fontWeight="600">
                  Full Name
                </FormLabel>
                <Field
                  as={Input}
                  name="FullName"
                  id="FullName"
                  bg="#fff"
                  color="#333"
                  type="text"
                />
                {errors.FullName && touched.FullName ? (
                  <Box as="p" color="red">
                    {errors.FullName}
                  </Box>
                ) : null}
              </Box>
              <Box py="10px">
                <FormLabel htmlFor="MobNo" fontSize="20px" fontWeight="600">
                  Mobile Number
                </FormLabel>
                <Field
                  as={Input}
                  name="MobNo"
                  id="MobNo"
                  bg="#fff"
                  color="#333"
                  type="number"
                />
                {errors.MobNo && touched.MobNo ? (
                  <Box as="p" color="red">
                    {errors.MobNo}
                  </Box>
                ) : null}
              </Box>
              <Box py="10px">
                <FormLabel htmlFor="email" fontSize="20px" fontWeight="600">
                  Email
                </FormLabel>
                <Field
                  as={Input}
                  name="email"
                  id="email"
                  bg="#fff"
                  color="#333"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <Box as="p" color="red">
                    {errors.email}
                  </Box>
                ) : null}
              </Box>
              <Box py="10px">
                <FormLabel htmlFor="password" fontSize="20px" fontWeight="600">
                  Create Password
                </FormLabel>
                <Field
                  as={Input}
                  name="password"
                  id="password"
                  bg="#fff"
                  color="#333"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <Box as="p" color="red">
                    {errors.password}
                  </Box>
                ) : null}
              </Box>
              <Box textAlign="center" mt="20px">
                <Button
                  name="Submit"
                  type="submit"
                  bg="#cfba28"
                  color="black"
                  w="60%"
                  _hover={{ bg: "#f3d400" }}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Box textAlign="end" mt="25px">
          <Box>
            Already have an Account?
            <Link href="/LogIn" color="#002bff" mx="5px" fontWeight="700">
              Log in
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
