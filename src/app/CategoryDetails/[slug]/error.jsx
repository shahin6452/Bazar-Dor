
"use client";

import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                    404
                </h1>

                <p className="mt-3 text-lg font-semibold text-gray-800">
                    কোনো পণ্য পাওয়া যায়নি!
                </p>

                <p className="mt-2 text-sm text-gray-500">
                    এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা পেজটি খুঁজে পাওয়া যায়নি।
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}
