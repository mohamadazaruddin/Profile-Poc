import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import Router from "next/router";
import dynamic from "next/dynamic";
// const ImageCropper = dynamic(() => import("../../Components/ImageCropper"), {
//   ssr: false,
// });
import Demo from "../../Components/ImageCropper";
export default function Login(props) {
  useEffect(() => {
    const signedInObject = window.localStorage.getItem("signedInObject");
    console.log("signedInObject", JSON.parse(signedInObject));
  }, []);

  return (
    <div>
      <Box>
        <Demo />
        <Button onClick={() => Router.push("/Components/SignIn")}>
          Sign In
        </Button>
      </Box>
    </div>
  );
}
