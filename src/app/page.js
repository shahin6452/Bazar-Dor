import Image from "next/image";
import Hero from "./components/Hero";
import AllPRoducts from "./components/Products/AllPRoducts";
import PriceRise from "./components/Products/PriceRise";
import PriceDecrease from "./components/Products/PriceDecrease";

export default async function Home() {

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  const products = await res.json();



  return (
    <div>
      <Hero />
      <PriceRise products={products}/>
      <PriceDecrease products={products}/>
      <AllPRoducts products={products} />
    </div>

  );
}