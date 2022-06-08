import {
  Box,
  Text,
  Button,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
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
      if (singleUser == element.Email) {
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
      if (values.Email == element.Email) {
        element.FullName = values.FullName;
        element.MobNo = values.MobNo;
        element.Email = values.Email;
        element.Password = values.Password;
        element.Role = values.Role;
        element.Location = values.Location;
        break;
      }
    }
    localStorage.setItem("signedInObject", JSON.stringify(userArray));
    setValueSubmitted(true);
    onClose();
  };
  return (
    <Box bg="#E3F2FD" w="100%" h="100%">
      <Box
        w="100%"
        maxW="100%"
        h="100%"
        display="grid"
        padding={{ lg: "0px", base: "30px" }}
        overflowY="scroll"
      >
        <Box
          bg="#fafafa"
          p="16px"
          borderRadius="10px"
          w={{ base: "100%", lg: "40%" }}
          m="auto"
          boxShadow="0px 0px 20px #000000b0"
          border="1px solid transparent"
          _hover={{ border: "1px solid #2196f3" }}
        >
          <Box>
            <Box display="flex" alignItems="center">
              <Box
                w="150px"
                h="150px"
                bg="gray"
                borderRadius="50%"
                bgImg={singleObj.CropImage}
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
                  fontSize="12px"
                  color="#9e9e9e"
                  lineHeight="1.66"
                  fontWeight="400"
                >
                  UI Developer
                </Text>
              </Box>
              <Box pt="24px">
                <Text
                  fontSize="12px"
                  color="#616161"
                  lineHeight="1.57"
                  fontWeight="400"
                >
                  I am {singleObj.FullName} as an {singleObj.Role} Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit.Blanditiis a beatae
                  ullam vitae sunt repudiandae voluptate animi molestias,
                  voluptatem, dolor
                </Text>
              </Box>
              <Box pt="24px">
                <Text color="#9e9e9e" fontWeight="400" fontSize="12px">
                  Email
                </Text>
                <Text
                  color="#212121"
                  m="0px"
                  mb="0px"
                  fontWeight="600"
                  fontSize="12px"
                  lineHeight="1.6"
                >
                  {singleObj.Email}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-between" pt="24px">
                <Box>
                  <Text color="#9e9e9e" fontWeight="400" fontSize="12px">
                    Phone
                  </Text>
                  <Text
                    color="#212121"
                    m="0px"
                    mb="0px"
                    fontWeight="600"
                    fontSize="12px"
                    lineHeight="1.6"
                  >
                    {singleObj.MobNo}
                  </Text>
                </Box>
                <Box w="55%">
                  <Text color="#9e9e9e" fontWeight="400" fontSize="12px">
                    Location
                  </Text>
                  <Text
                    color="#212121"
                    m="0px"
                    mb="0px"
                    fontWeight="600"
                    fontSize="12px"
                    lineHeight="1.6"
                  >
                    {singleObj.Location}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button
                w="100%"
                bg="#fafafa"
                color="#2196f3"
                fontWeight="500"
                borderRadius="8px"
                _hover={{
                  borderColor: "#2196f3",
                }}
                border="1px solid #2196f380"
                cursor="pointer"
                onClick={onOpen}
                mt="15px"
                _focus={{ border: "1px solid #2196f380" }}
              >
                <EditIcon mr="15px" />
                Edit Profile
              </Button>
            </Box>
          </Box>
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
                    Email: singleObj.Email,
                    Password: singleObj.Password,
                    Role: singleObj.Role,
                    Location: singleObj.Location,
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
                    Email: Yup.string()
                      .email("Enter Valid Email")
                      .required("Required"),
                    Password: Yup.string()
                      .min(8, "Minimum 8 Characters Required")
                      .max(15, "Maximum 15 Characters Required")
                      .required("Required"),
                    conPassword: Yup.string(),
                    Location: Yup.string().required("Required"),
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
                          htmlFor="Email"
                          fontSize="20px"
                          fontWeight="600"
                        >
                          Email
                        </FormLabel>
                        <Field
                          as={Input}
                          name="Email"
                          id="Email"
                          bg="#fff"
                          disabled
                          color="#333"
                          type="Email"
                        />
                        {errors.Email && touched.Email ? (
                          <Box as="p" color="red">
                            {errors.Email}
                          </Box>
                        ) : null}
                      </Box>
                      <Box py="10px">
                        <FormLabel
                          htmlFor="Password"
                          fontSize="20px"
                          fontWeight="600"
                        >
                          Change Password
                        </FormLabel>
                        <Field
                          as={Input}
                          name="Password"
                          id="Password"
                          bg="#fff"
                          color="#333"
                          type="Password"
                        />
                        {errors.Password && touched.Password ? (
                          <Box as="p" color="red">
                            {errors.Password}
                          </Box>
                        ) : null}
                      </Box>
                      <Box py="10px">
                        <Field
                          as={Select}
                          color="black"
                          id="Role"
                          name="Role"
                          placeholder="Role"
                          pl="0px"
                        >
                          <option value="Intern">Intern</option>
                          <option value="Junior Developer">
                            Junior Developer
                          </option>
                          <option value="Senior Developer">
                            Senior Developer
                          </option>
                          <option value="CEO">CEO</option>
                        </Field>
                        {errors.Role && touched.Role ? (
                          <Text color="red" fontSize="14px" fontWeight="600">
                            {errors.Role}
                          </Text>
                        ) : null}
                      </Box>
                      <Box>
                        <Field
                          as={Select}
                          color="black"
                          id="Location"
                          name="Location"
                          placeholder="Location"
                        >
                          <option value="Wasseypur">Wasseypur</option>
                          <option value="Mirzapur">Mirzapur</option>
                          <option value="NaviMumbai">Navi Mumbai</option>
                        </Field>
                        {errors.Location && touched.Location ? (
                          <Text color="red" fontSize="14px" fontWeight="600">
                            {errors.Location}
                          </Text>
                        ) : null}
                      </Box>
                      <Box textAlign="center" mt="20px">
                        <Button name="Submit" type="submit" bg="#FFC803" w="60%">
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
