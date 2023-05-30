import React, { useState } from "react";
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  ExternalLinkIcon,
  CopyIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { motion } from "framer-motion";

const UrlTable = ({ data, fetchData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const cancelRef = React.useRef();
  const [urlId, setUrlId] = useState(null);
  const [longUrl, setLongUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const modalSize = useBreakpointValue({ base: "xs", md: "md", xl: "xl" });
  const toast = useToast();

  const handleClick = (id, action) => {
    setUrlId(id);
    if (action === "delete") {
      setOpenDialog(true);
    } else {
      setOpenModal(true);
    }
  };

  const makeLink = (id) => {
    const link = `${window.location.href.substring(
      0,
      window.location.href.lastIndexOf("/")
    )}/${id}`;
    return link;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    return formattedDate;
  };

  const deleteUrl = () => {
    setOpenDialog(false);
    fetch(`/api/tinylink/delete`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({
        id: urlId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          fetchData(); //calling fetchData function to refresh the table with new data
        }
        toast({
          title: response.message,
          status: response.success ? "success" : "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => console.log(error));
  };

  const updateUrl = () => {
    setOpenModal(false);
    fetch(`/api/tinylink/update`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        id: urlId,
        newUrl: newUrl,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          fetchData(); //calling fetchData function to refresh the table with new data
        }
        toast({
          title: response.message,
          status: response.success ? "success" : "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setNewUrl(""));
  };

  return (
    <>
      <AlertDialog
        isOpen={openDialog}
        leastDestructiveRef={cancelRef}
        onClose={() => setOpenDialog(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete URL
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure, you want to delete this URL?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setOpenDialog(false)}
                m={1}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteUrl} m={1}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* ALert Dialog Ends */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        size={modalSize}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Edit Url</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={1}>
              <FormControl>
                <FormLabel>Long URL:</FormLabel>
                <Input value={longUrl} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>New Long URL:</FormLabel>
                <Input
                  value={newUrl}
                  autoComplete="off"
                  onChange={(e) => setNewUrl(e.target.value)}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="telegram" onClick={updateUrl}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TableContainer boxShadow={"md"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign={"center"}>#</Th>
              <Th textAlign={"center"}>Details</Th>
              <Th textAlign={"center"}>Clicks</Th>
              <Th textAlign={"center"}>Created At</Th>
              <Th textAlign={"center"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Td>{index + 1}</Td>
                <Td display={"flex"} gap={2} flexDirection={"column"}>
                  <Flex gap={1} alignItems="center">
                    <Link href={makeLink(item.shortId)} isExternal>
                      {makeLink(item.shortId)}
                    </Link>
                    <ExternalLinkIcon />
                  </Flex>
                  <Flex gap={1} alignItems="center">
                    <Link
                      href={item.redirectUrl}
                      isExternal
                      isTruncated
                      maxW="300px"
                    >
                      {item.redirectUrl}
                    </Link>
                    <ExternalLinkIcon />
                  </Flex>
                </Td>
                <Td>{item.clicks}</Td>
                <Td>{formatDate(item.createdAt)}</Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Menu
                    </MenuButton>
                    <MenuList>
                      <Link
                        href={makeLink(item.shortId)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MenuItem icon={<ExternalLinkIcon />}>
                          Open Link
                        </MenuItem>
                      </Link>
                      <MenuItem
                        icon={<CopyIcon />}
                        onClick={() =>
                          navigator.clipboard.writeText(makeLink(item.shortId))
                        }
                      >
                        Copy Link
                      </MenuItem>
                      <MenuItem
                        icon={<EditIcon />}
                        onClick={() => {
                          setLongUrl(item.redirectUrl);
                          handleClick(item._id, "edit");
                        }}
                      >
                        Edit Link
                      </MenuItem>
                      <MenuItem
                        icon={<DeleteIcon />}
                        onClick={() => handleClick(item._id, "delete")}
                      >
                        Delete Link
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </motion.tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UrlTable;
