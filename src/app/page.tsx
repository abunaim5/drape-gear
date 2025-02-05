import Banner from "@/components/Banner/Banner";
import Blog from "@/components/Blog/Blog";
import Collection from "@/components/Collection/Collection";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import Support from "@/components/Support/Support";

export default function Home() {
  return (
    <section>
      <Banner />
      <div className="container">
          <Collection />
          <NewArrivals />
          <Blog />
          <Support />
      </div>
    </section>
  );
};
