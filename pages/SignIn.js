import React, { useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Flex,
  Image,
  Spacer,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [MobSmallWidth] = useMediaQuery("(max-width:300px)");
  const handleSubmit = (values) => {
    values.cropImage = cropData;
    let a = [];
    const userObj = localStorage.getItem("signedInObject");
    let ifUserExist = false;
    if (userObj) {
      a = JSON.parse(userObj);
      for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (values.email === element.email) {
          ifUserExist = true;
          break;
        }
      }
    }
    if (ifUserExist) {
      alert("Email Already Exists");
    } else {
      a.push(values);
      localStorage.setItem("signedInObject", JSON.stringify(a));
    }
    // router.push("/Profile");
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
      onClose();
    }
  };

  return (
    <Box p={{ base: "0px", md: "50px" }} bg="#015bea">
      {MobSmallWidth ? (
        <Box
          w="100%"
          m="0 auto"
          bg="#ffffff"
          color="#fff"
          p="0 0"
          borderRadius="5px"
          boxShadow="0px 0px 10px #000"
        >
          <Box>
            <Image
              src="./Mumbai.jpeg"
              alt=""
              m="auto"
              w="100%"
              // h="200px"
            />
          </Box>
          <Formik
            initialValues={{
              FullName: "",
              MobNo: "",
              email: "",
              password: "",
              conPassword: "",
              cropImage: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              FullName: Yup.string()
                .max(15, "Too Long")
                .matches(/^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/, "Enter Valid Name")
                .required("Required"),
              MobNo: Yup.string()
                .max(10, "Invalid Number")
                .min(10, "Invalid Number")
                .required("Required"),
              email: Yup.string()
                .matches(/\S+@\S+\.\S+/, "Enter Valid Email")
                .required("Required"),
              password: Yup.string()
                .min(8, "Minimum 8 Characters Required")
                .max(15, "Maximum 15 Characters Required")
                .required("Required"),
              conPassword: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
            })}
          >
            {({ errors, touched }) => (
              <Form>
                <Box p="10px">
                  <Box
                    textAlign="center"
                    as="h1"
                    fontSize="30px"
                    letterSpacing="10px"
                    color="#363636"
                  >
                    Sign In
                  </Box>
                  <Box py="10px">
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
                      placeholder="NAME"
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
                      placeholder="Mobile Number"
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
                    <Field
                      as={Input}
                      name="email"
                      id="email"
                      bg="#fff"
                      color="#787878"
                      type="email"
                      borderRadius="unset"
                      border="none"
                      borderBottom="2px solid #ccc"
                      pl="0px"
                      placeholder="Email"
                      _focus={{ borderColor: "#ccc" }}
                      _hover={{ borderColor: "#ccc" }}
                    />
                    {errors.email && touched.email ? (
                      <Box as="p" color="red">
                        {errors.email}
                      </Box>
                    ) : null}
                  </Box>
                  <Box py="10px">
                    <Field
                      as={Input}
                      name="password"
                      id="password"
                      bg="#fff"
                      color="#787878"
                      type="password"
                      pl="0px"
                      borderRadius="unset"
                      border="none"
                      borderBottom="2px solid #ccc"
                      placeholder="Password"
                      _focus={{ borderColor: "#ccc" }}
                      _hover={{ borderColor: "#ccc" }}
                    />
                    {errors.password && touched.password ? (
                      <Box as="p" color="red">
                        {errors.password}
                      </Box>
                    ) : null}
                  </Box>
                  <Box py="10px">
                    <Field
                      as={Input}
                      name="conPassword"
                      id="conPassword"
                      bg="#fff"
                      color="#787878"
                      type="password"
                      borderRadius="unset"
                      border="none"
                      borderBottom="2px solid #ccc"
                      pl="0px"
                      placeholder="Confirm Password"
                      _focus={{ borderColor: "#ccc" }}
                      _hover={{ borderColor: "#ccc" }}
                    />
                    {errors.conPassword && touched.conPassword ? (
                      <Box as="p" color="red">
                        {errors.conPassword}
                      </Box>
                    ) : null}
                  </Box>
                  <Box py="10px">
                    <Flex flexWrap="wrap">
                      <Box w="100%">
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
                                _focus={{ boxShadow: "none" }}
                              />
                              <Cropper
                                style={{ height: 400, width: "100%" }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                // preview=".img-preview"
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
                        {/* <Input type="image" src={cropData} alt="submit" value={cropData} name="cropImg" /> */}
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
                      <Box pos="relative" w="100%" textAlign="center" mt="10px">
                        <Button
                          onClick={onOpen}
                          bg="#5f43cf"
                          color="#fff"
                          _hover={{ bg: "#715fbb" }}
                        >
                          Upload Image
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
                  <Box textAlign="center" mt="20px">
                    <Flex alignItems="center" justifyContent="space-between">
                      <Button
                        bg="#57b84d"
                        px="30px"
                        color="#ffffff"
                        type="submit"
                        name="submit"
                      >
                        Sign In
                      </Button>
                      {/* <Spacer /> */}
                      <Button
                        bg="linear-gradient(90deg, rgba(203,104,5,1) 0%, rgba(255,171,3,1) 59%)"
                        px="30px"
                        color="#ffffff"
                        onClick={() => router.push("/LogIn")}
                      >
                        Log In
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      ) : (
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
              email: "",
              password: "",
              conPassword: "",
              cropImage: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              FullName: Yup.string()
                .max(15, "Too Long")
                .matches(/^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/, "Enter Valid Name")
                .required("Required"),
              MobNo: Yup.string()
                .max(10, "Invalid Number")
                .min(10, "Invalid Number")
                .required("Required"),
              email: Yup.string()
                .matches(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[com,in,co]{2, 3}))$/,
                  "Enter Valid Email"
                )
                .required("Required"),
              password: Yup.string()
                .min(8, "Minimum 8 Characters Required")
                .max(15, "Maximum 15 Characters Required")
                .required("Required"),
              conPassword: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
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
                      placeholder="NAME"
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
                      placeholder="Mobile Number"
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
                    <Field
                      as={Input}
                      name="email"
                      id="email"
                      bg="#fff"
                      color="#787878"
                      type="email"
                      borderRadius="unset"
                      border="none"
                      borderBottom="2px solid #ccc"
                      pl="0px"
                      placeholder="Email"
                      _focus={{ borderColor: "#ccc" }}
                      _hover={{ borderColor: "#ccc" }}
                    />
                    {errors.email && touched.email ? (
                      <Box as="p" color="red">
                        {errors.email}
                      </Box>
                    ) : null}
                  </Box>
                  <Box py="10px">
                    <Field
                      as={Input}
                      name="password"
                      id="password"
                      bg="#fff"
                      color="#787878"
                      type="password"
                      pl="0px"
                      borderRadius="unset"
                      border="none"
                      borderBottom="2px solid #ccc"
                      placeholder="Password"
                      _focus={{ borderColor: "#ccc" }}
                      _hover={{ borderColor: "#ccc" }}
                    />
                    {errors.password && touched.password ? (
                      <Box as="p" color="red">
                        {errors.password}
                      </Box>
                    ) : null}
                  </Box>
                  <Box py="10px">
                    <Field
                      as={Input}
                      name="conPassword"
                      id="conPassword"
                      bg="#fff"
                      color="#787878"
                      type="password"
                      borderRadius="unset"
                      border="none"
                      borderBottom="2px solid #ccc"
                      pl="0px"
                      placeholder="Confirm Password"
                      _focus={{ borderColor: "#ccc" }}
                      _hover={{ borderColor: "#ccc" }}
                    />
                    {errors.conPassword && touched.conPassword ? (
                      <Box as="p" color="red">
                        {errors.conPassword}
                      </Box>
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
                                _focus={{ boxShadow: "none" }}
                              />
                              <Cropper
                                style={{ height: 400, width: "100%" }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                // preview=".img-preview"
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
                        {/* <Input type="image" src={cropData} alt="submit" value={cropData} name="cropImg" /> */}
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
                        bg="linear-gradient(90deg, rgba(203,104,5,1) 0%, rgba(255,171,3,1) 59%)"
                        px="50px"
                        color="#ffffff"
                        onClick={() => router.push("/LogIn")}
                      >
                        Log In
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </Box>
  );
}
