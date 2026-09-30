import { useNavigate } from "react-router-dom";
import useApplications from "../hooks/useApplications";
import Badge from "../components/atoms/Badge";

function Applications() {
  const navigate = useNavigate();

  const { applications, loading, error } = useApplications();

  const getStatusVariant = (status) => {
    if (status === "pending") return "warning";
    if (status === "reviewed") return "success";
    if (status === "rejected") return "danger";

    return "default";
  };

  if (loading) {
    return <p>Memuat lamaran...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8 lg:py-10">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div>
          <button type="button" onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600">
            <span className="text-lg">←</span>
            Kembali
          </button>

          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Job Seeker</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Lamaran Saya</h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">Lihat pekerjaan yang sudah kamu lamar dan pantau status lamaranmu.</p>
        </div>

        {/* Applications */}
        {applications.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-600">♡</div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">Belum ada lamaran</h2>

            <p className="mt-2 text-sm text-slate-500">Kamu belum memiliki lamaran pekerjaan saat ini.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-blue-200 hover:shadow-md sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  {/* Job information */}
                  <div className="min-w-0">
                    <div className="flex items-start gap-4">
                      {/* Company logo */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">{application.job?.company?.charAt(0)?.toUpperCase() || "J"}</div>

                      <div className="min-w-0">
                        <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg">{application.job?.title}</h2>

                        <p className="mt-1 text-sm font-medium text-slate-600">{application.job?.company}</p>
                      </div>
                    </div>

                    {/* Job meta */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <span>📍</span>
                        {application.job?.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span>🗓</span>
                        Dilamar {new Date(application.applied_at).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="shrink-0">
                    <Badge variant={getStatusVariant(application.status)}>{application.status}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;
