"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Category from "./Category";

export default function Navbar() {

    const [today, setToday] = useState("");

    useEffect(() => {
        setToday(
            new Intl.DateTimeFormat("bn-BD", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }).format(new Date())
        );
    }, []);


    return (
        <div className="border-b border-gray-200">
            <div className="container mx-auto">
                <nav className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-5">

                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700 text-white">
                            <Image
                                src="/assets/logo-icon.png"
                                alt="Bazar Dor Logo"
                                width={20}
                                height={20}
                            />
                        </div>

                        <div>
                            <h1 className="text-base font-bold leading-tight text-gray-900">
                                বাজার দর
                            </h1>

                            <p className="text-[10px] text-gray-500">
                                {today}
                            </p>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-6">
                        <button className="cursor-pointer text-sm font-medium text-gray-700 hover:text-green-700">
                            সাইন ইন
                        </button>

                        <Button
                            className=" cursor-pointer bg-green-700 px-5 text-sm font-medium text-white"
                            radius="md"
                        >
                            সাইন আপ
                        </Button>
                    </div>
                </nav>
                
            </div>
        </div >
    );
}