/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { setCookie } from "cookies-next";
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { publicFetcher } from "@/hooks/usePublicRoute";
import TokenContext from "../../contexts/TokenContext";
import API from '@/constants/apiEndPoint';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';

export default function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const { setToken } = useContext(TokenContext);
    const [status, setStatus] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        const res = await publicFetcher(API.authentication.signIn, "POST", {
            email,
            password,
        });

        if (res.status == 200) {
            const token = await res.json();
            setToken({
                accessToken: token.access_token,
                refreshToken: token.refresh_token,
            });
            localStorage.setItem("token", token.access_token);
            localStorage.setItem("refresh", token.refresh_token);
            setCookie("accessToken", token.access_token);
            setStatus(true);
            setErr('Login Successful');
            router.push("/admin");
        } else {
            setEmail('');
            setPassword('');
            setErr('Email or password is invalid');
            setStatus(true);
        }

    }
    
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
                            <SignInForm 
                                onUsernameChange={setEmail}
                                onPasswordChange={setPassword}
                                OnSignIn={handleLogin}
                            />
                        ) : (
                            <SignUpForm />
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
