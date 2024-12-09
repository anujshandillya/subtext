import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Subtext",
  description: "Generate precise and synchronized subtitles",
};

export default function RootLayout({ children, }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}