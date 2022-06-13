import React, { useState, useEffect } from "react";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Demo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

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
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
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
  );
}
