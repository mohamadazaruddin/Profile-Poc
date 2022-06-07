import React, { useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Flex,
  Image,
  Spacer,
  Select,
  Text,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export default function SignIn() {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState(false);
  const [cropper, setCropper] = useState();
  const [cropImg, setcropImg] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [MobSmallWidth] = useMediaQuery("(max-width:300px)");

  const handleSubmit = (values) => {
    values.CropImage = cropData;
    let a = [];
    const userObj = localStorage.getItem("signedInObject");
    let ifUserExist = false;
    if (userObj) {
      a = JSON.parse(userObj);
      for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (values.Email === element.Email) {
          ifUserExist = true;
          break;
        }
      }
    }
    if (ifUserExist) {
      alert("Email Already Exists");
    } else {
      if (cropImg) {
        a.push(values);
        localStorage.setItem("signedInObject", JSON.stringify(a));
        router.push("/LogIn");
      } else {
        alert("Please Upload Image");
      }
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setcropImg(true);
      onClose();
    }
  };
  return (
    <Box p={{ base: "0px", md: "50px" }} bg="#015bea">
      <Box
        w={{ base: "100%", md: "50%" }}
        m="0 auto"
        bg="#ffffff"
        color="#fff"
        p="0 0"
        borderRadius="5px"
        boxShadow="0px 0px 10px #000"
      >
        <Box>
          <Image src="./Mumbai.jpeg" alt="" m="auto" w="100%" />
        </Box>
        <Formik
          initialValues={{
            FullName: "",
            MobNo: "",
            Email: "",
            Password: "",
            ConPassword: "",
            CropImage: "",
            Role: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            FullName: Yup.string()
              .max(15, "Too Long")
              .matches(/^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/, "Enter Valid Name")
              .required("Required"),
            MobNo: Yup.string()
              .matches(/^[6-9]{1}[0-9]{9}$/, "Enter valid phone number")
              .required("Required"),
            Email: Yup.string().email().required("Required"),
            Password: Yup.string()
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must be strong"
              )
              .required("Required"),
            ConPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("Password"), null], "Passwords must match"),
            Role: Yup.string().required("Required"),
          })}
        >
          {({ errors, touched }) => (
            <Form>
              <Box p={{ base: "20px", lg: "40px" }}>
                <Box
                  textAlign="center"
                  as="h1"
                  fontSize="40px"
                  letterSpacing="10px"
                  color="#363636"
                >
                  Sign In
                </Box>
                <Box py="10px">
                  <FormLabel color="black" marginRight="2px" display="inline">
                    Name
                  </FormLabel>
                  <Box as="span" color="red">
                    *
                  </Box>
                  <Field
                    as={Input}
                    borderRadius="unset"
                    border="none"
                    borderBottom="2px solid #ccc"
                    name="FullName"
                    id="FullName"
                    bg="#fff"
                    color="#787878"
                    type="text"
                    pl="0px"
                    placeholder="John Doe"
                    _focus={{ borderColor: "#ccc" }}
                    _hover={{ borderColor: "#ccc" }}
                  />
                  {errors.FullName && touched.FullName ? (
                    <Box as="p" color="red">
                      {errors.FullName}
                    </Box>
                  ) : null}
                </Box>
                <Box py="10px">
                  <FormLabel color="black" marginRight="2px" display="inline">
                    Mobile No.
                  </FormLabel>
                  <Box as="span" color="red">
                    *
                  </Box>
                  <Field
                    as={Input}
                    name="MobNo"
                    id="MobNo"
                    bg="#fff"
                    color="#787878"
                    type="number"
                    borderRadius="unset"
                    border="none"
                    borderBottom="2px solid #ccc"
                    pl="0px"
                    placeholder="9876543210"
                    _focus={{ borderColor: "#ccc" }}
                    _hover={{ borderColor: "#ccc" }}
                  />
                  {errors.MobNo && touched.MobNo ? (
                    <Box as="p" color="red">
                      {errors.MobNo}
                    </Box>
                  ) : null}
                </Box>
                <Box py="10px">
                  <FormLabel color="black" marginRight="2px" display="inline">
                    Email
                  </FormLabel>
                  <Box as="span" color="red">
                    *
                  </Box>
                  <Field
                    as={Input}
                    name="Email"
                    id="Email"
                    bg="#fff"
                    color="#787878"
                    type="Email"
                    borderRadius="unset"
                    border="none"
                    borderBottom="2px solid #ccc"
                    pl="0px"
                    placeholder="example@gmail.com"
                    _focus={{ borderColor: "#ccc" }}
                    _hover={{ borderColor: "#ccc" }}
                  />
                  {errors.Email && touched.Email ? (
                    <Box as="p" color="red">
                      {errors.Email}
                    </Box>
                  ) : null}
                </Box>
                <Box py="10px">
                  <FormLabel color="black" marginRight="2px" display="inline">
                    Password
                  </FormLabel>
                  <Box as="span" color="red">
                    *
                  </Box>
                  <Field
                    as={Input}
                    name="Password"
                    id="Password"
                    bg="#fff"
                    color="#787878"
                    type="Password"
                    pl="0px"
                    borderRadius="unset"
                    border="none"
                    borderBottom="2px solid #ccc"
                    placeholder="Pass@123"
                    _focus={{ borderColor: "#ccc" }}
                    _hover={{ borderColor: "#ccc" }}
                  />
                  {errors.Password && touched.Password ? (
                    <Box as="p" color="red">
                      {errors.Password}
                    </Box>
                  ) : null}
                </Box>
                <Box py="10px">
                  <FormLabel color="black" marginRight="2px" display="inline">
                    Confirm Password
                  </FormLabel>
                  <Box as="span" color="red">
                    *
                  </Box>
                  <Field
                    as={Input}
                    name="ConPassword"
                    id="ConPassword"
                    bg="#fff"
                    color="#787878"
                    type="Password"
                    borderRadius="unset"
                    border="none"
                    borderBottom="2px solid #ccc"
                    pl="0px"
                    placeholder="Must match Password"
                    _focus={{ borderColor: "#ccc" }}
                    _hover={{ borderColor: "#ccc" }}
                  />
                  {errors.ConPassword && touched.ConPassword ? (
                    <Box as="p" color="red">
                      {errors.ConPassword}
                    </Box>
                  ) : null}
                </Box>
                <Box py="10px">
                  <FormLabel color="black" marginRight="2px" display="inline">
                    Role
                  </FormLabel>
                  <Box as="span" color="red">
                    *
                  </Box>
                  <Field
                    as={Select}
                    id="Role"
                    name="Role"
                    placeholder="Select"
                    bg="#fff"
                    color="#787878"
                    borderRadius="unset"
                    border="none"
                    borderBottom="2px solid #ccc"
                    pl="0px"
                    _focus={{ borderColor: "#ccc" }}
                    _hover={{ borderColor: "#ccc" }}
                  >
                    <option value="Intern">Intern</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="CEO">CEO</option>
                  </Field>
                  {errors.Role && touched.Role ? (
                    <Text color="red" fontSize="14px" fontWeight="600">
                      {errors.Role}
                    </Text>
                  ) : null}
                </Box>
                <Box py="10px">
                  <Box display={{ base: "block", sm: "flex" }}>
                    <Box w="50%" m="auto">
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader textAlign="center">
                            Crop Image
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Input
                              type="file"
                              name="cropImg"
                              mb="10px"
                              onChange={onChange}
                              bg="transparent"
                              border="none"
                              accept="image/x-png,image/gif,image/jpeg"
                              _focus={{ boxShadow: "none" }}
                            />
                            <Cropper
                              style={{ height: 400, width: "100%" }}
                              zoomTo={0.5}
                              initialAspectRatio={1}
                              src={image}
                              viewMode={1}
                              minCropBoxHeight={10}
                              minCropBoxWidth={10}
                              background={false}
                              responsive={true}
                              autoCropArea={1}
                              checkOrientation={false}
                              onInitialized={(instance) => {
                                setCropper(instance);
                              }}
                              guides={true}
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              mr={3}
                              onClick={onClose}
                            >
                              Close
                            </Button>
                            <Button onClick={getCropData}>Crop Image</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      {cropData ? (
                        <Image
                          w="100%"
                          src={cropData}
                          alt="cropped"
                          p="20px"
                        />
                      ) : (
                        <Box
                          h="150px"
                          w="150px"
                          bg="#c1bebe"
                          display="grid"
                          placeItems="center"
                          color="#000"
                          m="auto"
                        >
                          Image
                        </Box>
                      )}
                    </Box>
                    <Box
                      pos="relative"
                      w="50%"
                      m={{ base: "auto", sm: "0px" }}
                      textAlign="center"
                      mt={{ base: "10px", sm: "0px" }}
                    >
                      <Button
                        onClick={onOpen}
                        pos={{ base: "unset", sm: "absolute" }}
                        left="50%"
                        bg="#5f43cf"
                        top="50%"
                        transform={{
                          base: "none",
                          sm: "translate(-50%, -50%)",
                        }}
                        color="#fff"
                        _hover={{ bg: "#715fbb" }}
                      >
                        Upload Image
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box textAlign="center" mt="20px">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Button
                      bg="linear-gradient(90deg, rgba(203,104,5,1) 0%, rgba(255,171,3,1) 59%)"
                      px="50px"
                      color="#ffffff"
                      type="submit"
                      name="submit"
                    >
                      Sign In
                    </Button>
                    {/* <Spacer /> */}
                    <Button
                      bg="blue"
                      px="30px"
                      color="#ffffff"
                      onClick={() => router.push("/LogIn")}
                    >
                      Already Have an Account Login
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
