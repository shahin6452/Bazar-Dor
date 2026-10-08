"use client";

export default function Error({ reset }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="rounded-2xl border border-red-200 bg-white p-6 text-center">
                <p className="text-sm text-red-600">
                    পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।
                </p>
                <button
                    onClick={() => reset()}
                    className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
                >
                    আবার চেষ্টা করুন
                </button>
            </div>
        </div>
    );
}