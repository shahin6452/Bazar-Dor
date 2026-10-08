"use client";

import React from "react";
import Link from "next/link";
import { Card, Input, Button } from "@heroui/react";

const SignUp = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-10">
            <div className="w-full max-w-[500px]">

                {/* Header */}
                <div className="mb-5 text-center sm:mb-6">
                    <h1 className="text-[25px] font-bold leading-tight text-gray-900 sm:text-2xl">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-1 text-[12px] leading-4 text-gray-500 sm:text-[11px]">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* Card */}
                <Card className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-5 p-[18px] sm:p-5">

                        {/* Name */}
                        <div>
                            <p className="mb-1.5 text-[14px] font-medium text-gray-700">
                                নাম
                            </p>

                            <Input
                                placeholder="যেমন: রহিম উদ্দিন"
                                variant="bordered"
                                radius="md"
                                size="sm"
                                className="w-full"
                            />
                        </div>

                        {/* Email */}
                        <div className="mt-3">
                            <p className="mb-1.5 text-[14px] font-medium text-gray-700">
                                ইমেইল
                            </p>

                            <Input
                                type="email"
                                placeholder="you@example.com"
                                variant="bordered"
                                radius="md"
                                size="sm"
                                className="w-full"
                            />
                        </div>

                        {/* Password */}
                        <div className="mt-3">
                            <p className="mb-1.5 text-[14px] font-medium text-gray-700">
                                পাসওয়ার্ড
                            </p>

                            <Input
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                variant="bordered"
                                radius="md"
                                size="sm"
                                className="w-full"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mt-3">
                            <p className="mb-1.5 text-[14px] font-medium text-gray-700">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </p>

                            <Input
                                type="password"
                                placeholder="আবার লিখুন"
                                variant="bordered"
                                radius="md"
                                size="sm"
                                className="w-full"
                            />
                        </div>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            radius="md"
                            size="sm"
                            className="mt-3 h-[40px] w-full bg-green-700 text-[14px] font-medium text-white shadow-sm hover:bg-green-800"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </Button>

                        {/* Divider */}
                        <div className="my-3 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200" />

                            <span className="shrink-0 text-[12px] text-gray-500">
                                অথবা
                            </span>

                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">

                            <Button
                                type="button"
                                variant="bordered"
                                radius="md"
                                size="sm"
                                className="h-[34px] w-full px-2 text-[12px] border-gray-800! font-medium sm:text-[11px]"
                            >
                                <span className="text-sm">🌈</span>
                                Google দিয়ে লগইন
                            </Button>

                            <Button
                                type="button"
                                variant="bordered"
                                radius="md"
                                size="sm"
                                className="h-[34px] w-full px-2 text-[12px] border-gray-800! font-medium sm:text-[11px]"
                            >
                                <span className="text-sm">◉</span>
                                GitHub দিয়ে লগইন
                            </Button>

                        </div>

                        {/* Login */}
                        <p className="mt-3 text-center text-[10px] text-gray-500 sm:text-[11px]">
                            অ্যাকাউন্ট আছে?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-green-700 hover:underline"
                            >
                                সাইন ইন করুন
                            </Link>
                        </p>

                    </div>
                </Card>

                {/* Back Home */}
                <Link
                    href="/"
                    className="mt-5 block text-center text-[10px] text-gray-500 transition-colors hover:text-gray-700 sm:text-[11px]"
                >
                    ← হোম পেজে ফিরে যান
                </Link>

            </div>
        </main>
    );
};

export default SignUp;