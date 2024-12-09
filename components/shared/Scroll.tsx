"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { setGenerations } from "@/state";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Scroll() {
  const dispatch = useDispatch();

  const {user, generations} = useSelector((state: any) => state);
  const getGens = async () => {
    const genData = await axios.post('/api/gen/getGen', {
      email: user?.email
    });
    dispatch(setGenerations({
      generations: genData.data
    }));
  }
  useEffect(() => {
    getGens();
  },[])
  return (
    <ScrollArea className="w-full h-96 bg-white rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-lg md:text-md sm:text:sm font-medium leading-none">Generations</h4>
        {generations && generations.length > 0 && generations.map((tag: string) => (
          <>
            <Link key={tag} href={`/dashboard/view/${tag}`} className="font-mono font-black max-w-4xl lg:text-[25px] sm:text-[20px] xs:text-[15px] text-[10px] lg:leading-[30px] bg-gradient-to-r from-[#2200ff] via-[#4454ff] to-[#5269fe] text-transparent bg-clip-text">
              {tag}
            </Link>
            <Separator className="my-2" />
          </>
        ))}
        {!generations && <div className="text-sm">No generations found</div>}
      </div>
    </ScrollArea>
  )
}
