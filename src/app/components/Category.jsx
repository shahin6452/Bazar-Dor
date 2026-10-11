"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getCategory = async () => {

    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories",
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json();
};

const Category = () => {
    const pathName = usePathname();
    const [categoryList, setCategoryList] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        getCategory()
            .then((data) => setCategoryList(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowAll(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full border-b border-gray-200 bg-white">
            <div className="relative flex w-full items-center px-2 sm:px-4">
                <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden sm:gap-3">
                    {categoryList.map((category) => (
                        <Link
                            href={`/CategoryDetails/${category.slug}`}
                            key={category.id}
                            className={`flex shrink-0 items-center gap-1 whitespace-nowrap px-5 py-2 text-sm font-medium transition-colors sm:gap-2 sm:px-3 ${
                                pathName === `/CategoryDetails/${category.slug}` 
                                ? 'bg-green-700 text-white rounded-2xl'
                                : 'text-gray-700 hover:text-green-700'
                            }`}
                        >
                            <span>{category.icon}</span>
                            <span>{category.nameBn}</span>
                        </Link>
                    ))}
                </div>

                <div className="relative shrink-0" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setShowAll((prev) => !prev)}
                        aria-label="সব ক্যাটাগরি দেখুন"
                        aria-expanded={showAll}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-gray-700 hover:bg-gray-100"
                    >
                        ⋯
                    </button>

                    {showAll && (
                        <div className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-64 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                            {categoryList.map((category) => (
                                <Link
                                    href={`/CategoryDetails/${category.slug}`}
                                    key={category.id}
                                    onClick={() => setShowAll(false)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-700"
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.nameBn}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Category;