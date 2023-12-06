'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Navbar from '@/components/ui/Navbar'
import { Popcorn } from 'lucide-react';
import Footer from '@/components/ui/Footer'
import { fetchMovies } from './action'
import { useEffect, useState } from 'react';
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/react";

export default function Home({}) {
  const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   async function loadMovies() {
  //     const movieData = await fetchMovies();
  //     setMovies(movieData.results); // Assuming the API response has a 'results' property
  //   }
  //   loadMovies();
  // }, []);

  // useEffect(() => {
  //   async function loadMovies() {
  //     const page1Movies = await fetchMovies(1);
  //     const page2Movies = await fetchMovies(2);
  //     const allMovies = [...page1Movies, ...page2Movies]; // Combine results from both pages
  //     setMovies(allMovies);
  //   }
  //   loadMovies();
  // }, []);


  useEffect(() => {
    async function loadMovies() {
      const page1Movies = await fetchMovies(1); // Fetch the first page of movies
      const page2Movies = await fetchMovies(2); // Fetch the second page of movies

      // Combine results from both pages and select the first 30 for the first page
      const combinedMovies = [...page1Movies, ...page2Movies];
      const firstPageMovies = combinedMovies.slice(0, 30); // Display 30 movies on the first page
      setMovies(firstPageMovies);
    }
    loadMovies();
  }, []);


  return (
    <div>
    <Navbar/>
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-100 py-8">
        <div className="container px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Most Popular</h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
         
  {movies.map((movie, index) => (
    <Card key={index}>
      <div className="relative pb-[150%]">
        <img
          alt={movie.title} // Use movie title as alt text
          className="absolute inset-0 w-full h-full object-fill rounded-t-md"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Use movie poster path
          style={{
            // aspectRatio: "200/300",
            // objectFit: "cover",
          }}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{movie.title}</h2> {/* Display movie title */}
        <Badge className="mt-2 bg-blue-500 text-white">{movie.release_date}</Badge> {/* Display release date */}
      </div>
      
    </Card>
    
  ))}
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

