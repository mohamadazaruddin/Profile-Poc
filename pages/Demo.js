import React, { useState } from "react";
import { Box, Button, FormLabel, Input, Flex, Image } from "@chakra-ui/react";
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
import { useDisclosure } from "@chakra-ui/react";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export default function SignIn(value) {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Box
      w="50%"
      m="0 auto"
      bg="#3997f8"
      color="#fff"
      px="100px"
      py="40px"
      mt="10px"
      borderRadius="20px"
      boxShadow="0px 0px 10px #000"
    >
      <Formik
        initialValues={{
          FullName: "",
          MobNo: "",
          email: "",
          password: "",
          conPassword: "",
          cropImg: "",
        }}
        onSubmit={(values) => {
          console.log(values, "values");
          localStorage.setItem("signData", JSON.stringify(values));
          // localStorage.setItem("ImgData", JSON.stringify(cropData))
        }}
        validationSchema={Yup.object().shape({
          FullName: Yup.string().max(15, "Too Long").required("Required"),
          MobNo: Yup.string()
            .max(10, "Invalid Number")
            .min(10, "Invalid Number")
            .required("Required"),
          email: Yup.string().email("Enter Valid Email").required("Required"),
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
            <Box py="10px">
              <FormLabel htmlFor="conPassword" fontSize="20px" fontWeight="600">
                Confirm Password
              </FormLabel>
              <Field
                as={Input}
                name="conPassword"
                id="conPassword"
                bg="#fff"
                color="#333"
                type="password"
              />
              {errors.conPassword && touched.conPassword ? (
                <Box as="p" color="red">
                  {errors.conPassword}
                </Box>
              ) : null}
            </Box>
            <Box py="10px">
              <Flex>
                <Box w="50%">
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader textAlign="center">Crop Image</ModalHeader>
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
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button onClick={getCropData}>Crop Image</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  {/* <Input type="image" src={cropData} alt="submit" value={cropData} name="cropImg" /> */}
                  <Image w="100%" src={cropData} alt="cropped" p="20px" />
                </Box>
                <Box pos="relative" w="50%">
                  <Button
                    onClick={onOpen}
                    pos="absolute"
                    left="50%"
                    top="50%"
                    transform="translate(-50%, -50%)"
                    color="#000"
                  >
                    Upload Image
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Box textAlign="center" mt="20px">
              <Button bg="#FFC803" w="60%" type="submit" name="submit">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}