"use client";

import { Suspense } from "react";
import { Card, Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import React from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const SignInForm = () => {
    const searchParams = useSearchParams();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const { data: resData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: searchParams.get("callbackURL") || "/",
        });

        if (error) {
            toast.error(error.message || "Login failed!");
            return;
        }

        toast.success("Logged in successfully!");
    };

    const handleGoogleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: searchParams.get("callbackURL") || "/",
        });
    };

    const handleGitHubSignIn = async () => {
        await signIn.social({
            provider: "github",
            callbackURL: searchParams.get("callbackURL") || "/",
        });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-10">
            <div className="w-full max-w-[500px]">
                <div className="mb-5 text-center sm:mb-6">
                    <h1 className="text-[25px] font-bold leading-tight text-gray-900 sm:text-2xl">
                        সাইন ইন
                    </h1>
                    <p className="mt-1 text-[12px] leading-4 text-gray-500 sm:text-[11px]">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                <Card className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <Form
                        className="flex w-full flex-col gap-4 p-[18px] sm:p-5"
                        onSubmit={onSubmit}
                    >
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="flex w-full flex-col gap-1.5"
                            validate={(value) =>
                                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                    ? "সঠিক ইমেইল ঠিকানা লিখুন।"
                                    : null
                            }
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

                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            minLength={8}
                            className="flex w-full flex-col gap-1.5"
                            validate={(value) =>
                                value.length < 8
                                    ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"
                                    : null
                            }
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

                        <Button
                            type="submit"
                            className="mt-1 h-10 w-full rounded-lg bg-green-700 text-sm font-medium text-white shadow-sm hover:bg-green-800"
                        >
                            সাইন ইন
                        </Button>

                        <div className="my-1 flex w-full items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="shrink-0 text-xs text-gray-500">অথবা</span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
                            <Button
                                onClick={handleGoogleSignIn}
                                type="button"
                                variant="bordered"
                                className="h-[38px] w-full rounded-lg border border-gray-300 px-2 text-xs font-medium text-gray-800 sm:text-[11px]"
                            >
                                <span className="text-sm">🌈</span>
                                Google দিয়ে চালিয়ে যান
                            </Button>

                            <Button
                                onClick={handleGitHubSignIn}
                                type="button"
                                variant="bordered"
                                className="h-[38px] w-full rounded-lg border border-gray-300 px-2 text-xs font-medium text-gray-800 sm:text-[11px]"
                            >
                                <span className="text-sm">◉</span>
                                GitHub দিয়ে চালিয়ে যান
                            </Button>
                        </div>

                        <p className="mt-1 w-full text-center text-[10px] text-gray-500 sm:text-[11px]">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/sign-up"
                                className="font-medium text-green-700 hover:underline"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </Form>
                </Card>

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

export default function SignIn() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <SignInForm />
            <Toaster position="top-center" />
        </Suspense>
    );
}