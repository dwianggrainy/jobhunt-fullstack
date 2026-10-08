import Hero from "../components/organisms/Hero";
import LatestJobs from "../components/organisms/LatestJobs";

function Home() {
  return (
    <div className="min-h-screen bg-slate-100">
      <main>
        <Hero />
        <LatestJobs />
      </main>
    </div>
  );
}

export default Home;
