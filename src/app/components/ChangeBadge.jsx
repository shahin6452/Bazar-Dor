import { formatBn } from "@/lib/format";

const ChangeBadge = ({ change }) => {
    const dir = change?.dir;
    const pct = Math.abs(Number(change?.pct) || 0);

    if (dir === "up") {
        return (
            <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                ▲ {formatBn(pct)}%
            </span>
        );
    }

    if (dir === "down") {
        return (
            <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                ▼ {formatBn(pct)}%
            </span>
        );
    }

    return (
        <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-black">
            — ০.০%
        </span>
    );
};

export default ChangeBadge;