'use client'
// import Image from 'next/image'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import Navbar from '@/components/ui/Navbar'
import { Popcorn } from 'lucide-react';
import Footer from '@/components/ui/Footer'
import NextImage from "next/image";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Skeleton} from "@nextui-org/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { fetchMovies } from './action'
import { useEffect, useState, Suspense } from 'react';
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter,Image} from "@nextui-org/react";
import MovieModal from '@/components/ui/MovieModal';
export default function Home({}) {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  // const [selectedGenres, setSelectedGenres] = useState(new Set(["text"]));
  const moviesPerPage = 30; // Number of movies per page
  const [totalPages, setTotalPages] = useState(1); // State to hold total pages
  const totalMovies = 10000; // Total number of movies
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const toggleLoad = () => {
  //   setIsLoaded(!isLoaded);
  // };
  // const [selectedMovie, setSelectedMovie] = useState(null);

  // const handleMovieClick = (movie) => {
  //   setSelectedMovie(movie);
  // };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    console.log(`${movie.title} clicked!`);
  };

  // useEffect(() => {
  //   async function loadMovies() {
  //     const page1Movies = await fetchMovies(currentPage); // Fetch the first page of movies
  //     const page2Movies = await fetchMovies(currentPage+1); // Fetch the second page of movies

  //     // Combine results from both pages and select the first 30 for the first page
  //     const combinedMovies = [...page1Movies, ...page2Movies];
  //     const firstPageMovies = combinedMovies.slice(0, moviesPerPage); // Display 30 movies on the first page

  //     setMovies(firstPageMovies);

  //     // Calculate total pages based on the total number of movies
  //     const calculatedTotalPages = Math.ceil(totalMovies / moviesPerPage);
  //     setTotalPages(calculatedTotalPages);
  //     console.log("totalPages",totalPages);
  //   }
  //   loadMovies();
  // }, []);

  useEffect(() => {
    async function loadMovies() {
      const page1Movies = await fetchMovies(currentPage); // Fetch the current page of movies
      const page2Movies = await fetchMovies(currentPage + 1); // Fetch the next page of movies
  
      const combinedMovies = [...page1Movies, ...page2Movies];
      setMovies(combinedMovies.slice(0, moviesPerPage)); // Display movies for the first page
  
      const calculatedTotalPages = Math.ceil(totalMovies / moviesPerPage);
      setTotalPages(calculatedTotalPages);
      console.log("totalPages", totalPages);
    }
    loadMovies();
  }, [currentPage, moviesPerPage, totalMovies]); // Ensure useEffect runs when these values change
  


  const handlePageChange = async (page) => {
    setCurrentPage(page);
  
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
  
    const selectedPageMovies = await fetchMovies(page);
    setMovies(selectedPageMovies.slice(startIndex, endIndex));
  // Scroll to the top of the page after pagination click
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  return (
   
    
    <div>
    <Navbar/>
    
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-[#141414] py-8">
        <div className="container px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-200 mb-6">Most Popular</h1>
          <h2 className="text-sm font-bold text-slate-500 mb-6">You are viewing page {currentPage} out of {totalPages} </h2>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 ">    
  {movies.map((movie, index) => (
    <Card
    className=" border-none bg-black"
          // className="border-none bg-gradient-to-b from-red-800 to-black"
          // className=" border-none bg-gradient-to-t  from-black  to-red-700"
          key={index}
          isPressable onPress={() => handleMovieClick(movie)}>
        
      
      
      {/* <div className="relative pb-[150%]"> */}
      <div className="relative">
      <CardBody className="overflow-visible">
            <Image
            isZoomed
              shadow="sm"
              radius="lg"
              width="100%"
              // width="500"
              // height="100"
              alt={movie.title}
              // className="w-full object-cover"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          </CardBody>
        {/* <img
          alt={movie.title} // Use movie title as alt text
          className="absolute inset-0 w-full h-full object-fill rounded-t-md"
          sizes="100vw"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Use movie poster path
          style={{
            // aspectRatio: "200/300",
            // objectFit: "cover",
          }}
           // Handle movie click
        /> */}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold  text-slate-50">{movie.title}</h2> {/* Display movie title */}
        
        <Badge className="mt-2 bg-slate-900 text-slate-200">{movie.release_date}</Badge> {/* Display release date */}
      </div>
      
    </Card>
    
  ))}
    <MovieModal
        movie={selectedMovie}
        onClose={handleCloseModal}
      />
</div>

<div className="flex justify-center">
<Pagination color="danger"
            total={totalPages}
            current={currentPage}
            onChange={handlePageChange}
            showShadow
            // showControls
            // Add other pagination items as needed
            classNames={{
              wrapper: "mt-8 gap-0 overflow-visible rounded border border-divider hover:bg-transparent",
              item: "mt-8 text-small bg-transparent text-white ",
              cursor:
                "mt-8 bg-red-600  text-white font-bold ",
            }}
          />
          </div>
        </div>
      </main>
      <Footer/>
      {/* <footer className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
        <div className="flex items-center space-x-2">
          <Popcorn className="h-6 w-6" />
          <span className="text-lg font-semibold">Popcorn Time</span>
        </div>
        <nav className="space-x-4 hidden lg:block">
          <Link className="text-sm font-medium" href="#">
            Terms and Conditions
          </Link>
          <Link className="text-sm font-medium" href="#">
            Privacy Policy
          </Link>
        </nav>
        <Button className="hidden lg:block" variant="outline">
          Sign In
        </Button>
      </footer> */}
    </div>
    </div>
  )
}

