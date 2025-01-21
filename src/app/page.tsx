import Banner from "@/components/Banner/Banner";
import Collections from "@/components/Collections/Collections";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import Support from "@/components/Support/Support";

export default function Home() {
  return (
    <section>
      <Banner />
      <div className="container">
          <Collections />
          <NewArrivals />
          <Support />
      </div>
    </section>
  );
};
