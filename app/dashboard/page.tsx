import Generations from '@/components/shared/Generations';

export default function page() {
  return (
    <>
      <section className="bg-main bg-cover bg-no-repeat h-screen">
        <div className="container flex flex-col justify-left pt-16">
          <h1 className="font-mono font-black max-w-4xl lg:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[85px] bg-gradient-to-r from-[#5269fe] via-[#9990da] to-[#9990da] text-transparent bg-clip-text">
            DashBoard
          </h1>
        </div>
        <div className='container flex flex-col justifiy-around items-center'>
          <Generations />
        </div>
      </section>
    </>
  )
}
