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
  RadioGroup,
  Radio,
  useColorModeValue,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { PhoneIcon } from "@chakra-ui/icons";
export default function Dashboard() {
  const [value, setValue] = useState([]);
  const [media, setMedia] = useState(false);
  const [items, setItems] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const itemobtained = localStorage.getItem("signedInObject");
    if (itemobtained) {
      let user_item = JSON.parse(itemobtained);
      setItems(user_item);
      setValue(user_item);
    }
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    var name = e.target.value;
    var person = items.filter(function (items) {
      if (name == "all") {
        return items;
      } else {
        return items.Role == name;
      }
    });
    setValue(person);
    console.log(name, "name ");
    console.log(value, "value");
    console.log(person, "person");
  };
  return (
    <Box bg="#E3F2FD" p="20px">
      <Box bg="#fff" borderRadius="8px" my="20px">
        <Box p="10px 10px" border="1px solid rgb(227, 235, 235)">
          <Heading fontSize="25px">Dashboard</Heading>
        </Box>
        <Box
          // borderRadius="8px"
          p="15px"
          mb="15px"
          border="1px solid rgb(227, 235, 235)"
        >
          <RadioGroup onChange={setValue} defaultValue="all" value={value}>
            <Stack direction={{ md: "row", base: "column" }} gap="10px">
              <Radio
                colorScheme="red"
                // as={Radio}
                value="all"
                // checked={true}
                onChange={handleChange}
              >
                All
              </Radio>
              <Radio
                colorScheme="red"
                // as={Radio}
                value="Intern"
                checked={value === "Intern"}
                onChange={handleChange}
              >
                Intern
              </Radio>
              <Radio
                colorScheme="red"
                value="Frontend Developer"
                checked={value === "Frontend Developer"}
                onChange={handleChange}
              >
                Frontend Dev
              </Radio>
              <Radio
                colorScheme="red"
                value="Backend Developer"
                checked={value === "Backend Developer"}
                onChange={handleChange}
              >
                Backend Dev
              </Radio>
              <Radio
                colorScheme="red"
                value="DevOps"
                checked={value === "DevOps"}
                onChange={handleChange}
              >
                DevOps
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box p="10px 10px" borderBottom="1px solid rgba(245, 245, 245)">
          <Grid
            templateColumns={{ md: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
            gap={6}
          >
            {value.map((items, i) => (
              <GridItem key={i}>
                <Box
                  bg="#72a1ff26"
                  p="16px"
                  border="2px sloid transparent"
                  borderRadius="10px"
                  // w={{ base: "100%", lg: "40%" }}
                  m="auto"
                  _hover={{ boxShadow: "0 0 15px  lightblue" }}
                >
                  <Box w="90px" h="80px" alignItems="center" pr="15px">
                    <Box
                      w="100%"
                      h="100%"
                      bg="gray"
                      borderRadius="50%"
                      bgImg={items.CropImage}
                      backgroundSize="cover"
                      backgroundPosition="center"
                      border=" 1px solid rgb(245, 245, 245)"
                    ></Box>
                  </Box>
                  <Box pt="15px" alignItems="center">
                    <Box mr="10px" fontFamily="sans-serif">
                      <Box>
                        <Text
                          fontWeight="600"
                          fontSize="20px"
                          color="#212121"
                          lineHeight="25px"
                        >
                          {items.FullName}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize="12px"
                          color="#9E9E9E"
                          lineHeight="1.66"
                          fontWeight="400"
                          textTransform="capitalize"
                        >
                          {items.Role}
                        </Text>
                      </Box>
                      <Box pt="24px">
                        <Text
                          fontSize="12px"
                          color="#616161"
                          lineHeight="1.57"
                          fontWeight="400"
                        >
                          I am {items.FullName} as an {items.Role} Lorem, ipsum
                          dolor sit amet consectetur adipisicing elit.Blanditiis
                          a beatae ullam vitae sunt repudiandae voluptate animi
                          molestias, voluptatem, dolor
                        </Text>
                      </Box>
                      <Box pt="24px">
                        <Text color="#9E9E9E" fontWeight="400" fontSize="12px">
                          Email
                        </Text>
                        <Text
                          color="#212121"
                          m="0px"
                          mb="0px"
                          fontWeight="600"
                          fontSize="12px"
                          lineHeight="1.6"
                        >
                          {items.Email}
                        </Text>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        pt="24px"
                      >
                        <Box>
                          <Text
                            color="#9E9E9E"
                            fontWeight="400"
                            fontSize="12px"
                          >
                            Phone
                          </Text>
                          <Text
                            color="#212121"
                            m="0px"
                            mb="0px"
                            fontWeight="600"
                            fontSize="12px"
                            lineHeight="1.6"
                          >
                            {items.MobNo}
                          </Text>
                        </Box>
                        <Box w="55%">
                          <Text
                            color="#9E9E9E"
                            fontWeight="400"
                            fontSize="12px"
                          >
                            Location
                          </Text>
                          <Text
                            color="#212121"
                            m="0px"
                            mb="0px"
                            fontWeight="600"
                            fontSize="12px"
                            lineHeight="1.6"
                          >
                            India
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
