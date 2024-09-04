import Footer from '@/components/shared/Footer';
import Generations from '@/components/shared/Generations';
import NavBar from '@/components/shared/NavBar';
import { SideBar } from '@/components/shared/SideBar';
// import { useRouter } from 'next/navigation';
import React from 'react'
// import { useSelector } from 'react-redux'

export default function page() {
  // const router = useRouter();
  // const { user } = useSelector((state: any) => state);
  // if(!user) {
  //   router.replace("/");
  // }
  return (
    <>
      {/* <NavBar /> */}
      <section className="bg-main bg-cover bg-no-repeat h-screen">
        <div className='w-full flex flex-col justify-end'>
          <SideBar iconSize='1.5rem' />
        </div>
        <div className="container flex flex-col justify-left">
          <h1 className="font-mono font-black max-w-4xl lg:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[85px] bg-gradient-to-r from-[#5269fe] via-[#9990da] to-[#9990da] text-transparent bg-clip-text">
            DashBoard
          </h1>
        </div>
        <div className='container flex flex-col justifiy-around items-center'>
          {/* generations */}
          <Generations />
        </div>
      </section>
      {/* <Footer /> */}
    </>
  )
}
