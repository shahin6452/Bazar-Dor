import Link from 'next/link';
import React from 'react';

const AllPRoducts = ({ products }) => {

    return (
        <div id="products" className="container mx-auto mt-12 px-5 pb-10">
            {/* Section Header */}
            <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        সব পণ্য
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {
                    products.map(product => (
                        <Link
                            key={product.id}
                            href={`/ProductDetail/${product.id}`}
                            className="group"
                        >
                            <div className="card w-full overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">

                                <div className="card-body p-5">

                                    {/* Product Info */}
                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-3xl transition-colors group-hover:bg-green-100">
                                            {product.image}
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-green-700">
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
                                        <span
                                            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${product.change.dir === "up"
                                                    ? "bg-red-50 text-red-600"
                                                    : product.change.dir === "down"
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {product.change.dir === "up" &&
                                                `▲ ${Math.abs(product.change.pct)
                                                    .toFixed(1)
                                                    .replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d])}%`}

                                            {product.change.dir === "down" &&
                                                `▼ ${Math.abs(product.change.pct)
                                                    .toFixed(1)
                                                    .replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d])}%`}

                                            {product.change.dir === "flat" && "— ০.০%"}
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

export default AllPRoducts;