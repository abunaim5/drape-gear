import Banner from "@/components/Banner/Banner";
import Collections from "@/components/Collections/Collections";

export default function Home() {
  return (
    <section>
      <Banner />
      <div className="container">
          <Collections />
      </div>
    </section>
  );
};
