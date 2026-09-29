import JobCard from "./components/molecules/JobCard";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-md">
        <JobCard title="Senior Frontend Developer" company="Tech Company" location="Jakarta" type="full-time" salaryMin={7000000} salaryMax={10000000} postedAt="2 hari lalu" onClick={() => console.log("Job diklik")} />
      </div>
    </div>
  );
}

export default App;
