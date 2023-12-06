import { Inter, Young_Serif,Concert_One  } from 'next/font/google'
import './globals.css'
import {Providers} from "./providers";

const inter = Inter({ subsets: ['latin'] })
const youngserif = Young_Serif({ subsets: ['latin'], weight:['400'] })
const concert_One = Concert_One({ subsets: ['latin'], weight:['400'] })
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
      </body>
      {/* <body className={concert_One.className}>{children}</body> */}
    </html>
  )
}
