import {
  Heading,
  Box,
  Text,
  Stack,
  RadioGroup,
  Radio,
  GridItem,
  Grid,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { useRouter } from "next/router";
export default function Dashboard() {
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <Box bg="#E3F2FD" p={{ base: "10px", sm: "20px" }}>
      <Box bg="#fff" borderRadius="8px" my="20px">
        <Box p="10px 10px" border="1px solid rgb(227, 235, 235)">
          <Heading fontSize="25px">Dashboard</Heading>
        </Box>
        <Box p="15px" mb="15px" border="1px solid rgb(227, 235, 235)">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <Box p="15px">
                  <RadioGroup onChange={setValue} defaultValue="all">
                    <Stack direction={{ md: "row", base: "column" }} gap="10px">
                      <Radio
                        colorScheme="green"
                        // as={Radio}
                        value="all"
                        // checked={true}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        All
                      </Radio>
                      <Radio
                        colorScheme="green"
                        // as={Radio}
                        value="Intern"
                        checked={value === "Intern"}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        Intern
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="Frontend Developer"
                        checked={value === "Frontend Developer"}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        Frontend Dev
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="Backend Developer"
                        checked={value === "Backend Developer"}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        Backend Dev
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="DevOps"
                        checked={value === "DevOps"}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        DevOps
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </HStack>
            </HStack>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                <Box p="15px" mb="15px" border="1px solid rgb(227, 235, 235)">
                  <RadioGroup onChange={setValue} defaultValue="all">
                    <Stack direction={{ md: "row", base: "column" }} gap="10px">
                      <Radio
                        colorScheme="green"
                        // as={Radio}
                        value="all"
                        // checked={true}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        All
                      </Radio>
                      <Radio
                        colorScheme="green"
                        // as={Radio}
                        value="Intern"
                        checked={value === "Intern"}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        Intern
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="Frontend Developer"
                        checked={value === "Frontend Developer"}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        Frontend Dev
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="Backend Developer"
                        checked={value === "Backend Developer"}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        Backend Dev
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="DevOps"
                        checked={value === "DevOps"}
                        onChange={handleChange}
                        _focus={{ border: "none", boxShadow: "none" }}
                      >
                        DevOps
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Stack>
            </Box>
          ) : null}
        </Box>
        <Box p="10px 10px" borderBottom="1px solid rgba(245, 245, 245)">
          <Grid
            templateColumns={{
              lg: "repeat(3, 1fr)",
              md: "repeat(2, 1fr)",
              base: "repeat(1, 1fr)",
            }}
            gap={6}
          >
            {value.map((items, i) => (
              <GridItem key={i}>
                <Box
                  bg="#72a1ff26"
                  p={{ base: "10px", sm: "16px" }}
                  border="2px sloid transparent"
                  borderRadius="10px"
                  // w={{ base: "100%", lg: "40%" }}
                  m="auto"
                  _hover={{ boxShadow: "0 0 15px  lightblue" }}
                >
                  <Box w="80px" h="80px" alignItems="center">
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
