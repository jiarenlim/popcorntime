import React from 'react'
import { Popcorn, Filter } from 'lucide-react';
import Link from 'next/link'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";
import { fetchGenres } from '@/app/action';
export default function Navbar1({ handleGenresChange }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [genres, setGenres] = React.useState([]);
  const [selectedGenres, setSelectedGenres] = React.useState(new Set([""]));

  React.useEffect(() => {
    async function loadGenres() {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    }
    loadGenres();
  }, []);


  const handleGenresChangeNavBar = (selectedGenreIds) => {
    setSelectedGenres(new Set(selectedGenreIds));
    handleGenresChange(selectedGenreIds); // Call the function from props
  };
  

  
  const menuItems = [
    "Most Popular",
    "Upcoming",
    "Genres",
    "Sign In",
    
  ];

  return (
  //   <header className="flex items-center justify-between px-4 py-2 bg-black text-slate-200">
  //   <div className="flex items-center space-x-2">
  //     <Popcorn className="h-6 w-6 text-red-500" />
  //     <span className="text-lg font-semibold text-red-500">Popcorn Time</span>
  //   </div>
  //   <nav className="space-x-4 hidden lg:block">
  //     {/* add a menu for mobile so that can display everything here */}
  //     <Link className="text-sm font-medium text-white" href="#">
  //       Most Popular
  //     </Link>
  //     <Link className="text-sm font-medium text-white" href="#">
  //       Upcoming
  //     </Link>
  //     <Link className="text-sm font-medium text-white" href="#">
  //       Genres
  //     </Link>
  //   </nav>
  //   <Button className="hidden lg:block text-white" variant="outline">
  //     Sign In
  //   </Button>
  // </header>
  <Navbar shouldHideOnScroll isBlurred className="bg-black text-white" onMenuOpenChange={setIsMenuOpen} >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
        <div className="flex items-center space-x-2">
       <Popcorn className="h-6 w-6 text-red-500" />
     <span className="text-lg font-semibold text-red-500">Popcorn Time</span>
   </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          {/* <Link className="text-white" color="foreground" href="#">
           Upcoming
          </Link> */}
        </NavbarItem>
        <NavbarItem isActive>
          <Link  className="text-white" href="#" aria-current="page">
          Most Popular
          </Link>
        </NavbarItem>
        <NavbarItem>
          {/* <Link className="text-white" color="foreground" href="#">
          Genres

          </Link> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          {/* <Button as={Link} color="primary" href="#" variant="outline"> */}
          {/* <Filter className='mr-1'/> */}
          <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize bg-red-500 border-red-900 border-large text-white text-xs"
        >
             <Filter size={20}/>Genres
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedGenres}
        // onSelectionChange={setSelectedGenres}
        onSelectionChange={handleGenresChangeNavBar}
      >
        {genres.map((genre) => (
      <DropdownItem key={genre.id}>{genre.name}</DropdownItem>
    ))}
      </DropdownMenu>
    </Dropdown>
          {/* </Button> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className='bg-black text-white'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
