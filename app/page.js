'use client'
// import Image from 'next/image'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { animate, motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar'
import { Popcorn } from 'lucide-react';
import Footer from '@/components/ui/Footer'
import {useScrollTo, scrollTo} from 'framer-motion-scroll-to-hook'
import NextImage from "next/image";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Skeleton} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { fetchMovies } from './action'
import React, { useEffect, useState, Suspense } from 'react';
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter,Image} from "@nextui-org/react";
import MovieModal from '@/components/ui/MovieModal';
export default function Home({}) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  // Number of movies per page
   // const moviesPerPage = 20; 
  const moviesPerPage = 30;
  const [totalPages, setTotalPages] = useState(1); // State to hold total pages
  // const totalMovies = 10000; // Total number of movies
  const defaultTotalMovies = 10000; 
  const [totalMovies, setTotalMovies] = useState(defaultTotalMovies);
  // const [totalMovies, setTotalMovies] = useState(10000);// Total number of movies
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["popularity.desc"]));
  const [selectedSortKey, setSelectedSortKey] = React.useState("popularity.desc"); // Separate state for the selected sort key
  const [selectedGenres, setSelectedGenres] = React.useState(new Set(["text"]));

  //mapping of sort lists
  const keyToText = {
    'popularity.desc': 'Most Popular',
    'popularity.asc': 'Least Popular',
    'release_date.desc': 'Latest Releases',
    'release_date.asc': 'Oldest Releases',
    'vote_average.asc' : 'Poorly Rated',
    'vote_average.desc': 'Highly Rated',
     'original_title.asc':'A - Z',
     'original_title.desc':'Z - A',
    
    // Add other keys and their corresponding text
  };
  const scrollTo = useScrollTo({mass: 0.5, stiffness: 40, type: "spring"})
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).map(key => keyToText[key]).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );


  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    // console.log(`${movie.title} clicked!`);
  };

 


// 1. use this to fetch 30 movies but will have duplicate
useEffect(() => {
  async function loadMovies() {
    const page1Movies = await fetchMovies(currentPage, selectedSortKey, Array.from(selectedGenres) ); // Fetch movies with the selected sort key
    const page2Movies = await fetchMovies(currentPage + 1, selectedSortKey, Array.from(selectedGenres));
    const combinedMovies = [...page1Movies, ...page2Movies];
    setMovies(combinedMovies.slice(0, moviesPerPage)); // Display movies for the first page

    if (Array.from(selectedGenres).length > 3) {
      // Use dynamically updated count only when filters are applied
      setTotalMovies(combinedMovies.length);
      console.log(totalMovies);
    } else {
      // Use default count if no filters are applied
      setTotalMovies(defaultTotalMovies);
    }

    const calculatedTotalPages = Math.ceil(totalMovies / moviesPerPage);
    setTotalPages(calculatedTotalPages);
          console.log("totalPages", totalPages);
      console.log("currentPages",currentPage);
      console.log("selectedKey",selectedKeys);
  }
  loadMovies();
}, [currentPage, moviesPerPage, totalMovies, selectedSortKey, selectedGenres]);




// 2. try a iterative eapproach
// useEffect(() => {
//   async function loadMovies() {
//     if (Array.from(selectedGenres).length > 3) {
//       const allMovies = await fetchAllMovies(selectedSortKey);
//       setMovies(allMovies.slice(0, moviesPerPage)); // Display movies for the first page

//       setTotalMovies(allMovies.length);

//       const calculatedTotalPages = Math.ceil(allMovies.length / moviesPerPage);
//       setTotalPages(calculatedTotalPages);
//     } else {
//       const page1Movies = await fetchMovies(currentPage, selectedSortKey, Array.from(selectedGenres));
//       const page2Movies = await fetchMovies(currentPage + 1, selectedSortKey, Array.from(selectedGenres));
//       const combinedMovies = [...page1Movies, ...page2Movies];
//       setMovies(combinedMovies.slice(0, moviesPerPage)); // Display movies for the first page

//       setTotalMovies(defaultTotalMovies);

//       const calculatedTotalPages = Math.ceil(defaultTotalMovies / moviesPerPage);
//       setTotalPages(calculatedTotalPages);
//     }
//   }
//   loadMovies();
// }, [currentPage, moviesPerPage, selectedGenres, selectedSortKey]);

