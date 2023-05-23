import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box as="nav" boxShadow="md">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{
          base: "3",
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

        {isSmallScreen && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem onClick={() => navigate("/login")}>Sign in</MenuItem>
              <MenuItem onClick={() => navigate("/register")}>Sign up</MenuItem>
            </MenuList>
          </Menu>
        )}

        {!isSmallScreen && (
          <HStack spacing="3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign in
            </Button>
            <Button colorScheme="blue" onClick={() => navigate("/register")}>
              Sign up
            </Button>
          </HStack>
        )}
      </Box>
    </Box>
  );
};
