import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { formatBn } from "@/lib/format";

const UNIT_BN = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    l: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    hali: "হালি",
    gram: "গ্রাম",
    g: "গ্রাম",
};

const unitBn = (unit) => UNIT_BN[String(unit).toLowerCase()] ?? unit;

const num = (v) => {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

// পূর্ণসংখ্যা হলে ৬৪, নইলে ৬৩.৫০
const fmtPrice = (v) =>
    Number.isInteger(v)
        ? formatBn(v)
        : v.toLocaleString("bn-BD", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

const priceText = (v) => (v === null ? "—" : `${fmtPrice(v)} টাকা`);

// API-র ডেটাকে পেজের জন্য গুছিয়ে নেওয়া
function normalizeProduct(p) {
    const markets = (Array.isArray(p.markets) ? p.markets : []).map((m) => {
        const min = num(m.min);
        const max = num(m.max);

        return {
            name: m.market ?? "—",
            division: m.division ?? "—",
            min,
            max,
            // API-তে প্রতি বাজারের গড় নেই, তাই min ও max-এর মধ্যমান
            mid: min !== null && max !== null ? (min + max) / 2 : null,
        };
    });

    const withMin = markets.filter((m) => m.min !== null);
    const withMax = markets.filter((m) => m.max !== null);

    const lowestMarket = withMin.length
        ? withMin.reduce((a, b) => (b.min < a.min ? b : a))
        : null;
    const highestMarket = withMax.length
        ? withMax.reduce((a, b) => (b.max > a.max ? b : a))
        : null;

    const today = num(p.today);
    const yesterday = num(p.yesterday);

    return {
        nameBn: p.nameBn,
        image: p.image,
        unit: unitBn(p.unit),
        category: p.category,
        categoryNameBn: p.categoryNameBn,
        categoryIcon: p.categoryIcon,
        today,
        change: p.change,
        diff:
            today !== null && yesterday !== null
                ? Math.abs(today - yesterday)
                : null,
        lowest: lowestMarket?.min ?? null,
        lowestMarketName: lowestMarket?.name ?? null,
        highest: highestMarket?.max ?? null,
        highestMarketName: highestMarket?.name ?? null,
        markets,
    };
}

const PageSkeleton = () => (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="container mx-auto max-w-4xl px-0 sm:px-4">
            <div className="mb-4 h-4 w-48 animate-pulse rounded bg-gray-200" />
            <div className="mb-5 h-32 animate-pulse rounded-2xl border border-gray-200 bg-white" />
            <div className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white" />
        </div>
    </div>
);

const SummaryCard = ({ label, value, note, color }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs text-gray-500">{label}</p>

        <p className={`mt-2 text-2xl font-bold ${color}`}>
            {value === null ? "—" : formatBn(value)}
            {value !== null && (
                <span className="ml-1 text-sm font-medium">টাকা</span>
            )}
        </p>

        <p className="mt-1 text-xs text-gray-500">{note}</p>
    </div>
);

async function ProductContent({ params }) {
    const { slug } = await params; // এই slug-ই আসলে product id
    const raw = await getProduct(slug);

    if (!raw) {
        notFound();
    }

    const product = normalizeProduct(raw);

    const dir = product.change?.dir;
    const pct = Math.abs(Number(product.change?.pct) || 0);

    const dirText =
        dir === "up" ? "বেড়েছে" : dir === "down" ? "কমেছে" : "অপরিবর্তিত";
    const dirColor =
        dir === "up"
            ? "text-red-600"
            : dir === "down"
                ? "text-green-600"
                : "text-gray-600";
    const dirArrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="container mx-auto max-w-4xl px-0 sm:px-4">

                {/* Breadcrumb */}
                <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>
                    <span>›</span>

                    {product.category ? (
                        <Link
                            href={`/CategoryDetails/${product.category}`}
                            className="hover:text-green-700"
                        >
                            {product.categoryNameBn}
                        </Link>
                    ) : (
                        <span>{product.categoryNameBn}</span>
                    )}

                    <span>›</span>
                    <span className="text-gray-800">{product.nameBn}</span>
                </nav>

                {/* Header Card */}
                <div className="mb-5 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
                            {product.image}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-xs text-gray-500">
                                প্রতি {product.unit}
                                {product.categoryNameBn && ` · ${product.categoryNameBn}`}
                            </p>

                            <p className="mt-1 text-xs text-gray-600">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span className={`font-semibold ${dirColor}`}>
                                    {dirText}
                                    {dir !== "flat" &&
                                        product.diff !== null &&
                                        `: ${formatBn(product.diff)} টাকা`}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Today price box */}
                    <div className="shrink-0 rounded-xl border border-gray-200 bg-gray-50 px-6 py-4 text-center">
                        <p className="text-xs text-gray-500">আজকের দাম</p>

                        <p className="mt-1 text-4xl font-bold text-gray-900">
                            {product.today === null ? "—" : formatBn(product.today)}
                        </p>

                        <p className="text-xs text-gray-500">টাকা / {product.unit}</p>

                        <p className={`mt-1 text-xs font-semibold ${dirColor}`}>
                            {dirArrow}{" "}
                            {pct.toLocaleString("bn-BD", { maximumFractionDigits: 1 })}%
                        </p>
                    </div>
                </div>

                {/* Summary */}
                <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                    <h2 className="mb-4 text-base font-bold text-gray-900">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <SummaryCard
                            label="সর্বনিম্ন দাম"
                            value={product.lowest}
                            note={
                                product.lowestMarketName
                                    ? `${product.lowestMarketName}-এ সবচেয়ে কম`
                                    : "সবচেয়ে কম দামের বাজার"
                            }
                            color="text-green-600"
                        />

                        <SummaryCard
                            label="সর্বাধিক দাম"
                            value={product.highest}
                            note={
                                product.highestMarketName
                                    ? `${product.highestMarketName}-এ সবচেয়ে বেশি`
                                    : "সবচেয়ে বেশি দামের বাজার"
                            }
                            color="text-red-600"
                        />

                        <SummaryCard
                            label="গড় দাম"
                            value={product.today}
                            note={`প্রতি ${product.unit} এর হিসাব`}
                            color="text-green-600"
                        />
                    </div>
                </div>

                {/* Market-wise table */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                    <h2 className="mb-4 text-base font-bold text-gray-900">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    {product.markets.length === 0 ? (
                        <p className="py-8 text-center text-sm text-gray-500">
                            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি
                        </p>
                    ) : (
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full min-w-[560px] text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-xs text-gray-500">
                                        <th className="px-4 py-3 text-left font-medium">বাজার</th>
                                        <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                                        <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                                        <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                                        <th className="px-4 py-3 text-right font-medium">গড়</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {product.markets.map((m, i) => (
                                        <tr
                                            key={`${m.name}-${i}`}
                                            className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {m.name}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {m.division}
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-700">
                                                {priceText(m.min)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-700">
                                                {priceText(m.max)}
                                            </td>
                                            <td className="px-4 py-3 text-right font-semibold text-gray-900">
                                                {priceText(m.mid)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default function Page({ params }) {
    return (
        <Suspense fallback={<PageSkeleton />}>
            <ProductContent params={params} />
        </Suspense>
    );
}