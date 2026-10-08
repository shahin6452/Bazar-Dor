"use client";

import Link from "next/link";
import { useState } from "react";
import ChangeBadge from "@/app/components/ChangeBadge";
import { formatBn } from "@/lib/format";

const ProductGrid = ({ products }) => {
    const [sortBy, setSortBy] = useState("default");

    const sortedProducts = [...products];

    if (sortBy === "low") {
        sortedProducts.sort((a, b) => (Number(a.today) || 0) - (Number(b.today) || 0));
    } else if (sortBy === "high") {
        sortedProducts.sort((a, b) => (Number(b.today) || 0) - (Number(a.today) || 0));
    }

    return (
        <>
            {/* Sort Bar */}
            <div className="mb-4 flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-5 sm:px-5">
                <p className="text-sm text-gray-600">সাজান</p>

                <div className="relative w-full sm:w-auto">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm text-gray-700 outline-none focus:border-gray-400 sm:w-auto"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low">দাম: কম থেকে বেশি</option>
                        <option value="high">দাম: বেশি থেকে কম</option>
                    </select>

                    <svg
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            {/* Product Count */}
            <p className="mb-4 text-sm text-gray-600">
                মোট {formatBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Empty state */}
            {sortedProducts.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                    <p className="text-sm text-gray-500">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
                    </p>
                    <Link
                        href="/"
                        className="mt-4 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                        <Link
                            href={`/ProductDetail/${product.id}`}
                            key={product.id}
                            className="rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl">
                                    {product.image}
                                </div>

                                <div className="min-w-0">
                                    <h2 className="truncate font-semibold text-gray-900">
                                        {product.nameBn}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        প্রতি {product.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-end justify-between gap-3">
                                <div>
                                    <p className="text-xs text-gray-500">আজকের দাম</p>
                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        {formatBn(product.today)}
                                        <span className="ml-1 text-sm font-medium">টাকা</span>
                                    </p>
                                </div>

                                <ChangeBadge change={product.change} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductGrid;