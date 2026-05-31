import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";
import { listCountries } from "@/lib/data";
import { TravelerClient } from "@/app/traveler/TravelerClient";

export default async function TravelerPage() {
  const countries = await listCountries();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 pb-24 md:pb-10">
        <h1 className="text-4xl font-black md:text-6xl">Traveler Mode</h1>
        <p className="mt-4 max-w-3xl text-muted">
          Compare your home country with your destination and see broadcaster
          options available where you are watching.
        </p>
        <div className="mt-8">
          <TravelerClient countries={countries} />
        </div>
      </main>
      <MobileNav />
    </>
  );
}
