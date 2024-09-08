"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function BsUpload(props: {}) {
  return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" {...props}><path fillRule="evenodd" d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8zM5 4.854a.5.5 0 00.707 0L8 2.56l2.293 2.293A.5.5 0 1011 4.146L8.354 1.5a.5.5 0 00-.708 0L5 4.146a.5.5 0 000 .708z" clipRule="evenodd" /><path fillRule="evenodd" d="M8 2a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 2z" clipRule="evenodd" /></svg>;
}

export default function UploadButton() {
  const [uploading,SetUploading] = useState(false);
  const router = useRouter();
    const upload = async (e:any) => {
        e.preventDefault();
        SetUploading(true);
        const files=e.target.files;
        if(files.length>0) {
            const file=files[0];
            const res=await axios.postForm('/api/gen/video/upload',{
                file,
            });
            if(res.status===200) {
              SetUploading(false);
              router.replace(`/dashboard/generate/${res.data.fileName}`);
            }
        }
    }
    if(uploading) {
      return (
        <div className="w-full h-screen">
          <h1 className="text-[96px]">Uploading...</h1>
        </div>
      )
    }
  return (
    <>
    <label className="bg-gradient-to-r from-[#5269fe] via-[#9990da] to-[#9990da] py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/20 cursor-pointer">
    <BsUpload />
    <span>Upload Video</span>
    <input onChange={upload} type="file" className="hidden"/>
    </label>
    </>
  )
}