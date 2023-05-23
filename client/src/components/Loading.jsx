import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex h={"100vh"} align={"center"} justify={"center"}>
      <Spinner size="xl" />
    </Flex>
  );
};

export default Loading;
