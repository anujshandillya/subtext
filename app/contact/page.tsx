import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";

export default function page() {
  return (
    <>
      <NavBar />
      <section className="container h-screen">
        <div className="container flex flex-col justify-around items-center p-16">
          <h1 className="font-mono font-black max-w-4xl lg:text-[50px] sm:text-[40px] xs:text-[30px] text-[25px] lg:leading-[85px] bg-gradient-to-r from-[#294f4a] via-[#3f8e83] to-[#21c2af] text-transparent bg-clip-text"></h1>
        </div>
        <div className="container flex flex-row justify-around items-center"></div>
      </section>
      <Footer />
    </>
  );
}
