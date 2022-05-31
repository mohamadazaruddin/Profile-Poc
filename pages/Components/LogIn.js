import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import Router from "next/router";
import dynamic from "next/dynamic";
const ImageCropper = dynamic(() => import("../../Components/ImageCropper"), {
  ssr: false,
});
export default function Login(props) {
  //   const [fullname, setfullname] = useState("");
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);
  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;

        setImageToCrop(image);
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };
  useEffect(() => {
    const signedInObject = window.localStorage.getItem("signedInObject");
    console.log("signedInObject", JSON.parse(signedInObject));
  }, []);

  return (
    <div>
      <Box>
        <input type="file" accept="image/*" onChange={onUploadFile} />
        <div>
          <ImageCropper
            imageToCrop={imageToCrop}
            onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
          />
        </div>
        {croppedImage && (
          <div>
            <h2>Cropped Image</h2>
            <img alt="Cropped Img" src={croppedImage} />
          </div>
        )}
        <Button onClick={() => Router.push("/Components/SignIn")}>
          Sign In
        </Button>
      </Box>
    </div>
  );
}
