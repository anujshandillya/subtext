import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function Scroll() {
  return (
    <ScrollArea className="w-full h-96 bg-white rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-lg md:text-md sm:text:sm font-medium leading-none">Generations</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}
