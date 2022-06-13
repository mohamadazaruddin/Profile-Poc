import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

function _app({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default _app;
