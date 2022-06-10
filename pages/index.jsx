import { Box } from "@chakra-ui/react";
import LogIn from "./SiginDemo";
import MaterialUiDemo from "./MaterialuiDemo";
import "../styles/Home.module.scss"
import SignIn from "./SignIn";

export default function Home() {
  return (
    <Box w="100%" h="100%">
      {/* <LogIn /> */}
      <SignIn />
      {/* <MaterialUiDemo /> */}
    </Box>
  );
}
