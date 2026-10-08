import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import { formatBn } from "@/lib/format";
import ProductGrid from "./ProductGrid";

const PageSkeleton = () => (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="container mx-auto px-0 sm:px-4">
            <div className="mb-5 h-20 animate-pulse rounded-2xl border border-gray-200 bg-white" />
            <div className="mb-4 h-16 animate-pulse rounded-2xl border border-gray-200 bg-white" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-white"
                    />
                ))}
            </div>
        </div>
    </div>
);

async function CategoryContent({ params }) {
    const { slug } = await params;
    const products = await getProducts(slug);

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

                {/* Sort + Grid */}
                <ProductGrid products={products} />
            </div>
        </div>
    );
}

export default function Page({ params }) {
    return (
        <Suspense fallback={<PageSkeleton />}>
            <CategoryContent params={params} />
        </Suspense>
    );
}