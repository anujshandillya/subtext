import { SideBar } from '@/components/shared/SideBar';
import UploadButton from '@/components/shared/UploadButton';

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
