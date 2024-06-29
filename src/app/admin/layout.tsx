import Sibebar from '@/components/SibeBar'
import { ModalProvider } from '@/contexts/ModalContext'
import React from 'react'


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return(
        <div className=" w-screen h-screen flex">
            <Sibebar/>
            <div className=" h-full w-full bg-primary justify-center items-center pt-8 px-5 pr-8 ">
                <ModalProvider >{children}</ModalProvider>
            </div>
        </div>
    )
}