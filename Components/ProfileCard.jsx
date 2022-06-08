import React from "react";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
export default function ProfileCard() {
  return (
    <Box bg="#e3f2fd" p="20px" h="100vh">
      <Box bg="#fff" borderRadius="8px">
        <Box p="10px 10px" borderBottom="1px solid rgba(245, 245, 245) ">
          <Heading fontSize="25px"> Profile</Heading>
        </Box>
        <Box
          p="70px"
          display="grid"
          justifyContent="center"
          fontFamily="Roboto, sans-serif"
        >
          <Box
            bg="rgb(250, 250, 250)"
            p="24px"
            borderRadius="10px"
            w={{ base: "100%" }}
            m="auto"
            boxShadow="rgb(32 40 45 / 8%) 0px 2px 14px 0px"
          >
            <Box mb="24px">
              <Box
                w="75px"
                h="75px"
                bg="gray"
                borderRadius="50%"
                bgImg="/Mumbai.jpeg"
                backgroundSize="cover"
                backgroundPosition="center"
              ></Box>
            </Box>
            <Box mb="24px" lineHeight="0.9">
              <Box as="h2" fontSize="1.125rem" fontWeight="600">
                Safwan Ahmed
              </Box>
              <Box
                as="span"
                color="rgb(158, 158, 158)"
                fontWeight="400"
                lineHeight="1.66"
              >
                UI Intern
              </Box>
            </Box>
            <Box
              color="rgb(97, 97, 97)"
              lineHeight="1.57"
              fontSize="0.75rem"
              fontWeight="400"
              mb="24px"
            >
              Use the neural RSS application, then you can program the bluetooth
              firewall! #DOO
            </Box>
            <Box lineHeight="0.9" marginBottom="24px">
              <Box
                as="span"
                color="rgb(158, 158, 158)"
                fontWeight="400"
                lineHeight="1.66"
              >
                Email
              </Box>
              <Box as="h6" fontSize="1rem">
                rehan@yahoo.com
              </Box>
            </Box>
            <Flex alignItems="center" justifyContent="space-between" mb="24px">
              <Box lineHeight="0.9">
                <Box
                  as="span"
                  color="rgb(158, 158, 158)"
                  fontWeight="400"
                  lineHeight="1.66"
                >
                  Phone
                </Box>
                <Box as="h6" fontSize="1rem">
                  8097280824
                </Box>
              </Box>
              <Box lineHeight="0.9">
                <Box
                  as="span"
                  color="rgb(158, 158, 158)"
                  fontWeight="400"
                  lineHeight="1.66"
                >
                  Location
                </Box>
                <Box as="h6" fontSize="1rem">
                  Mumbai
                </Box>
              </Box>
            </Flex>
            <Box>
              <Button
                leftIcon={<EditIcon />}
                w="100%"
                colorScheme="blue"
                variant="solid"
              >
                Edit the Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
