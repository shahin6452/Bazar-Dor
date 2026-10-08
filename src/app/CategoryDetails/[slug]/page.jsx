"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CategoryDetails = ({ params }) => {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        const getProducts = async () => {
            const { slug } = await params;

            const res = await fetch(
                `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`
            );

            const data = await res.json();

            setProducts(data);
        };

        getProducts();
    }, [params]);


    // Sort products
    const sortedProducts = [...products].sort((a, b) => {

        // Default = API order
        if (sortBy === "default") {
            return 0;
        }

        // Low to high
        if (sortBy === "low") {
            return Number(a.today) - Number(b.today);
        }

        // High to low
        if (sortBy === "high") {
            return Number(b.today) - Number(a.today);
        }

        return 0;
    });


    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="container mx-auto px-4">

                {/* Category Header */}
                <div className="mb-5 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-3xl">
                        {products[0]?.categoryIcon}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {products[0]?.categoryNameBn}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>

                </div>


                {/* Sort Bar */}
                <div className="mb-4 flex items-center justify-end gap-5 rounded-2xl border border-gray-200 bg-white px-5 py-4">

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
                <p className="mb-4 text-sm text-gray-600">
                    মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                </p>


                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {sortedProducts.map((product) => (

                        <Link
                            href={`/ProductDetail/${product.id}`}
                            key={product.id}
                            className="rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                        >

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-2xl">
                                    {product.image}
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        {product.nameBn}
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        প্রতি {product.unit}
                                    </p>
                                </div>

                            </div>


                            <div className="mt-6 flex items-end justify-between">

                                <div>

                                    <p className="text-xs text-gray-500">
                                        আজকের দাম
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        {Number(product.today).toLocaleString('bn-BD')}

                                        <span className="ml-1 text-sm font-medium">
                                            টাকা
                                        </span>
                                    </p>

                                </div>


                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${product.change.dir === "up"
                                        ? "bg-red-50 text-red-600"
                                        : product.change.dir === "down"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-gray-100 text-black"
                                        }`}
                                >

                                    {product.change.dir === "up" &&
                                        `▲ ${Number(product.change.pct).toLocaleString('bn-BD')}%`
                                    }

                                    {product.change.dir === "down" &&
                                        `▼ ${Math.abs(Number(product.change.pct)).toLocaleString('bn-BD')}%`
                                    }

                                    {product.change.dir === "flat" &&
                                        "— ০.০%"
                                    }

                                </span>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>
        </div>
    );
};

export default CategoryDetails;