// const fetchAllMovies = async (selectedSortKey) => {
//   let allMovies = [];
//   let totalPagesFetched = 0;

//   for (let page = 1; page <= 500; page++) {
//     const movies = await fetchMovies(page, selectedSortKey, Array.from(selectedGenres));
//     allMovies = [...allMovies, ...movies];
//     totalPagesFetched++;

//     if (movies.length < 20 || totalPagesFetched >= 334) {
//       break;
//     }
//   }

//   return allMovies;
// };


//3. working example to fetch and avoid duplicates , just that it need to load while it loop for a long time 
// useEffect(() => {
//   async function loadMovies() {
//     const allMovies = await fetchAllMovies(selectedSortKey); // Fetch all movies or get the total count
//     const totalPages = Math.ceil(allMovies.length / moviesPerPage);
//     setTotalPages(totalPages);

//     const startIndex = (currentPage - 1) * moviesPerPage;
//     const endIndex = startIndex + moviesPerPage;

//     const displayedMovies = allMovies.slice(startIndex, endIndex);
//     setMovies(displayedMovies);

//     console.log("totalPages", totalPages);
//     console.log("currentPages", currentPage);
//     console.log("selectedKey", selectedKeys);
//   }

//   loadMovies();
// }, [currentPage, moviesPerPage, selectedSortKey]);
// part of 2. 
// async function fetchAllMovies(selectedSortKey) {
//   let allMovies = [];

//   // Fetch until reaching the maximum number of pages or total movies
//   for (let page = 1; page <= 100; page++) {
//     const movies = await fetchMovies(page, selectedSortKey);
//     allMovies = [...allMovies, ...movies];

//     if (movies.length < 20) {
//       break; // If fetched movies are less than 20, no more movies to fetch
//     }
//   }

//   return allMovies;
// }



// 4. use this to fetch 20 movies
// useEffect(() => {
//   async function loadMovies() {
//     const page1Movies = await fetchMovies(currentPage, selectedSortKey); // Fetch movies with the selected sort key
    
//     let page2Movies = [];
//     if (currentPage < totalPages) {
//       page2Movies = await fetchMovies(currentPage + 1, selectedSortKey);
//     }

//     let combinedMovies = [...page1Movies, ...page2Movies];

//     // Handle case when page2Movies is not iterable (e.g., last page)
//     if (!Array.isArray(page2Movies)) {
//       combinedMovies = [...page1Movies];
//     }

//     setMovies(combinedMovies.slice(0, moviesPerPage)); // Display movies for the current page

//     const calculatedTotalPages = Math.ceil(totalMovies / moviesPerPage);
//     setTotalPages(calculatedTotalPages);

//     console.log("totalPages", totalPages);
//     console.log("currentPages", currentPage);
//     console.log("selectedKey", selectedKeys);
//   }

//   loadMovies();
// }, [currentPage, moviesPerPage, totalMovies, selectedSortKey, totalPages]);


//for pagination
const handlePageChange = async (page) => {
  setCurrentPage(page);

  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  const selectedPageMovies = await fetchMovies(page, selectedSortKey, Array.from(selectedGenres));
  setMovies(selectedPageMovies.slice(startIndex, endIndex));

  // window.scrollTo({ top: 0, behavior: 'smooth' });
  scrollTo();
};

//for sorting
const handleSort = async (sortKey) => {
  setSelectedSortKey(sortKey); // Update the selected sort key
  setSelectedKeys(new Set([sortKey]));
  const sortedMovies = await fetchMovies(currentPage, sortKey,Array.from(selectedGenres));
  setMovies(sortedMovies);
};

// Similarly, update the function for handling genre changes
const handleGenresChangePage = async (selectedGenreIds) => {
  setSelectedGenres(new Set(selectedGenreIds));
  const movies = await fetchMovies(currentPage, selectedSortKey, Array.from(selectedGenreIds));
  setMovies(movies);

   // Update total movies count based on the new result count
  //  setTotalMovies(movies.length);
  if (selectedGenreIds.length > 3) {
    // Use dynamically updated count when filters are applied
    setTotalMovies(movies.length);
  } else {
    // Use default count if no filters are applied
    setTotalMovies(defaultTotalMovies);
  }

 console.log("Selected Genre:",selectedGenreIds);
   // Recalculate total pages based on the reduced movie count
   const calculatedTotalPages = Math.ceil(movies.length / moviesPerPage);
   setTotalPages(calculatedTotalPages);
};

