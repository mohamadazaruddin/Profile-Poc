import { Box, Button, Flex, Text, Heading } from "@chakra-ui/react";
import React from "react";

export default function Profile() {
  return (
    <Box bg="#3997f8" p="30px">
      <Box
        bg="#fff"
        p="0px 30px"
        borderRadius="10px"
        w="70%"
        m="auto"
        boxShadow="0px 0px 20px #000000b0"
      >
        <Flex>
          <Box display="flex" alignItems="center">
            <Box
              w="150px"
              h="150px"
              bg="gray"
              borderRadius="50%"
              p="15px"
            ></Box>
          </Box>
          <Box p="15px">
            <Heading> Shoaib Shaikh </Heading>
            <Text color="#3997f8" fontWeight="600" m="0px" mb="10px">
              @shaikhshoaib040 @gmail.com
            </Text>
            <Text fontWeight="600" mb="25px">
              I am Shoaib Shaikh Rashid As an inter Lorem, ipsum dolor sit amet
              consectetur adipisicing elit.Blanditiis a beatae ullam vitae sunt
              repudiandae voluptate animi molestias, voluptatem, dolor ex alias
              rem iste.Ratione reprehenderit sed impedit saepe deleniti.Lorem
              ipsum dolor sit amet consectetur adipisicing elit.Adipisci nemo
              iste dignissimos soluta!Dicta nobis voluptates totam, reiciendis
              expedita error doloribus ea.Asperiores illo nihil quibusdam,
              eligendi expedita iusto necessitatibus.
            </Text>
            <Button
              bg="#3997f8"
              fontWeight="bold"
              color="#fff"
              borderRadius="25px"
              p="10px 30px"
              _hover={{
                bg: "#017eff",
              }}
              border="none"
              cursor="pointer"
            >
              Edit Profile
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
