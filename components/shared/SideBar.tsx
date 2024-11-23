"use client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
  const BsLayoutTextSidebarReverse = (props: {size: string}) => {
    return <svg opacity="50%" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height={props.size} width={props.size} {...props}><path fillRule="evenodd" d="M2 1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm12-1a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12z" clipRule="evenodd" /><path fillRule="evenodd" d="M5 15V1H4v14h1zm8-11.5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5z" clipRule="evenodd" /></svg>;
  }
  
  export const SideBar = (props: {iconSize: string}) => {
    return (
      <>
        <Sheet>
          <SheetTrigger className='flex justify-end mt-6 mr-6'><BsLayoutTextSidebarReverse size={props.iconSize} /></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </>
    )
  }