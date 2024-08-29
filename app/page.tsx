import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <>
      <NavBar />
      <section className="relative container w-full h-screen mx-auto">
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
            <Button
              className="rounded-lg lg:mt-16 md:mt-12 mt-10"
              variant="default"
            >
              <p className="max-w-3xl">
                <Link href="/signup">Get Started...</Link>
              </p>
            </Button>
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
