"use client";

import { Card, Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";


import React from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

const SignIn = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        // Convert FormData to plain object
        
        console.log('data test', data)

        const {data:resData, error} = await signIn.email({
            email:data.email,
            password:data.password,
            rememberMe: true,
            callbackURL: "/"
        });

        console.log(resData, error)
    };


    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-10">
            <div className="w-full max-w-[500px]">

                {/* Header */}
                <div className="mb-5 text-center sm:mb-6">
                    <h1 className="text-[25px] font-bold leading-tight text-gray-900 sm:text-2xl">
                        সাইন ইন
                    </h1>

                    <p className="mt-1 text-[12px] leading-4 text-gray-500 sm:text-[11px]">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Registration Form */}
                <Card className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <Form
                        className="flex w-full flex-col gap-4 p-[18px] sm:p-5"
                        onSubmit={onSubmit}
                    >

                        {/* Email */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="flex w-full flex-col gap-1.5"
                            validate={(value) => {
                                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                    return "সঠিক ইমেইল ঠিকানা লিখুন।";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-[14px] font-medium text-gray-700">
                                ইমেইল
                            </Label>

                            <Input
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-700"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Password */}
                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            minLength={8}
                            className="flex w-full flex-col gap-1.5"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-[14px] font-medium text-gray-700">
                                পাসওয়ার্ড
                            </Label>

                            <Input
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-700"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Sign in Button */}
                        <Button
                            type="submit"
                            className="mt-1 h-10 w-full rounded-lg bg-green-700 text-sm font-medium text-white shadow-sm hover:bg-green-800"
                        >
                            সাইন ইন
                        </Button>

                        {/* Divider */}
                        <div className="my-1 flex w-full items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200" />

                            <span className="shrink-0 text-xs text-gray-500">
                                অথবা
                            </span>

                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        {/* Social Login */}
                        <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
                            <Button
                                type="button"
                                variant="bordered"
                                className="h-[38px] w-full rounded-lg border border-gray-300 px-2 text-xs font-medium text-gray-800 sm:text-[11px]"
                            >
                                <span className="text-sm">🌈</span>
                                Google দিয়ে চালিয়ে যান
                            </Button>

                            <Button
                                type="button"
                                variant="bordered"
                                className="h-[38px] w-full rounded-lg border border-gray-300 px-2 text-xs font-medium text-gray-800 sm:text-[11px]"
                            >
                                <span className="text-sm">◉</span>
                                GitHub দিয়ে চালিয়ে যান
                            </Button>
                        </div>

                        {/* Login */}
                        <p className="mt-1 w-full text-center text-[10px] text-gray-500 sm:text-[11px]">
                            অ্যাকাউন্ট নেই?
                            <Link
                                href="/sign-up"
                                className="font-medium text-green-700 hover:underline"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </Form>
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

export default SignIn;