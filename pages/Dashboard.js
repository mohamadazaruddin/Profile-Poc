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
  //   const [Users, setValues] = useState();
  //   const [Obtainedvalue, setValueSubmitted] = useState(false);

  //   useEffect(() => {
  //     const signedInObject = window.localStorage.getItem("signedInObject");
  //     if (signedInObject) {
  //       setValues(JSON.parse(signedInObject));
  //       setValueSubmitted(false);
  //     } else {
  //       console.log("no data");
  //     }
  //   }, [Obtainedvalue]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("signedInObject"));
    if (items) {
      setItems(items);
    }
    console.log(items, "items");
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
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {items.map((user, i) => (
          <GridItem>
            <Box
              maxW={"320px"}
              w={"full"}
              key={i}
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
              />{" "}
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                <Text>{user.FullName}</Text>
              </Heading>
              <Text fontWeight={600} color={"gray.500"} mb={0}>
                {user.email}
              </Text>
              <Box fontSize="18px" fontWeight="600">
                Mob:{" "}
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
    </Box>
  );
}
