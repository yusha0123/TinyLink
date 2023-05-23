import {
  Box,
  Button,
  FormControl,
  Heading,
  Img,
  Input,
  VStack,
  useToast,
  Progress,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Details from "../components/Details";
import UrlTable from "../components/UrlTable";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    shortUrl: "",
    LongUrl: "",
  });
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [showProgress, setshowProgress] = useState(false);

  const liftState = () => {
    setShow(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setshowProgress(true);
    if (show) {
      setShow(false);
    }
    fetch(`/api/tinylink/data`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.success) {
          localStorage.removeItem("accessToken"); //remove the invalid token
          toast({
            title: "User is Unauthorized!",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/login");
        } else {
          setData(response.data);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setshowProgress(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`/api/tinylink/shorten`, {
      method: "POST",
      body: JSON.stringify({
        redirectUrl: input,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.invalidUrl) {
          toast({
            title: "Please enter a Valid URL!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else if (response.success) {
          setDetails({
            LongUrl: input,
            shortUrl: response.id,
          });
          setShow(true);
          fetchData();
          setInput("");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  return (
    <>
      {showProgress && (
        <Progress height="3px" isIndeterminate colorScheme="gray.500" />
      )}
      {/* Navbar */}
      <Box as="nav" boxShadow="md" bg={"gray.200"}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={{
            base: "2",
            lg: "6",
          }}
          py={{
            base: "3",
            lg: "4",
          }}
        >
          <Box>
            <Link to={"/"}>
              <Img src={Logo} width="150px" height="40px" />
            </Link>
          </Box>
          <Button
            colorScheme="red"
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
      {/* Navbar Ends */}
      <VStack spacing={4} my={10}>
        {!show && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ ease: "easeOut" }}
            style={{ width: "100%" }}
          >
            <Box
              rounded={"lg"}
              bg={"white"}
              boxShadow={"md"}
              p={6}
              mx={"auto"}
              w={{ base: "90%", md: "70%", lg: "50%" }}
            >
              <Heading fontSize="2xl" mb={3} textAlign={"center"}>
                Paste the URL to be shortened
              </Heading>
              <form onSubmit={handleSubmit}>
                <VStack spacing={3}>
                  <FormControl>
                    <Input
                      // type="url"
                      autoComplete="off"
                      placeholder="Your URL here"
                      size={"lg"}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    size={"lg"}
                    colorScheme="gray"
                    isDisabled={!input}
                    isLoading={loading}
                    width={"40%"}
                    type="submit"
                  >
                    Shorten
                  </Button>
                </VStack>
              </form>
            </Box>
          </motion.div>
        )}
        {show && (
          <Details
            longUrl={details.LongUrl}
            shortUrl={details.shortUrl}
            liftState={liftState}
          />
        )}
        {data.length > 0 && <UrlTable data={data} fetchData={fetchData} />}
      </VStack>
    </>
  );
};

export default Home;
