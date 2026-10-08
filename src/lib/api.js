import { cacheLife } from "next/cache";

const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ??
    "https://api.abcz.workers.dev/api/bazardor";

export async function getProducts(category) {
    "use cache";
    cacheLife("minutes");

    const url = category
        ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
        : `${API_BASE}/products`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

export async function getProduct(id) {
    "use cache";
    cacheLife("minutes");

    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(id)}`);

    if (res.status === 404) return null;

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    const data = await res.json();

    // API একটা object বা একটা আইটেমের array দিলেও কাজ করবে
    const product = Array.isArray(data) ? data[0] : data;

    return product?.nameBn ? product : null;
}