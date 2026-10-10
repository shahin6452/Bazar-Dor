import { Suspense } from "react";
import Hero from "./components/Hero";
import AllPRoducts from "./components/Products/AllPRoducts";
import PriceRise from "./components/Products/PriceRise";
import PriceDecrease from "./components/Products/PriceDecrease";
import { getProducts } from "@/lib/api";

async function Products() {
  let products = [];
  try {
    products = await getProducts();
  } catch (err) {
    console.error("পণ্য আনা যায়নি:", err);
  }

  return (
    <>
      <PriceRise products={products} />
      <PriceDecrease products={products} />
      <AllPRoducts products={products} />
    </>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={<p className="py-10 text-center text-gray-500">লোড হচ্ছে...</p>}
      >
        <Products />
      </Suspense>
    </div>
  );
}