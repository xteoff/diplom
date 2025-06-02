import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/header";
import localFont from 'next/font/local'
import Footer from "@/components/Footer/footer";
import { Providers } from './providers'
import { cookies } from 'next/headers'

const gothampro = localFont({
  src: [
    {
      path: './fonts/gothampro.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gothampro_light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/gothampro_bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: "--font-gothampro",
})

export const metadata: Metadata = {
  title: "Flower Knows",
  description: "Flower Knows",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies()

  return (
    <html lang="en">
      <body className={`${gothampro.variable} bg-[#fef2f2] font-gothampro`}> 
        <Header/>
          <Providers cookies={(await cookieStore).getAll()}>
            {children}
          </Providers>
        <Footer/>
      </body>
    </html>
  );
}
