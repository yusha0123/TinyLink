import React, { useState } from "react";
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
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
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Short ID</Th>
              <Th>Clicks</Th>
              <Th>Created At</Th>
              <Th>Action</Th>
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
                <Td>
                  <Link
                    href={makeLink(item.shortId)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.shortId}
                  </Link>
                </Td>
                <Td>{item.clicks}</Td>
                <Td>{formatDate(item.createdAt)}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => {
                      setLongUrl(item.redirectUrl);
                      handleClick(item._id, "edit");
                    }}
                    m={1}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => handleClick(item._id, "delete")}
                    m={1}
                  />
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