// 5. iterative method
// const handleGenresChangePage = async (selectedGenreIds) => {
//   setSelectedGenres(new Set(selectedGenreIds));

//   if (selectedGenreIds.length > 3) {
//     const allMovies = await fetchAllMovies(currentPage,selectedSortKey, selectedGenreIds);
//     setMovies(allMovies.slice(0, moviesPerPage)); // Display movies for the first page

//     setTotalMovies(allMovies.length);

//     const calculatedTotalPages = Math.ceil(allMovies.length / moviesPerPage);
//     setTotalPages(calculatedTotalPages);
//   } else {
//     const movies = await fetchMovies(currentPage, selectedSortKey, Array.from(selectedGenreIds));
//     setMovies(movies);

//     setTotalMovies(defaultTotalMovies);

//     const calculatedTotalPages = Math.ceil(defaultTotalMovies / moviesPerPage);
//     setTotalPages(calculatedTotalPages);
//   }
// };



  return (
   
    
    <div>
    <Navbar handleGenresChange={handleGenresChangePage}/>
    
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-[#141414] py-8">
        <div className="container px-4 md:px-6 lg:px-8">
        <div className="flex justify-between">
  <h1 className="text-2xl font-bold text-slate-200 mb-6 ">{selectedValue}</h1>
  {/* <h1 className="text-2xl font-bold text-slate-200 mb-6 mr-5">Genres</h1> */}
  <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize bg-red-500 border-red-900 border-large ml-8 text-white text-xs"
        >
          Sort By: {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        // onSelectionChange={setSelectedKeys}
        onSelectionChange={(keys) => handleSort(keys.values().next().value)}
>
        {/* <DropdownItem key="text">Sort</DropdownItem> */}
        <DropdownItem key="popularity.desc">Most Popular</DropdownItem>
        <DropdownItem key="popularity.asc">Least Popular</DropdownItem>
        {/* <DropdownItem key="movie_title">Movie Title</DropdownItem> */}
        <DropdownItem key="release_date.desc">Latest Releases</DropdownItem>
        <DropdownItem key="release_date.asc">Oldest Releases</DropdownItem>

        <DropdownItem key="vote_average.desc">Highly Rated</DropdownItem>
        <DropdownItem key="vote_average.asc">Poorly Rated</DropdownItem>

        <DropdownItem key="original_title.asc">A - Z</DropdownItem>
        <DropdownItem key="original_title.desc">Z - A</DropdownItem>
        {/* <DropdownItem key="iteration">Iteration</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
</div>

          <h2 className="text-sm font-bold text-slate-500 mb-6">You are viewing page {currentPage} out of {totalPages} </h2>
          <div id='movie' className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 ">    
  {movies.map((movie, index) => (
    <Card
    className=" border-none bg-black"
          // className="border-none bg-gradient-to-b from-red-800 to-black"
          // className=" border-none bg-gradient-to-t  from-black  to-red-700"
          key={index}
          isPressable onPress={() => handleMovieClick(movie)}>
        
      
      
      {/* <div className="relative pb-[150%]"> */}
      <div className="relative">
      {/* <Image
            isZoomed
              shadow="sm"
              radius="lg"
              width="100%"
              // width="500"
              // height="500"
              alt={movie.title}
              // className="w-full object-cover"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              fallbackSrc={'https://via.placeholder.com/1000x1000'}
            /> */}

<Image
  isZoomed
  shadow="sm"
  radius="none"
  width="100%"
  alt={movie.title}
  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://placehold.co/360x540?text=No\n Poster'}
  // fallbackSrc={'https://via.placeholder.com/300x300'}
/>

      {/* <CardBody className="overflow-visible">
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
          </CardBody> */}
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
        
        {/* <Badge className="mt-2 bg-slate-900 text-slate-200">{movie.release_date}</Badge> Display release date */}
        {movie.release_date ? (
  <Badge className="mt-2 bg-slate-900 text-slate-200 px-6 sm:px-17 md:px-17 lg:px-17 xl:px-17 mx-0 sm:mx-12 md:mx-12 lg:mx-12 xl:mx-auto">{movie.release_date}</Badge>
) : (
  <Badge className="mt-2 bg-slate-900 text-slate-200 px-2">No Release Date</Badge>
)}
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

