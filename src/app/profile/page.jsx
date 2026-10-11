"use client";

import { signOut, updateUser, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileCard() {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries())


        const { data: resData, error } = await updateUser({
            name: userData.name
        });

        if (error) {
            toast.error(error.message || 'Information Update Failed!')
            return
        }

        toast.success('Information Updated Successfuly')




    };
    const router = useRouter();
    const { data: session } = useSession()

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-md">

                {/* Page Heading */}
                <h2 className="text-xl font-bold text-gray-900">
                    আমার প্রোফাইল
                </h2>

                <p className="mb-5 text-sm text-gray-500">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                {/* Profile Card */}
                <div className="mb-4 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">
                        <Image
                            src="/profile.jpg"
                            alt="Profile"
                            height={48}
                            width={48}
                            className="h-12 w-12 rounded-xl object-cover"
                        />

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {session?.user?.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={async () => {
                            try {
                                await signOut({
                                    fetchOptions: {
                                        onSuccess: () => {
                                            toast.success("সফলভাবে সাইন আউট হয়েছে!");
                                            router.push("/sign-in");
                                        },
                                        onError: (error) => {
                                            toast.error(
                                                error?.error?.message || "সাইন আউট করা যায়নি!"
                                            );
                                        },
                                    },
                                });
                            } catch (error) {
                                toast.error("নেটওয়ার্ক সমস্যা! আবার চেষ্টা করুন।");
                            }
                        }}
                        className="rounded-lg border border-red-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        ↪ সাইন আউট
                    </button>

                </div>

                {/* Information Form */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">

                    <h3 className="mb-5 font-semibold text-gray-800">
                        তথ্য
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="আপনার নাম লিখুন"
                            className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-green-700 py-2 text-sm font-medium text-white hover:bg-green-800"
                        >
                            আপডেট
                        </button>
                    </form>

                </div>

            </div>
        </div>
    );
}