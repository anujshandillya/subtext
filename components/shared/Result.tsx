import { transcriptionItemsToSrt } from "@/aws";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useEffect, useState, useRef, Suspense } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import Loader from "./Loader";

const fontsz = [
  { value: "18", label: "18" },
  { value: "20", label: "20" },
  { value: "24", label: "24" },
  { value: "28", label: "28" },
  { value: "30", label: "30" },
  { value: "32", label: "32" },
  { value: "36", label: "36" },
];

export default function ResultVideo({
  filename,
  transcriptionItems,
}: {
  filename: string;
  transcriptionItems: any[];
}) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state);
  if (!user) {
    router.replace("/");
  }
  const videoUrl = `https://aws-subtext.s3.amazonaws.com/${filename}`;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#FFFFFF");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(30);
  const [fontFamily, setFontFamily] = useState("Roboto Bold");
  const [MarginV, setMarginV] = useState(70);
  const [progress, setProgress] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<any>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
    load();
  }, []);

  const handleUpload = async () => {
    const res = await axios.postForm("/api/gen/video/uploadOutput", {
      file: videoFile,
      userEmail: user.email ?? ("" as string),
    });
  };

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    await ffmpeg.writeFile(
      "/tmp/roboto.ttf",
      await fetchFile("./../../fonts/Roboto-Regular.ttf")
    );
    await ffmpeg.writeFile(
      "/tmp/roboto-bold.ttf",
      await fetchFile("./../../fonts/Roboto-Bold.ttf")
    );
    setLoaded(true);
  };

  function toFFmpegColor(rgb: any) {
    const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
    return "&H" + bgr + "&";
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = transcriptionItemsToSrt(transcriptionItems);
    await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
    await ffmpeg.writeFile("subs.srt", srt);
    videoRef.current.src = videoUrl;
    await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const duration = videoRef.current.duration;
    ffmpeg.on("log", ({ message }) => {
      const regexResult = /time=([0-9:.]+)/.exec(message);
      if (regexResult && regexResult?.[1]) {
        const howMuchIsDone = regexResult?.[1];
        const [hours, minutes, seconds] = howMuchIsDone.split(":").map(Number);
        const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        const videoProgress = doneTotalSeconds / duration;
        setProgress(videoProgress);
      }
    });
    await ffmpeg.exec([
      "-i",
      filename,
      "-preset",
      "ultrafast",
      "-vf",
      `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=${fontFamily},FontSize=${fontSize},MarginV=${MarginV},PrimaryColour=${toFFmpegColor(
        primaryColor
      )},OutlineColour=${toFFmpegColor(outlineColor)}'`,
      "output.mp4",
    ]);
    const data = await ffmpeg.readFile("output.mp4");
    const videoBlob = new Blob([Buffer.from(data)], { type: "video/mp4" });
    const objURL = URL.createObjectURL(videoBlob);
    const videoFile = new File([videoBlob], `${filename}-output.mp4`, {
      type: "video/mp4",
    });
    setVideoFile(videoFile);
    videoRef.current.src = objURL;
    setProgress(1);
  };

  return (
    <>
    {progress && progress < 1 && (
    <div className="fixed inset-0 bg-opacity-50 flex flex-col h-screen items-center text-center justify-center z-50">
          <div className="p-6">
            <Loader />
          </div>
         </div> 
        )}
      <div className={`flex ${progress && progress < 1 && "blur-lg"}`}>
        <div className="container flex flex-row justify-around h-screen items-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Customize your captions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Font Size</Label>
                  <Input
                    name="fontSize"
                    placeholder="Font Size"
                    onChange={(ev) => setFontSize(Number(ev.target.value))}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Margin Vertical</Label>
                  <Input
                    name="MarginV"
                    placeholder="Margin Vertical"
                    onChange={(ev) => setMarginV(Number(ev.target.value))}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Fill Color</Label>
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(ev) => setPrimaryColor(ev.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Outline</Label>
                  <Input
                    type="color"
                    value={outlineColor}
                    onChange={(ev) => setOutlineColor(ev.target.value)}
                  />
                </div>
                <div className="flex mx-auto gap-2">
                  <Button
                    onClick={transcode}
                    className="bg-gradient-to-r from-[#5269fe] via-[#9990da] to-[#9990da] py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/20 cursor-pointer"
                  >
                    <span>Apply captions</span>
                  </Button>
                  {videoFile ? (
                    <>
                      <Button
                        onClick={handleUpload}
                        className="py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/20 cursor-pointer"
                      >
                        <span>Save this Video</span>
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className={`rounded-xl overflow-hidden relative ${progress && progress < 1 && "blur-lg"} flex flex-col justify-around w-full items-center text-center`}>
          {progress && progress < 1 && (
          <div className="absolute inset-0 flex items-center">
              <div className="w-full text-center">
                <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                  <div
                    className="bg-bg-gradient-from h-8"
                    style={{ width: `${progress * 100}%` }}
                  >
                    <h3 className="text-white text-xl absolute inset-0 py-1">
                      {Math.round(progress * 100)}%
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          <video
            className="rounded-xl shadow-xl shadow-black"
            width="80%"
            data-video={0}
            ref={videoRef}
            controls
          ></video>
        </div>
      </div>
    </>
  );
}
