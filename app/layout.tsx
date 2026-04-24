import type {Metadata} from 'next';
import { Abril_Fatface, Playfair_Display, Space_Mono, Inter } from 'next/font/google';
import './globals.css';

const abril = Abril_Fatface({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-abril',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const space = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Merona Media | Specialists for every design',
  description: 'Design itself. Cinematic Videography, Immersive Web Design, Editorial Book Design.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${abril.variable} ${playfair.variable} ${space.variable} ${inter.variable} font-sans antialiased bg-[#0A1628] text-[#F0D58C] overflow-x-hidden`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
