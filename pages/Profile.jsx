import {
  Box,
  Text,
  Button,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { styled } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valueSubmitted, setValueSubmitted] = useState(false);
  const [userArray, setuserArray] = useState();
  const [singleObj, setSingleObj] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [inpCss, setInpCss] = useState();

  useEffect(() => {
    const CssStyled = styled(TextField)({
      "& label.Mui-focused": {
        color: "#787878",
        fontSize: "20px",
        padding: " 0 0 10px 0px",
      },
      "& .MuiInputLabel-shrink": {
        top: "-5px",
      },
      "& .MuiInput-root": {
        paddingLeft: "0px",
      },
      "& .MuiTextField-root": {
        width: "100%",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "black",
      },
    });
    setInpCss(CssStyled);
  }, []);

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
    <Box
      bg="#E3F2FD"
      w="100%"
      h="100vh"
      overflow="auto"
      p={{ base: "10px", md: "20px" }}
    >
      <Box bg="#fff" borderRadius="8px">
        <Box p="10px 10px" borderBottom="1px solid rgba(245, 245, 245) ">
          <Heading fontSize="25px">Profile</Heading>
        </Box>
        <Box py="25px">
          <Box
            w="100%"
            maxW="100%"
            h="100%"
            display="grid"
            padding={{ lg: "0px", base: "20px" }}
          >
            <Box
              bg="#fafafa"
              p={{ base: "10px", sm: "16px" }}
              borderRadius="10px"
              w={{ base: "100%", lg: "40%" }}
              m="auto"
              boxShadow="rgb(32 40 45 / 8%) 0px 2px 14px 0px"
              border="1px solid #d0eafd"
              _hover={{ border: "1px solid #2196f3" }}
            >
              <Box>
                <Box>
                  <Box
                    w="100px"
                    h="100px"
                    bg="gray"
                    m={{ base: "auto", sm: "unset" }}
                    borderRadius="50%"
                    bgImg={singleObj.CropImage}
                    backgroundSize="cover"
                    backgroundPosition="center"
                  ></Box>
                </Box>
                <Box p="15px">
                  <Box
                    fontWeight="600"
                    fontSize="30px"
                    lineHeight="25px"
                    mb="5px"
                    textAlign={{ base: "center", sm: "unset" }}
                  >
                    {singleObj.FullName}
                  </Box>
                  <Box textAlign={{ base: "center", sm: "unset" }}>
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
                      I am {singleObj.FullName} as an {singleObj.Role}. I work
                      in ILMUX in ghansoli it took me
                      {singleObj.FullName != "Shoaib" ? " 45 " : " 1 "}
                      hour to come from home to office aprox. I watch anime play
                      game
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
                  <Box
                    display={{ base: "block", sm: "flex" }}
                    justifyContent="space-between"
                    pt={{ base: "10px", sm: "24px" }}
                    alignItems="center"
                  >
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
                    <Box w="55%" pt={{ base: "10px", sm: "0px" }}>
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
                  <ModalHeader pb="0px">Edit Profile</ModalHeader>
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
                            <Field
                              as={inpCss}
                              name="FullName"
                              style={{
                                width: "100%",
                              }}
                              id="FullName"
                              type="text"
                              variant="standard"
                              label="Full Name"
                              width="100%"
                              placeholder="John Doe"
                              _focus={{ borderColor: "#ccc" }}
                              _hover={{ borderColor: "#ccc" }}
                            />
                            {errors.FullName && touched.FullName ? (
                              <Box
                                as="p"
                                color="red"
                                fontSize="14px"
                                fontWeight="600"
                              >
                                {errors.FullName}
                              </Box>
                            ) : (
                              <Text
                                visibility="hidden"
                                fontSize="14px"
                                fontWeight="600"
                                cursor="context-menu"
                              >
                                Text
                              </Text>
                            )}
                          </Box>
                          <Box py="10px">
                            <Field
                              as={inpCss}
                              name="MobNo"
                              id="MobNo"
                              label="Mobile No"
                              width="100%"
                              style={{
                                width: "100%",
                              }}
                              type="number"
                              placeholder="9876543210"
                              _focus={{ borderColor: "#ccc" }}
                              _hover={{ borderColor: "#ccc" }}
                            />
                            {errors.MobNo && touched.MobNo ? (
                              <Box
                                as="p"
                                color="red"
                                fontSize="14px"
                                fontWeight="600"
                              >
                                {errors.MobNo}
                              </Box>
                            ) : (
                              <Text
                                visibility="hidden"
                                fontSize="14px"
                                fontWeight="600"
                                cursor="context-menu"
                              >
                                Text
                              </Text>
                            )}
                          </Box>
                          <Box py="10px">
                            <Field
                              as={inpCss}
                              name="Email"
                              id="Email"
                              label="Email"
                              type="email"
                              width="100%"
                              style={{
                                width: "100%",
                              }}
                              disabled
                              placeholder="example@gmail.com"
                              _focus={{ borderColor: "#ccc" }}
                              _hover={{ borderColor: "#ccc" }}
                            />
                            {errors.Email && touched.Email ? (
                              <Box
                                as="p"
                                color="red"
                                fontSize="14px"
                                fontWeight="600"
                              >
                                {errors.Email}
                              </Box>
                            ) : (
                              <Text
                                visibility="hidden"
                                fontSize="14px"
                                fontWeight="600"
                                cursor="context-menu"
                              >
                                Text
                              </Text>
                            )}
                          </Box>
                          <Box py="10px">
                            <Box
                              display="flex"
                              alignItems="end"
                              justifyContent="end"
                            >
                              <Field
                                as={inpCss}
                                name="Password"
                                label="Password"
                                id="Password"
                                width="100%"
                                style={{
                                  width: "100%",
                                }}
                                type={showPassword ? "text" : "password"}
                                placeholder="Pass@123"
                              />
                              <Button
                                alignItems="end"
                                p="0"
                                color="#787878"
                                fontSize="20px"
                                bg="transparent"
                                borderRadius="none"
                                _hover={{ bg: "transparent", color: "black" }}
                                _active={{ bg: "transparent" }}
                                _focus={{ boxShadow: "none", color: "black" }}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </Box>
                            {errors.Password && touched.Password ? (
                              <Box
                                as="p"
                                color="red"
                                fontSize="14px"
                                fontWeight="600"
                              >
                                {errors.Password}
                              </Box>
                            ) : (
                              <Box
                                as="p"
                                visibility="hidden"
                                fontSize="14px"
                                fontWeight="600"
                                cursor="context-menu"
                              >
                                Text
                              </Box>
                            )}
                          </Box>
                          <Box py="10px">
                            <FormLabel
                              color="#787878"
                              fontSize="20px"
                              marginRight="2px"
                              display="inline"
                              fontWeight="400"
                            >
                              Role
                            </FormLabel>
                            <Field
                              as={Select}
                              id="Role"
                              name="Role"
                              placeholder="Select"
                              style={{
                                paddingLeft: 0,
                              }}
                              bg="#ffffff"
                              color="#787878"
                              borderRadius="unset"
                              border="none"
                              borderBottom="1px solid black"
                              pl="0px"
                              _focus={{ borderColor: "black" }}
                              _hover={{
                                borderColor: "black",
                                borderBottom: "2px solid black",
                              }}
                            >
                              <option bg="#333" value="Intern">
                                Intern
                              </option>
                              <option value="Frontend Developer">
                                Frontend Developer
                              </option>
                              <option value="Backend Developer">
                                Backend Developer
                              </option>
                              <option value="DevOps">DevOps</option>
                            </Field>
                            {errors.Role && touched.Role ? (
                              <Text
                                color="red"
                                fontSize="14px"
                                fontWeight="600"
                              >
                                {errors.Role}
                              </Text>
                            ) : (
                              <Text
                                visibility="hidden"
                                fontSize="14px"
                                fontWeight="600"
                                cursor="context-menu"
                              >
                                Text
                              </Text>
                            )}
                          </Box>
                          <Box py="10px">
                            <FormLabel
                              color="#787878"
                              fontSize="20px"
                              marginRight="2px"
                              display="inline"
                              fontWeight="400"
                            >
                              Location
                            </FormLabel>
                            <Field
                              as={Select}
                              id="Location"
                              name="Location"
                              placeholder="Select"
                              bg="#fff"
                              style={{
                                paddingLeft: 0,
                              }}
                              color="#787878"
                              borderRadius="unset"
                              border="none"
                              borderBottom="1px solid black"
                              pl="0px"
                              _focus={{ borderColor: "black" }}
                              _hover={{
                                borderColor: "black",
                                borderBottom: "2px solid black",
                              }}
                            >
                              <option value="Wasseypur">Wasseypur</option>
                              <option value="Mirzapur">Mirzapur</option>
                              <option value="Navi Mumbai">Navi Mumbai</option>
                            </Field>
                            {errors.Location && touched.Location ? (
                              <Text
                                color="red"
                                fontSize="14px"
                                fontWeight="600"
                              >
                                {errors.Location}
                              </Text>
                            ) : (
                              <Text
                                visibility="hidden"
                                fontSize="14px"
                                fontWeight="600"
                              >
                                Text
                              </Text>
                            )}
                          </Box>
                          <Box textAlign="center" mt="20px">
                            <Button
                              name="Submit"
                              bg="#B9DFFF"
                              type="submit"
                              w="60%"
                              color="#000000"
                              _hover={{ bg: "#016ABC", color: "#fff" }}
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
      </Box>
    </Box>
  );
}
