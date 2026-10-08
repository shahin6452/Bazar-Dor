"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Category = () => {
    const [categoryList, setCategoryList] = useState([]);
    const pathname = usePathname();

    const currentSlug = pathname.split("/").filter(Boolean).pop();

    useEffect(() => {
        const getCategory = async () => {
            const res = await fetch(
                "https://api.api-store.workers.dev/api/bazardor/categories"
            );

            if (!res.ok) {
                throw new Error("Failed to fetch categories");
            }

            const data = await res.json();
            setCategoryList(data);
        };

        getCategory();
    }, []);

    return (
        <div className="w-full border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-14 items-center gap-8 px-4">
                {categoryList.map((category) => (
                    <Link
                        href={`/CategoryDetails/${category.slug}`}
                        key={category.id}
                        className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${
                            currentSlug === category.slug
                                ? "bg-green-700 text-white rounded-lg px-4 py-2"
                                : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        <span className="text-base">{category.icon}</span>
                        <span>{category.nameBn}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;