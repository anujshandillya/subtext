import { Separator } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Scroll } from './Scroll'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Generations() {
    return (
        <>
            {/* generations */}
            <div className='w-full'>
                <Scroll />
                <div className="w-full flex justify-end">
                    <Button className="hover:bg-purple-400 text-white hover:text-black py-2 px-4 rounded m-2">
                        <Link href="/dashboard/generate">New generation</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
