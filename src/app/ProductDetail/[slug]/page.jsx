import React from 'react';

const ProductDetailPage = async ({ params }) => {
    const { slug } = await params

    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${slug}`,
        {
            cache: "force-cache",
        }
    )
    const productDetail = await res.json()

    // console.log("test", productDetail)

    return (
        <div>
            <h2>Detail:{productDetail.nameBn}</h2>
        </div>
    );
};

export default ProductDetailPage;