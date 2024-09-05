'use client'
import { SideBar } from '@/components/shared/SideBar';
import UploadButton from '@/components/shared/UploadButton';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { filename: string } }) {
    const file=params.filename;
    // const router = useRouter();
    // const { user } = useSelector((state: any) => state);
    // if(!user) {
    //   router.replace("/");
    // }
    // TO-DO: run request once
    return (
        <>
            {/* <NavBar /> */}
            <section className="bg-main bg-cover bg-no-repeat h-screen">
                <div className='w-full flex flex-col justify-end'>
                    <SideBar iconSize='1.5rem' />
                </div>
                <div className="container flex flex-col justify-around items-center">
                    <h1 className="font-mono font-black max-w-4xl lg:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[85px] bg-gradient-to-r from-[#5269fe] via-[#9990da] to-[#9990da] text-transparent bg-clip-text">
                        Subtitles Generated for {file}
                    </h1>
                </div>
                <div className='text-center mt-12 sm:mt-24 mb-4 sm:mb-8'>
                    
                </div>
            </section>
            {/* <Footer /> */}
        </>
    )
}
