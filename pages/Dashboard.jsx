import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";

import { AddIcon, PhoneIcon } from "@chakra-ui/icons";
export default function Dashboard() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const itemobtained = localStorage.getItem("signedInObject");
    if (itemobtained) {
      let user_item = JSON.parse(itemobtained);
      setItems(user_item);
    }
    console.log(itemobtained, "itemobtained");
  }, []);

  return (
    <Box p="30px" bg="#015bea">
      <Box textAlign="end" mb="30px">
        <Link
          _hover={{ textDecoration: "none" }}
          bg="#fff"
          py="5px"
          borderRadius="6px"
          px="15px"
        >
          <Box display="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="15px"
              height="12px"
            >
              <path d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z" />
            </svg>
          </Box>
          Filter
        </Link>
      </Box>
      {items.length > 0 ? (
        <Box bg="#fff" p="25px" borderRadius="10px">
          <Grid
            templateColumns={{
              sm: "repeat(2, 1fr)",
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: "3", md: "4", lg: "10" }}
          >
            {items.map((user, i) => (
              <GridItem key={i}>
                <Box
                  w={"full"}
                  boxShadow={"2xl "}
                  borderRadius="5px"
                  rounded={"lg"}
                  textAlign={"center"}
                  border="2px solid #dddbdb69"
                  _hover={{
                    border: "2px solid #015bea",
                    boxShadow: "0px 0px 20px #015bea",
                  }}
                >
                  <Box
                    p={4}
                    bg="#015bea"
                    borderTopRightRadius="5px"
                    borderTopLeftRadius="5px"
                  >
                    <Avatar
                      size="xl"
                      border="2px solid #fff"
                      //   src={
                      //     "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                      //   }
                      src={user.cropImage}
                      alt={"Avatar Alt"}
                    />{" "}
                  </Box>
                  <Box p={4}>
                    <Heading fontSize="20px" fontFamily={"body"}>
                      <Text>{user.FullName}</Text>
                    </Heading>
                    <Text
                      fontWeight={600}
                      color={"gray.500"}
                      mb={0}
                      fontSize="14px"
                    >
                      {user.email}
                    </Text>
                    <Box fontSize="18px" fontWeight="600" mt="10px">
                      <PhoneIcon w={4} h={4} me="5px" color="#09a852" />:{" "}
                      <Text display="inline-block" color={"gray.500"}>
                        {user.MobNo}
                      </Text>
                    </Box>
                    <Text
                      textAlign={"center"}
                      color={useColorModeValue("gray.700", "gray.400")}
                      px={3}
                    >
                      <b> Role</b> : intern
                    </Text>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box color="red" height="150px">
          no user found
        </Box>
      )}
    </Box>
  );
};

