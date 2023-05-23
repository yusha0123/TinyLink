import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  CloseButton,
  useToast,
  Img,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username.length < 4) {
      setAlert({
        open: true,
        message: "Please use a Valid Username!",
      });
      return;
    } else if (data.password.length < 6) {
      setAlert({
        open: true,
        message: "Password length is too Short!",
      });
      return;
    }
    setLoading(true);
    setAlert({
      open: false,
      message: "",
    });
    fetch(`/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.success) {
          localStorage.setItem("accessToken", response.accessToken);
          navigate("/home");
        }
        toast({
          title: response.message || response.error,
          status: response.success ? "success" : "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Box position="fixed" top={0} right={0} left={0} my={2}>
        <Link to={"/"}>
          <Img src={Logo} width="150px" height="40px" mx="auto" />
        </Link>
      </Box>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.200">
        <Box
          rounded={"lg"}
          bg="white"
          boxShadow={"lg"}
          p={6}
          w={{ base: "90%", md: "50%", lg: "30%" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <Heading fontSize={"2xl"} textAlign="center" mb={6}>
              Create your account
            </Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={1}>
                {alert.open && (
                  <Alert status="error" borderRadius={8}>
                    <AlertIcon />
                    {alert.message}
                    <CloseButton
                      onClick={() => {
                        setAlert({
                          open: false,
                          message: "",
                        });
                      }}
                      ml="auto"
                    />
                  </Alert>
                )}
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    autoComplete="off"
                    value={data.name}
                    onChange={(e) => {
                      setData({
                        ...data,
                        username: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    autoComplete="off"
                    value={data.email}
                    onChange={(e) => {
                      setData({
                        ...data,
                        email: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      value={data.password}
                      onChange={(e) => {
                        setData({
                          ...data,
                          password: e.target.value,
                        });
                      }}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack spacing={3} mt={3}>
                <Button
                  colorScheme="messenger"
                  type="submit"
                  isLoading={loading}
                >
                  Create Account
                </Button>
                <Text textAlign="center" fontSize="md">
                  Already Have an Account?{" "}
                  <Button
                    colorScheme="teal"
                    variant="link"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                </Text>
              </Stack>
            </form>
          </motion.div>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
