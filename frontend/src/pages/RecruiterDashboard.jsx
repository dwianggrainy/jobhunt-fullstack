import { useEffect, useState } from "react";
import { getMyJobs } from "../services/jobService";
import { deleteJob } from "../services/jobService";
import { getApplicants } from "../services/applicationService";
import Badge from "../components/atoms/Badge";
import Button from "../components/atoms/Button";
import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalApplicants: 0,
    reviewedApplicants: 0,
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Apakah kamu yakin ingin menghapus lowongan ini?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteJob(id);

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Gagal menghapus job:", error);
      setError("Gagal menghapus lowongan.");
    }
  };

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await getMyJobs();

        console.log("My jobs:", data);

        setJobs(data.jobs);

        const applicantsData = await Promise.all(data.jobs.map((job) => getApplicants(job.id)));

        const jobsWithApplicants = data.jobs.map((job, index) => ({
          ...job,
          applicantsCount: applicantsData[index].applications.length,
        }));

        setJobs(jobsWithApplicants);

        const allApplications = applicantsData.flatMap((data) => data.applications);

        setStats({
          totalApplicants: allApplications.length,
          reviewedApplicants: allApplications.filter((application) => application.status === "reviewed").length,
        });
      } catch (error) {
        console.error("Gagal mengambil jobs:", error);
        setError("Gagal mengambil lowongan.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  if (loading) {
    return <p>Memuat lowongan...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">DASHBOARD RECRUITER</p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">Selamat datang, {jobs[0]?.company || "Recruiter"}! 👋</h1>

            <p className="mt-2 text-sm text-slate-500">Kelola lowongan pekerjaan dan pelamar kamu.</p>
          </div>

          <Link to="/recruiter/jobs/create">
            <Button>+ Buat Lowongan</Button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Lowongan</p>

            <p className="mt-2 text-3xl font-bold text-blue-600">{jobs.length}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lowongan Aktif</p>

            <p className="mt-2 text-3xl font-bold text-green-600">{jobs.filter((job) => job.is_active).length}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Pelamar</p>

            <p className="mt-2 text-3xl font-bold text-orange-500">{stats.totalApplicants}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Reviewed</p>

            <p className="mt-2 text-3xl font-bold text-purple-500">{stats.reviewedApplicants}</p>
          </div>
        </div>

        {/* Jobs */}
        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Lowongan</p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">Lowongan Terbaru</h2>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-slate-500">Kamu belum memiliki lowongan.</p>

              <Link to="/recruiter/jobs/create">
                <Button className="mt-4">Buat Lowongan</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center justify-between gap-6">
                    {/* Job information */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>

                        <Badge variant={job.is_active ? "success" : "danger"}>{job.is_active ? "Aktif" : "Nonaktif"}</Badge>
                      </div>

                      <p className="mt-2 text-sm font-medium text-slate-600">{job.company}</p>

                      <p className="mt-1 text-sm text-slate-500">{job.location}</p>

                      <p className="mt-3 text-sm font-medium text-slate-500">{job.applicantsCount} pelamar</p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2">
                      <Link to={`/recruiter/jobs/${job.id}/applicants`}>
                        <Button variant="secondary">Pelamar</Button>
                      </Link>

                      <Link to={`/recruiter/jobs/${job.id}/edit`}>
                        <Button variant="secondary">Edit</Button>
                      </Link>

                      <Button variant="danger" onClick={() => handleDelete(job.id)}>
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
