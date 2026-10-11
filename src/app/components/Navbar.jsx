
"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
    const [today, setToday] = useState("");
    const { data: session, isPending } = useSession();
    const router = useRouter();

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

    const authLinks = (
        <>
            {isPending ? (
                <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-green-700"></div>
                </div>
            ) : session?.user ? (
                <ProfileMenu
                    name={session.user.name}
                    fullName={session.user.name}
                    email={session.user.email}
                    onSignOut={async () => {
                        const currentPath =
                            window.location.pathname +
                            window.location.search;

                        try {
                            const { error } = await signOut();

                            if (error) {
                                toast.error("Sign out failed");
                                return;
                            }

                            router.push(
                                `/sign-in?callbackURL=${encodeURIComponent(currentPath)}`
                            );
                            toast.success("Sign out successfully");
                        } catch (error) {
                            toast.error("Sign out failed");
                        }
                    }}
                />
            ) : (
                <>
                    <Link href="/sign-in">
                        <button className="cursor-pointer whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-700">
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/sign-up">
                        <Button
                            className="cursor-pointer whitespace-nowrap bg-green-700 px-3 text-sm font-medium text-white sm:px-5"
                            radius="md"
                        >
                            সাইন আপ
                        </Button>
                    </Link>
                </>
            )}
        </>
    );

    return (
        <div className="border-b border-gray-200">
            <div className="container mx-auto">
                <nav className="flex min-h-20 w-full flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-3 sm:px-5">
                    <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white">
                            <Image
                                src="/assets/logo-icon.png"
                                alt="Bazar Dor Logo"
                                width={20}
                                height={20}
                            />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
                                বাজার দর
                            </h1>

                            <p className="text-xs text-gray-500 sm:text-sm">
                                {today}
                            </p>
                        </div>
                    </Link>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-6">
                        {authLinks}
                    </div>
                </nav>
            </div>
        </div>
    );
}
