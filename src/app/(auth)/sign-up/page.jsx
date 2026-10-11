"use client";

import React, { Suspense } from "react";
import {
    Card,
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const SignUpForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            if (data.password !== data.confirmPassword) {
                toast.error("পাসওয়ার্ড মিলছে না।");
                return;
            }

            const { data: resData, error } = await signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (error) {
                toast.error(
                    error.message || "Failed to Create an Account!"
                );
                return;
            }

            if (!resData) {
                toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
                return;
            }

            toast.success("Account created successfully!");
            router.push("/sign-in");
        } catch (error) {
            console.error("Signup error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
            );
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await signIn.social({
                provider: "google",
                callbackURL: searchParams.get("callbackURL") || "/",
            });

            if (error) {
                toast.error(error.message || "Google login failed!");
            }
        } catch (error) {
            console.error("Google login error:", error);
            toast.error("Google দিয়ে লগইন করা যায়নি।");
        }
    };

    const handleGitHubSignIn = async () => {
        try {
            const { error } = await signIn.social({
                provider: "github",
                callbackURL: searchParams.get("callbackURL") || "/",
            });

            if (error) {
                toast.error(error.message || "GitHub login failed!");
            }
        } catch (error) {
            console.error("GitHub login error:", error);
            toast.error("GitHub দিয়ে লগইন করা যায়নি।");
        }
    };

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

                {/* Registration Form */}
                <Card className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <Form
                        className="flex w-full flex-col gap-4 p-[18px] sm:p-5"
                        onSubmit={onSubmit}
                    >
                        {/* Name */}
                        <TextField
                            isRequired
                            name="name"
                            className="flex w-full flex-col gap-1.5"
                            validate={(value) => {
                                if (!value.trim()) {
                                    return "আপনার নাম লিখুন।";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-[14px] font-medium text-gray-700">
                                নাম
                            </Label>

                            <Input
                                autoComplete="name"
                                placeholder="যেমন: রহিম উদ্দিন"
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-700"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

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
                                autoComplete="email"
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
                                autoComplete="new-password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-700"
                            />

                            <Description className="text-xs text-gray-500">
                                কমপক্ষে ৮ অক্ষর ব্যবহার করুন।
                            </Description>

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Confirm Password */}
                        <TextField
                            isRequired
                            name="confirmPassword"
                            type="password"
                            className="flex w-full flex-col gap-1.5"
                            validate={(value) => {
                                if (!value) {
                                    return "পাসওয়ার্ড আবার লিখুন।";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-[14px] font-medium text-gray-700">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </Label>

                            <Input
                                autoComplete="new-password"
                                placeholder="আবার লিখুন"
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-700"
                            />

                            <FieldError className="text-xs text-red-600" />
                        </TextField>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            className="mt-1 h-10 w-full rounded-lg bg-green-700 text-sm font-medium text-white shadow-sm hover:bg-green-800"
                        >
                            অ্যাকাউন্ট তৈরি করুন
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
                                onClick={handleGoogleSignIn}
                                type="button"
                                variant="bordered"
                                className="h-[38px] w-full rounded-lg border border-gray-300 px-2 text-xs font-medium text-gray-800 sm:text-[11px]"
                            >
                                <span className="text-sm">🌈</span>
                                Google দিয়ে লগইন
                            </Button>

                            <Button
                                onClick={handleGitHubSignIn}
                                type="button"
                                variant="bordered"
                                className="h-[38px] w-full rounded-lg border border-gray-300 px-2 text-xs font-medium text-gray-800 sm:text-[11px]"
                            >
                                <span className="text-sm">◉</span>
                                GitHub দিয়ে লগইন
                            </Button>
                        </div>

                        {/* Login */}
                        <p className="mt-1 w-full text-center text-[10px] text-gray-500 sm:text-[11px]">
                            অ্যাকাউন্ট আছে?{" "}
                            <Link
                                href="/sign-in"
                                className="font-medium text-green-700 hover:underline"
                            >
                                সাইন ইন করুন
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

export default function SignUp() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <SignUpForm />
            <Toaster position="top-center" />
        </Suspense>
    );
}