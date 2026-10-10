import { cacheLife } from "next/cache";

const DEFAULT_API_BASE = "https://openapi.programming-hero.com/api/bazardor";

// .env খালি থাকলেও ডিফল্ট লিংক ব্যবহার হবে, আর শেষের "/" বাদ যাবে
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE).replace(
    /\/+$/,
    ""
);

// সব fetch এই এক জায়গা দিয়ে যাবে।
// API যদি JSON-এর বদলে HTML (এরর/নোটফাউন্ড পেজ) পাঠায়, তাহলে
// "Unexpected token '<'" এরর না এসে পরিষ্কার বার্তা আসবে।
async function fetchJson(url) {
    const res = await fetch(url);

    if (res.status === 404) {
        return { notFound: true, data: null };
    }

    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
        const preview = (await res.text()).slice(0, 120).replace(/\s+/g, " ");
        throw new Error(
            `API ব্যর্থ: ${res.status} ${res.statusText} | ${url} | ${preview}`
        );
    }

    return { notFound: false, data: await res.json() };
}

export async function getProducts(category) {
    "use cache";
    cacheLife("minutes");

    const url = category
        ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
        : `${API_BASE}/products`;

    const { data } = await fetchJson(url);

    return Array.isArray(data) ? data : [];
}

export async function getProduct(id) {
    "use cache";
    cacheLife("minutes");

    const { notFound, data } = await fetchJson(
        `${API_BASE}/products/${encodeURIComponent(id)}`
    );

    if (notFound) return null;

    // API একটা object বা একটা আইটেমের array দিলেও কাজ করবে
    const product = Array.isArray(data) ? data[0] : data;

    return product?.nameBn ? product : null;
}