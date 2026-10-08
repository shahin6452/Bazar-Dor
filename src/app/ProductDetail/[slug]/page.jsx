"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryDetails = () => {
    const { slug } = useParams();

    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            getProducts();
        }
    }, [slug]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === "low") {
            return Number(a.today) - Number(b.today);
        }

        if (sortBy === "high") {
            return Number(b.today) - Number(a.today);
        }

        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="container mx-auto px-4">

                {/* Category Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        বাজারদর
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        এই ক্যাটাগরির পণ্যের আজকের বাজারদর
                    </p>
                </div>

                {/* Sort Bar */}
                <div className="mb-4 flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4">
                    <p className="text-sm text-gray-600">
                        সাজান
                    </p>

                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm text-gray-700 outline-none focus:border-gray-400"
                        >
                            <option value="default">
                                ডিফল্ট
                            </option>

                            <option value="low">
                                দাম: কম থেকে বেশি
                            </option>

                            <option value="high">
                                দাম: বেশি থেকে কম
                            </option>
                        </select>

                        {/* Chevron */}
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
                {!loading && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-500">
                            মোট{" "}
                            <span className="font-semibold text-gray-700">
                                {products.length.toLocaleString("bn-BD")}
                            </span>{" "}
                            টি পণ্য
                        </p>
                    </div>
                )}

                {/* Loading Skeleton */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-xl bg-gray-200" />

                                    <div className="flex-1">
                                        <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                                        <div className="h-3 w-1/2 rounded bg-gray-200" />
                                    </div>
                                </div>

                                <div className="mb-3 h-6 w-1/2 rounded bg-gray-200" />

                                <div className="h-3 w-1/3 rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div className="flex min-h-[50vh] items-center justify-center">
                        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
                            <div className="mb-4 text-5xl">
                                🔍
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">
                                404
                            </h2>

                            <p className="mt-2 text-lg font-semibold text-gray-800">
                                ক্যাটাগরি পাওয়া যায়নি
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
                            </p>

                            <Link
                                href="/"
                                className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
                            >
                                হোম পেজে ফিরে যান
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {sortedProducts.map((product) => (
                            <Link
                                href={`/ProductDetail/${product.id}`}
                                key={product.id}
                                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
                            >
                                {/* Product Info */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                        {product.image}
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="truncate font-semibold text-gray-900">
                                            {product.nameBn}
                                        </h2>

                                        <p className="mt-1 text-xs text-gray-500">
                                            প্রতি {product.unit}
                                        </p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mt-5 flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            আজকের দাম
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-gray-900">
                                            {Number(product.today).toLocaleString(
                                                "bn-BD"
                                            )}{" "}
                                            টাকা
                                        </p>
                                    </div>

                                    {/* Change */}
                                    <span
                                        className={
                                            product.change.dir === "up"
                                                ? "rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600"
                                                : product.change.dir === "down"
                                                    ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600"
                                                    : "rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600"
                                        }
                                    >
                                        {product.change.dir === "up" &&
                                            `▲ ${Number(
                                                product.change.pct
                                            ).toLocaleString("bn-BD")}%`}

                                        {product.change.dir === "down" &&
                                            `▼ ${Math.abs(
                                                Number(product.change.pct)
                                            ).toLocaleString("bn-BD")}%`}

                                        {product.change.dir === "flat" &&
                                            "— ০.০%"}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;