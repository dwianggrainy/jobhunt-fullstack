import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobById } from "../services/jobService";
import JobDetailHeader from "../components/molecules/JobDetailHeader";
import JobSalary from "../components/molecules/JobSalary";
import JobSection from "../components/molecules/JobSection";
import ApplyForm from "../components/molecules/ApplyForm";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);

        console.log("Job detail:", data);

        setJob(data.job);
      } catch (error) {
        console.error("Gagal mengambil detail job:", error);
      }
    };

    fetchJob();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8 lg:py-10">
      {job && (
        <div className="mx-auto max-w-5xl px-6">
          {/* Back */}
          <button type="button" onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600">
            <span className="text-lg">←</span>
            Kembali
          </button>

          {/* Job Header */}
          <JobDetailHeader title={job.title} company={job.company} location={job.location} type={job.type} />

          {/* Salary */}
          <JobSalary salaryMin={job.salary_min} salaryMax={job.salary_max} />

          {/* Main Content */}
          <div className="mt-5 space-y-5">
            <JobSection title="Deskripsi">
              <p>{job.description}</p>
            </JobSection>

            <JobSection title="Persyaratan">
              <p>{job.requirements}</p>
            </JobSection>

            {/* Apply */}
            <ApplyForm jobId={job.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetail;
