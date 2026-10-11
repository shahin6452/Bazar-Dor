import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
            <p className="mb-3 text-7xl font-extrabold text-green-700 sm:text-9xl">
                404
            </p>

            <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-4xl">
                এই পেজটি খুঁজে পাওয়া যাচ্ছে না!
            </h1>

            <p className="mb-8 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
                পেজের ঠিকানা ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
            </p>

            <Link
                href="/"
                className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}