"use client";
import { clearTranscriptionItems } from "@/aws";
import ResultVideo from "@/components/shared/Result";
import ViewVideo from "@/components/shared/ViewVideo";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page({ params }: { params: { filename: string } }) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state);
  if (!user) {
    router.replace("/");
  }
  const file = params.filename;
  const srcVideoName = file.split("-output")[0];
  const [awsTranscribe, SetAwsTranscribe] = useState([] as any[]);
  // const getTranscription = () => {
  //     SetTranscribing(true)
  //     axios.get('/api/gen/video/gettranscription?filename=' + file).then((res) => {
  //         SetFetching(true);
  //         console.log(res.data);
  //         const tStatus = res.data?.status;
  //         const transcription = res.data?.transcription;
  //         console.log(transcription);
  //         if (tStatus === 'IN_PROGRESS') {
  //             SetTranscribing(false);
  //             setTimeout(getTranscription, 10000);
  //         } else {
  //             SetTranscribing(false);
  //             if (transcription !== null) {
  //                 SetAwsTranscribe(
  //                     clearTranscriptionItems(transcription.results.items) as any[]
  //                 );
  //             }
  //         }
  //     });
  // }
  // // TO-DO: run request once
  // useEffect(() => {
  //     getTranscription();
  // }, [file])
  return (
    <>
      <section className="bg-main bg-cover bg-no-repeat h-screen">
        <div className="container flex flex-col justify-left pt-16" />
        <div className="container flex flex-col justify-left pt-16" />
        <div className="container flex flex-col justifiy-between items-center">
          <ViewVideo filename={file} />
        </div>
      </section>
    </>
  );
}
