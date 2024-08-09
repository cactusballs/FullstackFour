import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import ForumButton from "../forum/ForumButton.jsx";

import { useState } from "react";

function BroadcastModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    let message = e.target.message;
    setMessage(message);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/broadcastmessages", {
        method: "POST",
        body: JSON.stringify({ key: "message" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.err("Error:", err);
    }

    handleSubmit(e);
  }

  return (
    <>
      <Button onClick={onOpen} onSubmit={handleSubmit}>
        Create
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW="450px"
          bg="#EEE8E5"
          color="black"
          borderRadius="5px"
          padding="20px"
          boxShadow="0 0 0.75rem grey"
        >
          <ModalHeader display="flex" justifyContent="right">
            <ModalCloseButton width="20px" />
          </ModalHeader>
          <ModalBody
            display="flex"
            justifyContent="left"
            alignItems="center"
            ml="20px"
          >
            <form id="broadcast-form">
              <FormControl id="message" mb="30px">
                <FormLabel
                  paddingBottom="30px"
                  fontSize="26px"
                  fontFamily="League Spartan"
                >
                  Create a message
                </FormLabel>
                <Textarea
                  name="broadcast-message"
                  value={message}
                  w="350px"
                  onChange={handleMessageChange}
                  placeholder="Enter your message here"
                ></Textarea>
                <FormHelperText
                  fontSize="12px"
                  fontFamily="Verdana"
                  mt="12px"
                  fontStyle="italic"
                >
                  Your message will be broadcasted to all villagers for the next
                  24 hours once you submit it.
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter mb="30px">
            <ForumButton
              buttonContent="Close"
              onClick={onClose}
              className="broadcast-button"
            ></ForumButton>
            <ForumButton
              type="submit"
              buttonContent="Submit"
              onClick={handleSubmit}
              className="broadcast-button"
            ></ForumButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BroadcastModal;
