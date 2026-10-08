import React from "react";
import Link from "next/link";

const getCategory = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories",
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json();
};

const Category = async () => {
    const categoryList = await getCategory();

    return (
        <div className="w-full border-b border-gray-200">
            <div className="container mx-auto flex min-h-14 items-center gap-2 overflow-x-auto px-4 sm:gap-4 md:gap-6 lg:gap-8">
                {categoryList.map((category) => (
                    <Link
                        href={`/CategoryDetails/${category.slug}`}
                        key={category.id}
                        className="flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-700 sm:px-4"
                    >
                        <span className="text-base">
                            {category.icon}
                        </span>

                        <span>
                            {category.nameBn}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;