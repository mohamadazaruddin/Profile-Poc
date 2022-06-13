import React, { useEffect, useState } from "react";
import Style from "../styles/Home.module.scss";
import {
  Box,
  Button,
  FormLabel,
  Image,
  Select,
  Input,
  Text,
  useDisclosure,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Hide,
  Show
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  Visibility,
  VisibilityOff,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { makeStyles, withStyles, createStyles, styled } from "@material-ui/styles";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignIn() {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState(false);
  const [cropper, setCropper] = useState();
  const [cropImg, setcropImg] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [errInput, setErrInput] = useState(true);
  const [inpCss, setInpCss] = useState();
  const [closeImg, setCloseImg] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const CssStyled = styled(TextField)({
      '& label.Mui-focused': {
        color: "#787878",
        fontSize: "25px",
        padding: " 0 0 10px 0px"
      },
      '& .MuiInputLabel-shrink': {
        top: "-10px"
      },
      '& .MuiInput-root': {
        paddingLeft: "5px",
      },
      '& .MuiTextField-root': {
        width: "100%"
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      },
    })
    setInpCss(CssStyled)
  }, [])

  const handleSubmit = (values) => {
    console.log(cropData, "cropData");
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
    var fileName = e.target.value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
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
      setErrInput(false)
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
      setErrInput(true)
    }
  };
  const getCropData = () => {
    if (cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setcropImg(true);
      onClose();
      console.log(cropData, "dddd");
    }
    else {
      alert("sas")
      setcropImg(false);
    }
  };
  // const handleClosed = () => {

  // }
  return (
    <Box
      p={{ base: "0px", md: "50px" }}
      bg="#E3F2FD"
      // backgroundImage="	https://colorlib.com/etc/cf/ContactFrom_v3/images/bg-01.jpg"
      width="100%"
      backgroundRepeat="no-repeat"
      backgroundPosition="center center"
      backgroundSize="cover"
      pos="relative"
      _before={{
        content: `""`,
        bg: "#E3F2FD",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Box
        w={{ base: "100%", md: "70%", lg: "60%" }}
        pos="relative"
        m="0 auto"
        bg="#ffffff"
        color="#fff"
        p="0 0"
      >
        <Formik
          initialValues={{
            FullName: "",
            MobNo: "",
            Email: "",
            Password: "",
            ConPassword: "",
            CropImage: "",
            Role: "",
            Location: "",
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
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                "Password must be strong"
              )
              .required("Required"),
            ConPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("Password"), null], "Passwords must match"),
            Role: Yup.string().required("Required"),
            Location: Yup.string().required("Required"),
            CropImage: Yup.object().required("Required"),
          })}
        >
          {({ errors, touched }) => (
            <Form className={Style.signInform}>
              <Box p={{ base: "20px", lg: "40px" }} bg="#ffffff" zIndex="99">
                <Box py="10px">
                  <Box display={{ base: "block", sm: "flex" }} alignItems="end">
                    <Box w={{ base: "100%", sm: "50%" }} m="auto">
                      <Input
                        type="file"
                        name="CropImage"
                        mb="10px"
                        onChange={onChange}
                        bg="transparent"
                        border="none"
                        accept="image/x-png,image/gif,image/jpeg"
                        _focus={{ boxShadow: "none" }}
                      />
                      <Box
                        h={{ base: "200px", sm: "150px" }}
                        w={{ base: "200px", sm: "150px" }}
                        bg="#c1bebe"
                        display="grid"
                        placeItems="center"
                        color="#000"
                        m="auto"
                        onClick={onOpen}
                        cursor="pointer"
                      >
                        <Cropper
                          style={{ height: 100, width: "100%" }}
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
                          aspectRatio={1}
                          dragMode="none"
                        />
                        {cropData ? <Image
                          h={{ base: "200px", sm: "150px" }}
                          w={{ base: "200px", sm: "150px" }}
                          src={cropData} alt="cropped" /> : "Upload Image"}
                      </Box>
                      <Button colorScheme="blue" onClick={getCropData}>Crop Image</Button>
                      {/* {errors.CropImage && touched.CropImage ? (
                        <Text color="red" textAlign="center" fontSize="14px" fontWeight="600">
                          {errors.CropImage}
                        </Text>
                      ) : (<Text color="transparent" fontSize="14px" fontWeight="600">
                        Text
                      </Text>)} */}
                    </Box>
                    <Box
                      pos="relative"
                      w={{ base: "100%", sm: "50%" }}
                      m={{ base: "auto", sm: "0px" }}
                      textAlign="center"
                      p="0 25px"
                      mt={{ base: "15px", sm: "0px" }}
                    >
                      <Button
                        bg="#B9DFFF"
                        px="50px"
                        w="100%"
                        color="#ffffff"
                        type="submit"
                        name="submit"
                        _hover={{ bg: "#016ABC" }}
                        transition="0.5s linear"
                        mb={{ base: "10px", sm: "0px" }}
                      >
                        Sign In
                      </Button>
                      <Hide below="sm">
                        <Box color="#000"
                          mt="10px"
                          fontSize="15px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexWrap="wrap">
                          Already Have An Account ?
                          <Text onClick={() => router.push("/LogIn")}
                            ml="5px"
                            textDecoration="underline"
                            color="blue"
                            cursor="pointer"
                          >
                            LogIn</Text>
                        </Box>
                      </Hide>
                      <Show below="sm">
                        <Box color="#000"
                          fontSize="15px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexWrap="wrap">
                          Already Have An Account ?
                          <Text onClick={() => router.push("/LogIn")}
                            ml="5px"
                            textDecoration="underline"
                            color="blue"
                            cursor="pointer"
                          >
                            LogIn</Text>
                        </Box>
                      </Show>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box >
  );
}
