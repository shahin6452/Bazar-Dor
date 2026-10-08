import Link from 'next/link';
import React from 'react';


const AllPRoducts = ({ products }) => {

    return (
        <div id="products" className='container mx-auto px-5 mt-10'>
            <h2 className='font-semibold text-3xl mb-3'>সব পণ্য</h2>
            <p className='mb-4'>মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
            {/* Card */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {
                    products.map(product => (
                        <Link key={product.id} href={`/ProductDetail/${product.slug}`} >
                            <div className="card w-full border border-gray-200 bg-white shadow-sm">
                                <div className="card-body p-4">

                                    {/* Product Info */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-2xl">
                                            {product.image}
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-gray-900">
                                                {product.nameBn}
                                            </h2>

                                            <p className="text-xs text-gray-500">
                                                প্রতি কেজি
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
                                                {product.today.toLocaleString("bn-BD")}
                                                <span className="text-sm font-medium ml-1">
                                                    টাকা
                                                </span>
                                            </p>
                                        </div>

                                        {/* Change */}
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${product.change.dir === "up"
                                                ? "bg-red-50 text-red-600"
                                                : product.change.dir === "down"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-gray-100 text-black"
                                                }`}
                                        >
                                            {product.change.dir === "up" &&
                                                `▼ ${Math.abs(product.change.pct)
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