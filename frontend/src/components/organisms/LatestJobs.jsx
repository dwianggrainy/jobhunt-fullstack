import Container from "../atoms/Container";
import JobCard from "../molecules/JobCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../services/jobService";
import { formatDate } from "../../utils/formatDate";

function LatestJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();

        console.log("Response jobs:", data);

        setJobs(data.jobs.data);
      } catch (error) {
        console.error("Gagal mengambil data jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-[#F5F7FA] py-10 lg:py-12">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Peluang terbaru</p>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 lg:text-2xl">Lowongan Terbaru</h2>
          </div>

          <button type="button" className="text-sm font-semibold text-blue-600 transition hover:text-blue-700">
            Lihat Semua →
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.type}
              salaryMin={job.salary_min}
              salaryMax={job.salary_max}
              postedAt={formatDate(job.created_at)}
              onClick={() => navigate(`/jobs/${job.id}`)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default LatestJobs;
