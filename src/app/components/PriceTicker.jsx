const getProducts = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
};

const PriceTicker = async () => {
    const products = await getProducts();

    return (
        <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
            <div className="flex w-max animate-marquee py-3">

                {/* First List */}
                <div className="flex shrink-0 items-center gap-8 pr-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex shrink-0 items-center gap-2 text-sm"
                        >
                            <span>{product.image}</span>

                            <span className="font-medium text-gray-800">
                                {product.nameBn}
                            </span>

                            <span className="text-gray-600 font-semibold">
                                {product.today.toLocaleString('bn-BD')} টাকা/{product.unit}
                            </span>

                            <span
                                className={
                                    product.change.dir === "up"
                                        ? "font-medium text-red-600"
                                        : product.change.dir === "down"
                                            ? "font-medium text-green-600"
                                            : "font-medium text-black"
                                }
                            >
                                {product.change.dir === "up" &&
                                    `▲ ${product.change.pct.toLocaleString('bn-BD')}%`}

                                {product.change.dir === "down" &&
                                    `▼ ${Math.abs(product.change.pct).toLocaleString('bn-BD')}%`}

                                {product.change.dir === "flat" &&
                                    "— ০.০%"}
                            </span>
                        </div>
                    ))}
                </div>


                {/* Second List */}
                <div className="flex shrink-0 items-center gap-8 pr-8">
                    {products.map((product) => (
                        <div
                            key={`copy-${product.id}`}
                            className="flex shrink-0 items-center gap-2 text-sm"
                        >
                            <span>{product.image}</span>

                            <span className="font-medium text-gray-800">
                                {product.nameBn}
                            </span>

                            <span className="text-gray-600 font-semibold">
                                {product.today.toLocaleString('bn-BD')} টাকা/{product.unit}
                            </span>

                            <span
                                className={
                                    product.change.dir === "up"
                                        ? "font-medium text-red-600"
                                        : product.change.dir === "down"
                                            ? "font-medium text-green-600"
                                            : "font-medium text-black"
                                }
                            >
                                {product.change.dir === "up" &&
                                    `▲ ${product.change.pct.toLocaleString('bn-BD')}%`}

                                {product.change.dir === "down" &&
                                    `▼ ${Math.abs(product.change.pct).toLocaleString('bn-BD')}%`}

                                {product.change.dir === "flat" &&
                                    "— ০.০%"}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PriceTicker;