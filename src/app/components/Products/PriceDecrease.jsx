import Link from 'next/link';
import React from 'react';

const PriceDecrease = ({ products }) => {
    return (
        <div className="container mx-auto mt-15 px-5">
            {/* Section Header */}
            <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        <span className="mr-2 text-green-600">▼</span>
                        আজ দাম কমেছে
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        আজ সবচেয়ে বেশি দাম কমেছে এমন ৬টি পণ্য
                    </p>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {
                    products
                        .filter(product => product.change.dir === 'down')
                        .sort((a, b) => a.change.pct - b.change.pct)
                        .slice(0, 6)
                        .map(product => (
                            <Link
                                key={product.id}
                                href={`/ProductDetail/${product.id}`}
                                className="group block"
                            >
                                <div className="card w-full overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
                                    <div className="card-body p-5">

                                        {/* Product Info */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-3xl transition-colors group-hover:bg-green-100">
                                                {product.image}
                                            </div>

                                            <div className="min-w-0">
                                                <h2 className="truncate text-base font-bold text-gray-900">
                                                    {product.nameBn}
                                                </h2>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    প্রতি কেজি
                                                </p>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="my-5 border-t border-gray-100"></div>

                                        {/* Price */}
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">
                                                    আজকের দাম
                                                </p>

                                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                                    {product.today.toLocaleString("bn-BD")}
                                                    <span className="ml-1 text-sm font-medium text-gray-500">
                                                        টাকা
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Change */}
                                            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                                                {product.change.dir === "down" &&
                                                    `▼ ${Math.abs(product.change.pct)
                                                        .toFixed(1)
                                                        .replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d])}%`}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        ))
                }
            </div>
        </div>
    );
};

export default PriceDecrease;