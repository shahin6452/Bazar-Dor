"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

const formatBn = (value) => Number(value || 0).toLocaleString("bn-BD");

const ChangeBadge = ({ change }) => {
    const dir = change?.dir;
    const pct = Math.abs(Number(change?.pct) || 0);

    if (dir === "up") {
        return (
            <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                ▲ {formatBn(pct)}%
            </span>
        );
    }

    if (dir === "down") {
        return (
            <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                ▼ {formatBn(pct)}%
            </span>
        );
    }

    // flat অথবা change না থাকলে
    return (
        <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-black">
            — ০.০%
        </span>
    );
};

const CategoryDetails = () => {
    const params = useParams();
    // useParams() কখনো array দিতে পারে, তাই সেটা সামলানো হলো
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const controller = new AbortController();

        const getProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `${API_URL}?category=${encodeURIComponent(slug)}`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await res.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                if (err.name === "AbortError") return;
                console.error("Products fetch error:", err);
                setError("পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
                setProducts([]);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        getProducts();

        return () => controller.abort();
    }, [slug]);

    // Sort products
    const sortedProducts = useMemo(() => {
        const list = [...products];

        if (sortBy === "low") {
            list.sort((a, b) => (Number(a.today) || 0) - (Number(b.today) || 0));
        } else if (sortBy === "high") {
            list.sort((a, b) => (Number(b.today) || 0) - (Number(a.today) || 0));
        }

        return list;
    }, [products, sortBy]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-600">লোড হচ্ছে...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="rounded-2xl border border-red-200 bg-white p-6 text-center">
                    <p className="text-sm text-red-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="container mx-auto px-0 sm:px-4">

                {/* Category Header */}
                <div className="mb-5 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                        {products[0]?.categoryIcon || "📦"}
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {products[0]?.categoryNameBn || "ক্যাটাগরি"}
                        </h1>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            {formatBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>

                </div>

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
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 1.04l-4.25-4.5a.75.75 0 01.02-1.06z"
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
                    </div>
                ) : (
                    /* Product Grid */
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

            </div>
        </div>
    );
};

export default CategoryDetails;