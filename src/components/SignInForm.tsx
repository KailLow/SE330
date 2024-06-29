"use client"

import { Button } from 'flowbite-react'
import { useContext, useState } from "react";

export default function SignInForm({ onUsernameChange, onPasswordChange, OnSignIn }: any) {
    const handleUsernameChange = (event: any) => {
        onUsernameChange(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        onPasswordChange(event.target.value);
    };

    return (
        <>
            <form>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow-sm border-gray-300 rounded-md px-4 py-2 w-full"
                        placeholder="Enter your email"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow-sm border-gray-300 rounded-md px-4 py-2 w-full"
                        placeholder="Enter your password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <Button onClick={OnSignIn} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full">
                    Sign In
                </Button>
            </form>
        </>
    )
}
