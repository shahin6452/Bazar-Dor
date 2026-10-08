'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {

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
        <section className="container mx-auto px-4 py-7">
            <div className="flex min-h-[300px] items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white px-10 py-8">

                {/* Left Content */}
                <div className="max-w-2xl">

                    {/* Date Badge */}
                    <span className="inline-flex rounded-full bg-green-50 px-5 py-2 text-sm font-medium text-green-700">
                        {today}
                    </span>

                    {/* Heading */}
                    <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Description */}
                    <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত তথ্য, গড়, সর্বনিম্ন এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Button */}
                    <Link href="#products">
                        <button className="mt-6 cursor-pointer rounded-lg bg-green-700 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-green-800">
                            সব পণ্য দেখুন
                        </button>
                    </Link>
                </div>


                {/* Right Image */}
                <div className="hidden shrink-0 md:block">
                    <Image
                        src="/assets/bazar-hero.png"
                        alt="বাজারের পণ্য"
                        width={360}
                        height={260}
                        priority
                        className="object-contain"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;