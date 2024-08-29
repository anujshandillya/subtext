import { CardWithForm } from "@/components/shared/Card";

export default function page() {
  return (
    <section className="container h-screen">
      <div className="container flex flex-col justify-around items-center p-16">
        <h1 className="font-mono font-black max-w-4xl lg:text-[50px] sm:text-[40px] xs:text-[30px] text-[25px] lg:leading-[85px] bg-gradient-to-r from-[#294f4a] via-[#3f8e83] to-[#21c2af] text-transparent bg-clip-text">
          Check out our pricing
        </h1>
      </div>
      <div className="container flex flex-row justify-around items-center">
        <CardWithForm
          tier="Free Tier"
          price="Free for 1 year"
          features="Get started with our powerful subtitle generator at no cost! Perfect for casual users, the Free Tier allows you to generate subtitles for short videos with basic customization options. Experience the convenience of automated subtitles and see how easy it is to enhance your video content."
          paid="no"
          buttonTextDefault="Get Started"
          buttonTextPaid=""
          textStyleClassName="bg-gradient-to-r from-[#2200ff] via-[#4454ff] to-[#5269fe] text-transparent bg-clip-text"
        />
        <CardWithForm
          tier="Content Creator"
          price="24.99$/month"
          features="Take your video content to the next level with our Content Creator Tier! Ideal for vloggers, YouTubers, and professional content creators, this tier provides unlimited video length support, high-quality subtitle accuracy, advanced editing tools, and access to a library of fonts and styles. Elevate your videos and reach a global audience with ease."
          paid="yes"
          buttonTextDefault="Try for 7 days"
          buttonTextPaid="Subscribe"
          textStyleClassName="bg-gradient-to-r from-[#9085ff] via-[#b169ff] to-[#8345ff] text-transparent bg-clip-text"
        />
        <CardWithForm
          tier="Student Tier(Coming Soon)"
          price="9.99$/month"
          features="Specially designed for students and educational purposes, this upcoming tier offers advanced features at an affordable price. Enjoy extended video lengths, more customization options, and the ability to download subtitles in various formats. Stay tuned for a perfect tool to make your educational videos more accessible and engaging!"
          paid="yes"
          buttonTextDefault="Trial not available"
          buttonTextPaid="Coming Soon"
          textStyleClassName="bg-gradient-to-r from-[#294f4a] via-[#3f8e83] to-[#21c2af] text-transparent bg-clip-text"
        />
      </div>
    </section>
  );
}
