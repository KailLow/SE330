import Sibebar from '@/components/SibeBar'
import React from 'react'


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return(
        <div className=" w-screen h-screen flex">
            <Sibebar/>
            <div className=" w-full bg-background-normal">
                {children}
            </div>
        </div>
    )
}