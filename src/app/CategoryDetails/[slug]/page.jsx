import React from 'react';

const CategoryDetails = async ({ params }) => {
    const { slug } = await params

    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`)
    const products = await res.json()

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

                    <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none">
                        <option>ডিফল্ট</option>
                        <option>দাম: কম থেকে বেশি</option>
                        <option>দাম: বেশি থেকে কম</option>
                    </select>
                </div>


                {/* Product Count */}
                <p className="mb-4 text-sm text-gray-600">
                    মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                </p>


                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {products.map((product) => (
                        <div
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
                                        প্রতি কেজি
                                    </p>
                                </div>

                            </div>

                            <div className="mt-6 flex items-end justify-between">

                                <div>
                                    <p className="text-xs text-gray-500">
                                        আজকের দাম
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        {product.today}{" "}
                                        <span className="text-sm font-medium">
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
                                    {product.change.dir === "up" && `▲ ${product.change.pct}%`}
                                    {product.change.dir === "down" && `▼ ${Math.abs(product.change.pct)}%`}
                                    {product.change.dir === "flat" && "— ০.০%"}
                                </span>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div >
    );
};

export default CategoryDetails;