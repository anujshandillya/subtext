"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { setGenerations } from "@/state";
import axios from "axios";
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
            <div key={tag} className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
        {!generations && <div className="text-sm">No generations found</div>}
      </div>
    </ScrollArea>
  )
}
