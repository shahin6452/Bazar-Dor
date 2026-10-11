"use client";

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
        <section className="container mx-auto px-3 py-4 sm:px-4 sm:py-7">
            <div className="flex min-h-[300px] flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 md:flex-row md:gap-8 md:px-8 lg:px-10">
                <div className="w-full min-w-0 md:max-w-2xl">
                    <span className="inline-flex max-w-full rounded-full bg-green-50 px-3 py-2 text-xs font-medium text-green-700 sm:px-5 sm:text-sm">
                        {today}
                    </span>

                    <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত তথ্য, গড়, সর্বনিম্ন এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="#products"
                        className="mt-5 inline-block sm:mt-6"
                    >
                        <button className="cursor-pointer rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 sm:px-6 sm:text-base">
                            সব পণ্য দেখুন
                        </button>
                    </Link>
                </div>

                <div className="flex w-full shrink-0 justify-center md:w-auto md:max-w-[40%]">
                    <Image
                        src="/assets/bazar-hero.png"
                        alt="বাজারের পণ্য"
                        width={360}
                        height={260}
                        priority
                        className="h-auto w-full max-w-[240px] object-contain sm:max-w-[300px] md:max-w-[320px] lg:max-w-[360px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;