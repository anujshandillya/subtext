import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ViewVideo({
  filename}: {
  filename: string;
}) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state);
  if (!user) {
    router.replace("/");
  }
  const videoUrl = `https://aws-subtext.s3.amazonaws.com/${filename}`;
  const srcVideoName = filename.split("-output")[0];
  console.log(srcVideoName);

  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
  }, []);

  const handleDownload = () => {
    window.location.href = videoUrl;
  }

  return (
    <>
      <div className={`flex`}>
        <div
          className={`rounded-xl overflow-hidden relative flex flex-col justify-around items-center text-center`}
        >
          <video
            className="rounded-xl shadow-xl"
            width="80%"
            data-video={0}
            ref={videoRef}
            controls
          ></video>
          <div className="flex my-2 mx-auto gap-6">
            <Button className="py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/20 cursor-pointer">
              <Link href={`/dashboard/generate/${srcVideoName}`}>Edit</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
