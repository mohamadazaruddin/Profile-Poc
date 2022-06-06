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
import React, { useEffect, useState, useRef } from "react";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemobtained = localStorage.getItem("signedInObject");
    if (itemobtained) {
      let user_item = JSON.parse(itemobtained);
      setItems(user_item);
    }
    console.log(itemobtained, "itemobtained");
  }, []);

  return (
    <Box p="50px" bg="#3997f8">
      <Box textAlign="end">
        <Link
          href="/SignIn"
          _hover={{ textDecoration: "none" }}
          bg="#FFC803"
          py="5px"
          borderRadius="6px"
          px="30px"
        >
          Add user
        </Link>
      </Box>
      {items.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {items.map((user, i) => (
            <GridItem key={i}>
              <Box
                maxW={"320px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={6}
                textAlign={"center"}
              >
                <Avatar
                  size={"xl"}
                  //   src={
                  //     "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  //   }
                  src={user.cropImage}
                  alt={"Avatar Alt"}
                  mb={4}
                />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  <Text>{user.FullName}</Text>
                </Heading>
                <Text fontWeight={600} color={"gray.500"} mb={0}>
                  {user.email}
                </Text>
                <Box fontSize="18px" fontWeight="600">
                  Mob:
                  <Text display="inline-block" color={"gray.500"}>
                    {user.MobNo}
                  </Text>
                </Box>
                <Text
                  textAlign={"center"}
                  color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                >
                  Actress, musician, songwriter and artist. PM for work inquires
                  or me tag in your posts
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Box color="red" height="150px">
          no user found
        </Box>
      )}
    </Box>
  );
}
