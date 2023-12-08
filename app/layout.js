import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import {Providers} from "./providers";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight:['400'] })
export const metadata = {
  title: 'Popcorn Time',
  description: 'Discover the latest movies now playing in theaters! Enjoy details like titles, release dates, and cover images. Filter by genres and ratings, and sort by title, release date, popularity, or ratings. Responsive design for an optimal viewing experience on any device!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
        <body className={poppins.className}>
      <Providers>
        {children}
        <Analytics />
      </Providers>
      </body>
      {/* <body className={concert_One.className}>{children}</body> */}
    </html>
  )
}
