import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}