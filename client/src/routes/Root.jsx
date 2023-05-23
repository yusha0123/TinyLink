import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Heading,
  Button,
  VStack,
} from "@chakra-ui/react";
import HeroImage from "../assets/undraw_link_shortener.png";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";

const Root = () => {
  const navigate = useNavigate();
  return (
    <section style={{ overflowX: "hidden" }}>
      <Navbar />
      <Box
        sx={{ marginTop: 5 }}
        display="flex"
        alignItems="center"
        width="90%"
        height="100%"
        mx="auto"
        justifyContent="center"
      >
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
          justifyContent="center"
          alignItems="center"
        >
          <motion.div
            transition={{ duration: 1 }}
            initial={{
              x: "-100vw",
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
          >
            <VStack gap={5}>
              <Heading textAlign="center">
                Shorten, share and track your URLs with ease!
              </Heading>
              <Button
                colorScheme="whatsapp"
                size="lg"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </VStack>
          </motion.div>
          <motion.div
            transition={{ duration: 1 }}
            initial={{
              x: "100vw",
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Image src={HeroImage} alt="Hero image" objectFit="cover" />
          </motion.div>
        </Grid>
      </Box>
    </section>
  );
};

export default Root;
