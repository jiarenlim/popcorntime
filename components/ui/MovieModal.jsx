import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@nextui-org/react";
import { fetchMovieDetails } from "@/app/action";
import {CircularProgress,Chip} from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area"
export default function MovieModal({ movie, onClose }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  useEffect(() => {
    async function fetchDetails() {
      if (movie) {
        const details = await fetchMovieDetails(movie.id); // Fetch movie details including cast
        setMovieDetails(details);
      }
    }

    fetchDetails();
  }, [movie]);

  return (
    <Modal className="max-h-[40rem] overflow-y-auto"
    
      backdrop="opaque" 
      isOpen={!!movie} 
      onOpenChange={onClose}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        
      }}
    >
      
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{movie?.title}</ModalHeader>
        <ModalBody>
          <p className="text-sm">{movie?.overview}</p>
          <p className="text-sm">Release Date: {movie?.release_date}</p>
          <p className="text-sm">Popularity: {movie?.popularity}</p>
          {/* <p>Score: {movie ? `${(movie.vote_average * 10).toFixed(0)}%` : 'N/A'}</p> */}
          <div className="flex justify-start">
          {/* <Chip
          classNames={{
            base: "border-1 border-black/30",
            content: "text-black/90 text-xs font-semibold",
          }}
          variant="bordered"
        >
          Score:
        </Chip> */}
        <p className="mr-2 text-sm">Score:</p>
          <CircularProgress
          classNames={{
            svg: "w-12 h-12 drop-shadow-md ",
            indicator: "stroke-green-600",
            track: "stroke-green-950/10",
            value: " text-md font-semibold text-black",
          }}
          value={movie ? movie.vote_average * 10 : 0} 
          strokeWidth={4}
          showValueLabel={true}
        />
        </div>
         
          {/* Display cast with images */}
          <div className="flex overflow-x-auto gap-4">
  {movieDetails?.cast?.map((castMember, index) => (
    <div
      key={index}
      style={{ flex: '0 0 auto', textAlign: 'center' }} // Center content horizontally
    >
      <Image
        src={castMember.profile_path ? `https://image.tmdb.org/t/p/w200/${castMember.profile_path}` : `https://placehold.co/200x300?text=No\n Photo`}
        alt={castMember.name}
        width={100}
        height={100}
        // className=" h-auto" // Ensure image fits within the container
        fallbackSrc={`https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg`}
      />
      <p className="text-sm sm:text-xs md:text-sm lg:text-xs xl:text-sm">
        {castMember.name}
      </p>
      {/* <p className="text-xs sm:text-xxs md:text-xs lg:text-xxs xl:text-xs">
        {castMember.character}
      </p> */}
    </div>
  ))}
</div>



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
