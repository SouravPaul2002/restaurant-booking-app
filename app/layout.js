import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";

const outfit = Outfit({subsets: ["latin"]});

export const metadata = {
  title: "Restaurant Booking App | 24x7",
  description: "A web app for booking restaurant online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.subsets}`}
      >
        <div className="md:px-15">
          <Header/>
          {children}
        </div>
      </body>
    </html>
  );
}
