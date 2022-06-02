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
  const [Values, setValues] = useState();
  useEffect(() => {
    const signedInObject = window.localStorage.getItem("signedInObject");
    setValues(JSON.parse(signedInObject));
  }, []);
  const router = useRouter();
  return (
    <Box bg="#3997f8" p="30px">
      <Box
        bg="#fff"
        p="0px 30px"
        borderRadius="10px"
        w="70%"
        m="auto"
        boxShadow="0px 0px 20px #000000b0"
      >
        <Flex>
          <Box display="flex" alignItems="center">
            <Box
              w="150px"
              h="150px"
              bg="gray"
              borderRadius="50%"
              p="15px"
            ></Box>
          </Box>
          <Box p="15px">
            <Text color="#3997f8" fontWeight="600" m="0px" mb="10px">
              @shaikhshoaib040 @gmail.com
            </Text>
            <Text fontWeight="600" mb="25px">
              I am Shoaib Shaikh Rashid As an inter Lorem, ipsum dolor sit amet
              consectetur adipisicing elit.Blanditiis a beatae ullam vitae sunt
              repudiandae voluptate animi molestias, voluptatem, dolor ex alias
              rem iste.Ratione reprehenderit sed impedit saepe deleniti.Lorem
              ipsum dolor sit amet consectetur adipisicing elit.Adipisci nemo
              iste dignissimos soluta!Dicta nobis voluptates totam, reiciendis
              expedita error doloribus ea.Asperiores illo nihil quibusdam,
              eligendi expedita iusto necessitatibus.
            </Text>
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
            >
              Edit Profile
            </Button>
            {typeof Values !== "undefined" && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Formik
                      initialValues={{
                        FullName: Values.FullName,
                        MobNo: Values.MobNo,
                        email: Values.email,
                        password: Values.password,
                      }}
                      onSubmit={(values) => {
                        localStorage.setItem(
                          "signedInObject",
                          JSON.stringify(values)
                        );
                        router.push("/Profile");
                      }}
                      validationSchema={Yup.object({
                        FullName: Yup.string()
                          .max(15, "Too Long")
                          .required("Required"),
                        MobNo: Yup.string()
                          .max(10, "Invalid Number")
                          .min(10, "Invalid Number")
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
                              borderRadius="25px"
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
        </Flex>
      </Box>
    </Box>
  );
}
