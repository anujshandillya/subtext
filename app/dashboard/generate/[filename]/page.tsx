'use client'
import { clearTranscriptionItems } from '@/aws';
import ResultVideo from '@/components/shared/Result';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Page({ params }: { params: { filename: string } }) {
    const router = useRouter();
    const { user } = useSelector((state: any) => state);
    if (!user) {
        router.replace("/");
    }
    const file = params.filename;
    const [transcribing, SetTranscribing] = useState(false);
    const [Fetching, SetFetching] = useState(false);
    const [awsTranscribe, SetAwsTranscribe] = useState([] as any[]);
    const getTranscription = () => {
        SetTranscribing(true)
        axios.get('/api/gen/video/gettranscription?filename=' + file).then((res) => {
            SetFetching(true);
            console.log(res.data);
            const tStatus = res.data?.status;
            const transcription = res.data?.transcription;
            console.log(transcription);
            if (tStatus === 'IN_PROGRESS') {
                SetTranscribing(false);
                setTimeout(getTranscription, 10000);
            } else {
                SetTranscribing(false);
                if (transcription !== null) {
                    SetAwsTranscribe(
                        clearTranscriptionItems(transcription.results.items) as any[]
                    );
                }
            }
        });
    }
    // TO-DO: run request once
    useEffect(() => {
        getTranscription();
    }, [file])
    return (
        <>
            <section className="bg-main bg-cover bg-no-repeat h-screen">
                <div className="container flex flex-col justify-between items-center">
                    {transcribing ? (
                        <>
                            <h1 className="pt-16 font-mono font-black max-w-4xl bg-gradient-to-r from-[#5269fe] via-[#9990da] to-[#9990da] text-transparent bg-clip-text">
                                Generating Subtitles for {file}
                            </h1>
                        </>
                    ) : (
                        <>
                            <ResultVideo filename={file} transcriptionItems={awsTranscribe} />
                        </>
                    )}
                </div>
            </section>
        </>
    )
}