'use client'
import { SideBar } from '@/components/shared/SideBar';
import UploadButton from '@/components/shared/UploadButton';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function page() {
    const router = useRouter();
    const { user } = useSelector((state: any) => state);
    if(!user) {
      router.replace("/");
    }
    return (
        <>
            {/* <NavBar /> */}
            <section className="bg-main bg-cover bg-no-repeat h-screen">
                <div className='w-full flex flex-col justify-end'>
                    <SideBar iconSize='1.5rem' />
                </div>
                <div className="container flex flex-col justify-around items-center">
                    <h1 className="font-mono font-black max-w-4xl lg:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[85px] bg-gradient-to-r from-[#5269fe] via-[#9990da] to-[#9990da] text-transparent bg-clip-text">
                        Generate
                    </h1>
                </div>
                <div className='text-center mt-12 sm:mt-24 mb-4 sm:mb-8'>
                    <h1 className="text-xl sm:text-3xl bg-gradient-to-r from-[#2200ff] via-[#4454ff] to-[#5269fe] text-transparent bg-clip-text">
                        Add epic captions to your videos
                    </h1>
                    <h2 className="text-black/75 text-lg sm:text-base">
                        Just upload your video and we will do the rest
                    </h2>
                </div>
                <div className='text-center'>
                    <UploadButton />
                </div>
            </section>
            {/* <Footer /> */}
        </>
    )
}
