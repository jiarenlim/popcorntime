import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function MovieModal({ movie, onClose }) {
  return (
    <Modal 
      backdrop="opaque" 
      isOpen={!!movie} 
      onOpenChange={onClose}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{movie?.title}</ModalHeader>
        <ModalBody>
          <p>{movie?.overview}</p> {/* Display movie overview */}
          <p>Release Date: {movie?.release_date}</p> {/* Display release date */}
          {/* <p>Score: {movie?.vote_average}</p>  */}
          <p>Score: {movie ? `${(movie.vote_average * 10).toFixed(0)}%` : 'N/A'}</p>

          {/* Add more movie details as needed */}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Buy Tickets
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
