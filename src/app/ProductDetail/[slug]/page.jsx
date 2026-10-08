import CategoryDetails from '@/app/CategoryDetails/[slug]/page';
import Link from 'next/link';
import React from 'react';

const ProductDetailPage = async ({ params }) => {
    const { slug } = await params

    const res = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products/${slug}`,
        {
            cache: "force-cache",
        }
    )

    const productDetail = await res.json()

    const lowestPrice = Math.min(
        ...productDetail.markets.map((market) => market.min)
    );

    const highestPrice = Math.max(
        ...productDetail.markets.map((market) => market.max)
    );

    const averagePrice = productDetail.today;

    return (
        <div className="min-h-screen w-full bg-white px-3 py-6 sm:px-4 sm:py-8 md:px-8">
            <div className="container mx-auto w-full">

                {/* Breadcrumb */}
                <div className="breadcrumbs mb-5 overflow-x-auto whitespace-nowrap text-sm">
                    <ul className="flex-nowrap">
                        <li>
                            <Link href='/'>হোম</Link>
                        </li>
                        {/* /CategoryDetails/${category.slug} */}
                        <li>
                            <Link href={`/CategoryDetails/${productDetail.category}`}>{productDetail.categoryNameBn}</Link>
                        </li>

                        <li className="font-medium">
                            {productDetail.nameBn}
                        </li>
                    </ul>
                </div>


                {/* Product Hero */}
                <div className="card w-full border border-gray-200 bg-white shadow-sm">
                    <div className="card-body p-4 sm:p-5 md:p-7">

                        <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">

                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
                                    {productDetail.image}
                                </div>

                                <div className="min-w-0">
                                    <h1 className="truncate text-lg font-bold sm:text-xl md:text-2xl">
                                        {productDetail.nameBn}
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-500">
                                        প্রতি {productDetail.unit} · {productDetail.nameBn}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        গতকালের তুলনায় আজ দাম বেড়েছে ·{" "}
                                        {(productDetail.today - productDetail.yesterday).toLocaleString('bn-BD')} টাকা
                                    </p>
                                </div>

                            </div>


                            {/* Current Price */}
                            <div className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-center sm:px-6 md:w-auto md:min-w-40">

                                <p className="text-xs font-medium text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="mt-1 mb-1 text-3xl font-black text-gray-900">
                                    {productDetail.today.toLocaleString('bn-BD')}
                                </p>

                                <p className="mb-1 text-xs text-gray-500">
                                    টাকা / {productDetail.unit}
                                </p>

                                <span
                                    className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${productDetail.change.dir === "up"
                                        ? "bg-red-50 text-red-600"
                                        : productDetail.change.dir === "down"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {productDetail.change.dir === "up" &&
                                        `▲ ${Math.abs(productDetail.change.pct)
                                            .toFixed(1)
                                            .replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d])}%`}

                                    {productDetail.change.dir === "down" &&
                                        `▼ ${Math.abs(productDetail.change.pct)
                                            .toFixed(1)
                                            .replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d])}%`}

                                    {productDetail.change.dir === "flat" && "— ০.০%"}
                                </span>

                            </div>

                        </div>

                    </div>
                </div>


                {/* Price Summary */}
                <div className="mt-6">

                    <h2 className="mb-3 text-base font-bold text-gray-900">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        {/* Lowest */}
                        <div className="card w-full border border-gray-200 bg-white shadow-sm">
                            <div className="card-body p-5">

                                <p className="text-sm text-gray-500">
                                    সর্বনিম্ন দাম
                                </p>

                                <p className="mt-1 text-2xl font-bold text-green-600">
                                    {lowestPrice.toLocaleString("bn-BD")} টাকা
                                </p>

                                <p className="text-xs text-gray-400">
                                    সবচেয়ে কম দামের বাজার
                                </p>

                            </div>
                        </div>


                        {/* Highest */}
                        <div className="card w-full border border-gray-200 bg-white shadow-sm">
                            <div className="card-body p-5">

                                <p className="text-sm text-gray-500">
                                    সর্বোচ্চ দাম
                                </p>

                                <p className="mt-1 text-2xl font-bold text-red-600">
                                    {highestPrice.toLocaleString("bn-BD")} টাকা
                                </p>

                                <p className="text-xs text-gray-400">
                                    সবচেয়ে বেশি দামের বাজার
                                </p>

                            </div>
                        </div>


                        {/* Average / Today */}
                        <div className="card w-full border border-gray-200 bg-white shadow-sm">
                            <div className="card-body p-5">

                                <p className="text-sm text-gray-500">
                                    গড় দাম
                                </p>

                                <p className="mt-1 text-2xl font-bold text-green-600">
                                    {averagePrice.toLocaleString("bn-BD")} টাকা
                                </p>

                                <p className="text-xs text-gray-400">
                                    প্রতি {productDetail.unit}-এর হিসাবে
                                </p>

                            </div>
                        </div>

                    </div>
                </div>


                {/* Market Price Table */}
                <div className="mt-6">

                    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                        {/* Section Header */}
                        <div className="border-b border-gray-200 px-4 py-4 sm:px-5 md:px-6">
                            <h2 className="text-base font-bold text-gray-900">
                                বাজারভিত্তিক আজকের দাম
                            </h2>
                        </div>


                        {/* Table */}
                        <div className="w-full overflow-x-auto">

                            <table className="w-full min-w-[650px] text-sm">

                                <thead>
                                    <tr className="border-b border-gray-200 text-left">

                                        <th className="px-4 py-3 font-semibold text-gray-700 sm:px-5">
                                            বাজার
                                        </th>

                                        <th className="px-4 py-3 font-semibold text-gray-700 sm:px-5">
                                            বিভাগ
                                        </th>

                                        <th className="px-4 py-3 font-semibold text-gray-700 sm:px-5">
                                            সর্বনিম্ন
                                        </th>

                                        <th className="px-4 py-3 font-semibold text-gray-700 sm:px-5">
                                            সর্বোচ্চ
                                        </th>

                                        <th className="px-4 py-3 text-right font-semibold text-gray-700 sm:px-5">
                                            গড়
                                        </th>

                                    </tr>
                                </thead>


                                <tbody>

                                    {productDetail.markets.map((market, index) => {

                                        const average = (market.min + market.max) / 2;

                                        return (
                                            <tr
                                                key={`${market.market}-${index}`}
                                                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                                            >

                                                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800 sm:px-5">
                                                    {market.market}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-3 text-gray-600 sm:px-5">
                                                    {market.division}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700 sm:px-5">
                                                    {market.min.toLocaleString("bn-BD")} টাকা
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700 sm:px-5">
                                                    {market.max.toLocaleString("bn-BD")} টাকা
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-800 sm:px-5">
                                                    {average.toLocaleString("bn-BD")} টাকা
                                                </td>

                                            </tr>
                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};


export default ProductDetailPage;