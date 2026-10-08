import Link from 'next/link';
import React from 'react';

const getCategory = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories",
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
    const categoryList = await getCategory()


    return (
        <div className="w-full border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-14 items-center  gap-8 px-4">

                {
                    categoryList.map(category => (
                        <Link
                            href={`/CategoryDetails/${category.slug}`}
                            key={category.id}
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-700"
                        >
                            <span className="text-base">{category.icon}</span>
                            <span>{category.nameBn}</span>
                        </Link>
                    ))
                }


            </div>
        </div >
    );


};

export default Category;