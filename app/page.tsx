"use client";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSelector } from "react-redux";

const LightningIcon = () => {
  return (
    <svg
      width="20px"
      fill="#757575"
      version="1.1"
      id="Capa_1"
      viewBox="0 0 560.317 560.316"
      stroke="#757575"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M207.523,560.316c0,0,194.42-421.925,194.444-421.986l10.79-23.997c-41.824,12.02-135.271,34.902-135.57,35.833 C286.96,122.816,329.017,0,330.829,0c-39.976,0-79.952,0-119.927,0l-12.167,57.938l-51.176,209.995l135.191-36.806 L207.523,560.316z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default function Home() {
  const { user } = useSelector((state: any) => state);
  return (
    <>
      <NavBar />
      <section className="top-16 relative container w-full h-screen mx-auto">
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="relative h-full w-full bg-white">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          </div>
        </div>
        <div className="absolute inset-0 mx-auto sm:mx-16 px-6 flex flex-row items-start gap-12">
          <div className="">
            <h6 className="font-mono flex text-[#757575] lg:mt-12 mt-4">
              <LightningIcon /> Save Time
            </h6>
            <h1 className="font-mono font-black text-primary max-w-4xl lg:text-[50px] sm:text-[40px] xs:text-[30px] text-[25px] lg:leading-[85px]">
              Transform Your Videos with{" "}
              <span className="bg-gradient-to-r from-[#9085ff] via-[#b169ff] to-[#8345ff] text-transparent bg-clip-text">
                Perfect Subtitles in Seconds!
              </span>
            </h1>
            <p className="font-mono max-w-2xl mt-5 xs:tracking-tighter tracking-wider lg:text-xl md:text-lg sm:text-sm text-xs">
              Automatically generate precise and synchronized subtitles for any
              video. Enhance accessibility, boost engagement, and reach a global
              audience effortlessly with our cutting-edge AI-powered subtitle
              generator.
            </p>
            {user && (
              <>
                <Button
                  className="p-[3px] relative lg:mt-16 md:mt-12 mt-10"
                  variant="default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2 bg-black rounded-[6px]  relative group transition duration-200 text-white text-lg hover:bg-transparent">
                    <Link href="/dashboard">Dashboard</Link>
                  </div>
                </Button>
              </>
            )}
            {!user && (
              <>
                <Button className="p-[3px] relative lg:mt-16 md:mt-12 mt-10" variant="default" onClick={() => signIn()}>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2 bg-black rounded-[6px]  relative group transition duration-200 text-white text-lg hover:bg-transparent">
                    Get Started...
                  </div>
                </Button>
              </>
            )}
            <p className="font-mono max-w-2xl tracking-tighter mt-2">
              The best application to sparkle up your videos.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
