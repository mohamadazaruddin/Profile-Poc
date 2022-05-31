import React from "react";
import { Box, Button } from "@chakra-ui/react";
import Router from "next/router";

export default function () {
  return (
    <div>
      <Box>
        <Button onClick={() => Router.push("/Components/SignIn")}>
          Sign In
        </Button>
      </Box>
    </div>
  );
}
