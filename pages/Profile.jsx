import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valueSubmitted, setValueSubmitted] = useState(false);
  const [userArray, setuserArray] = useState();
  const [singleObj, setSingleObj] = useState({});

  useEffect(() => {
    const signedInObject = window.localStorage.getItem("signedInObject");
    const user = window.localStorage.getItem("username");
    let myUserArray = JSON.parse(signedInObject);
    setuserArray(myUserArray);
    let singleUser = JSON.parse(user);

    for (let index = 0; index < myUserArray.length; index++) {
      const element = myUserArray[index];
      if (singleUser == element.email) {
        setSingleObj(element);
        break;
      }
    }

    setValueSubmitted(false);
  }, [valueSubmitted]);

  const router = useRouter();
  const handleSubmit = (values) => {
    for (let index = 0; index < userArray.length; index++) {
      const element = userArray[index];
      if (values.email == element.email) {
        element.FullName = values.FullName;
        element.MobNo = values.MobNo;
        element.email = values.email;
        element.password = values.password;
        break;
      }
    }
    localStorage.setItem("signedInObject", JSON.stringify(userArray));
    setValueSubmitted(true);
    onClose();
  };
  return (
    <Box bg="#3997f8" p="50px" h="100vh">
      <Box
        bg="#fff"
        p="0px 30px"
        borderRadius="10px"
        w="70%"
        m="auto"
        boxShadow="0px 0px 20px #000000b0"
      >
        <Box>
          <Flex>
            <Box display="flex" alignItems="center">
              <Box
                w="150px"
                h="150px"
                bg="gray"
                borderRadius="50%"
                bgImg={singleObj.cropImage}
                backgroundSize="cover"
                backgroundPosition="center"
              ></Box>
            </Box>
            <Box p="15px">
              <Box fontWeight="600" fontSize="30px" lineHeight="25px">
                {singleObj.FullName}
              </Box>
              <Box>
                <Text
                  color="#7e7c7c"
                  m="0px"
                  mb="0px"
                  fontWeight="600"
                  fontSize="16px"
                >
                  {singleObj.email}
                </Text>
              </Box>
              <Box display="inline-block" fontSize="17px" fontWeight="600">
                Mob:
                <Text
                  display="inline-block"
                  color="#7e7c7c"
                  mx="5px"
                  mb="10px"
                  fontSize="17px"
                >
                  {singleObj.MobNo}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="600" mb="25px">
                  I am
                  {singleObj.FullName} as an intern Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit.Blanditiis a beatae ullam vitae
                  sunt repudiandae voluptate animi molestias, voluptatem, dolor
                </Text>
              </Box>
              <Box textAlign="end">
                <Button
                  bg="#3997f8"
                  fontWeight="bold"
                  color="#fff"
                  borderRadius="25px"
                  p="10px 30px"
                  _hover={{
                    bg: "#017eff",
                  }}
                  border="none"
                  cursor="pointer"
                  onClick={onOpen}
                  _focus={{ border: "none" }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
        {typeof singleObj !== "undefined" && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Formik
                  initialValues={{
                    FullName: singleObj.FullName,
                    MobNo: singleObj.MobNo,
                    email: singleObj.email,
                    password: singleObj.password,
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Yup.object({
                    FullName: Yup.string()
                      .max(15, "Too Long")
                      .required("Required"),
                    MobNo: Yup.string()
                      .max(10, "Number To Long")
                      .min(10, "Number To Short")
                      .required("Required"),
                    email: Yup.string()
                      .email("Enter Valid Email")
                      .required("Required"),
                    password: Yup.string()
                      .min(8, "Minimum 8 Characters Required")
                      .max(15, "Maximum 15 Characters Required")
                      .required("Required"),
                    conPassword: Yup.string(),
                  })}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Box py="10px">
                        <FormLabel
                          htmlFor="FullName"
                          fontSize="20px"
                          fontWeight="600"
                        >
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
                        <FormLabel
                          htmlFor="MobNo"
                          fontSize="20px"
                          fontWeight="600"
                        >
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
                        <FormLabel
                          htmlFor="email"
                          fontSize="20px"
                          fontWeight="600"
                        >
                          Email
                        </FormLabel>
                        <Field
                          as={Input}
                          name="email"
                          id="email"
                          bg="#fff"
                          disabled
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
                        <FormLabel
                          htmlFor="password"
                          fontSize="20px"
                          fontWeight="600"
                        >
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
                          bg="#FFC803"
                          w="60%"
                        >
                          Submit
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Box>
  );
}