"use client";

import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { Button } from 'flowbite-react';
import { useState } from 'react';

export default function page() {
    const [isSignIn, setIsSignIn] = useState(true);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-primary">
            <div className=' mt-5'>
                <span className="self-center text-4xl dark:text-white font-semibold text-secondary">Computer Shop</span>
            </div>
            <div className=" w-1/2">
                <div className="flex justify-center items-center h-screen">
                    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                        <div className="flex justify-around mb-6">
                            <Button
                                className={`font-medium text-gray-700 hover:text-gray-900 ${isSignIn ? 'text-gray-900 bg-primary' : 'text-gray-500'
                                    }`}
                                onClick={() => setIsSignIn(true)}
                            >
                                Sign In
                            </Button>
                            <Button
                                className={`font-medium text-gray-700 hover:text-gray-900 ${!isSignIn ? 'text-gray-900 bg-primary' : 'text-gray-500'
                                    }`}
                                onClick={() => setIsSignIn(false)}
                            >
                                Sign Up
                            </Button>
                        </div>

                        {isSignIn ? (
                            <SignInForm />
                        ) : (
                            <SignUpForm />
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
