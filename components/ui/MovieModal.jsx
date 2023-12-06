import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function MovieModal({ movie, onClose }) {
  const { isOpen, onOpenChange } = useDisclosure();

  const handleAction = () => {
    // Add functionality for the action button here
    // For example, console.log('Action clicked');
    // Perform action related to the movie details
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{movie.title}</ModalHeader>
            <ModalBody>
              <p>{movie.overview}</p> {/* Display movie synopsis or overview */}
              <p>Release Date: {movie.release_date}</p> {/* Display release date */}
              {/* Add more movie details as needed */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={() => { handleAction(); onClose(); }}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
