import { Box } from "@chakra-ui/react";
import SignIn from "./SignIn";
import MaterialUiDemo from "./MaterialuiDemo";
// import SignIn from "./SiginDemo";

export default function Home() {
  return (
    <Box w="100%" h="100%">
      <SignIn />
      {/* <MaterialUiDemo /> */}
    </Box>
  );
}
