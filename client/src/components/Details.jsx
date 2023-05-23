import React from "react";
import {
  Input,
  Box,
  InputRightElement,
  Text,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const Details = ({ longUrl, shortUrl, liftState }) => {
  const actualShortUrl = `${window.location.href.substring(
    0,
    window.location.href.lastIndexOf("/")
  )}/${shortUrl}`;
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: "100%" }}
    >
      <Box
        rounded={"lg"}
        bg={"white"}
        boxShadow={"md"}
        p={5}
        mx={"auto"}
        w={{ base: "90%", md: "70%", lg: "50%" }}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        alignItems={"center"}
      >
        <Text>Long URL:</Text>
        <InputGroup>
          <Input variant="outline" value={longUrl} readOnly />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => navigator.clipboard.writeText(longUrl)}
            >
              <CopyIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text>Short URL:</Text>
        <InputGroup>
          <Input variant="outline" value={actualShortUrl} readOnly />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => navigator.clipboard.writeText(actualShortUrl)}
            >
              <CopyIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="blue" onClick={liftState}>
          Shorten another URL
        </Button>
      </Box>
    </motion.div>
  );
};

export default Details;
