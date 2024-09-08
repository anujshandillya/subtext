// import SparklesIcon from "@/components/SparklesIcon";
import {transcriptionItemsToSrt} from "@/aws";
import {FFmpeg} from "@ffmpeg/ffmpeg";
import {toBlobURL, fetchFile} from "@ffmpeg/util";
import {useEffect, useState, useRef} from "react";
import { Button } from "../ui/button";

export default function ResultVideo({filename, transcriptionItems}: {filename: string, transcriptionItems: any[]}) {
  const videoUrl = `https://aws-subtext.s3.amazonaws.com/${filename}`;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [progress, setProgress] = useState(1);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<any>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
    load();
  }, []);

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile('./../../fonts/Roboto-Regular.ttf'));
    await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile('./../../fonts/Roboto-Bold.ttf'));
    setLoaded(true);
  }

  function toFFmpegColor(rgb: any) {
    const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
    return '&H' + bgr + '&';
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = transcriptionItemsToSrt(transcriptionItems);
    await  ffmpeg.writeFile(filename, await fetchFile(videoUrl));
    await ffmpeg.writeFile('subs.srt', srt);
    videoRef.current.src = videoUrl;
    await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const duration = videoRef.current.duration;
    ffmpeg.on('log', ({ message }) => {
      const regexResult = /time=([0-9:.]+)/.exec(message);
      if (regexResult && regexResult?.[1]) {
        const howMuchIsDone = regexResult?.[1];
        const [hours,minutes,seconds] = howMuchIsDone.split(':').map(Number);
        const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        const videoProgress = doneTotalSeconds / duration;
        setProgress(videoProgress);
      }
    });
    await ffmpeg.exec([
      '-i', filename,
      '-preset', 'ultrafast',
      '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=70,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
      'output.mp4'
    ]);
    const data = await ffmpeg.readFile('output.mp4');
    videoRef.current.src =
      URL.createObjectURL(new Blob([Buffer.from(data)], {type: 'video/mp4'}));
    setProgress(1);
  }

  return (
    <>
    <div className="flex">
      <div className="mb-4">
        <Button
          onClick={transcode}
          className="bg-gradient-to-r from-[#5269fe] via-[#9990da] to-[#9990da] py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/20 cursor-pointer">
          {/* <SparklesIcon /> */}
          <span>Apply captions</span>
        </Button>
      </div>
      <div>
        primary color:
        <input type="color"
               value={primaryColor}
               onChange={ev => setPrimaryColor(ev.target.value)}/>
        <br />
        outline color:
        <input type="color"
               value={outlineColor}
               onChange={ev => setOutlineColor(ev.target.value)}/>
      </div>
      {/* video */}
      <div className="rounded-xl overflow-hidden relative flex flex-col justify-around w-full items-center text-center">
        {progress && progress < 1 && (
            <div className="absolute inset-0 bg-black/80 flex items-center">
            <div className="w-full text-center">
              <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                <div className="bg-bg-gradient-from h-8"
                     style={{width: `${progress * 100}%`}}>
                  <h3 className="text-white text-xl absolute inset-0 py-1">
                    {Math.round(progress * 100)}%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
        <video className="rounded-xl shadow-xl shadow-black"
        width="80%"
          data-video={0}
          ref={videoRef}
          controls>
        </video>
      </div>
              </div>
    </>
  );
}