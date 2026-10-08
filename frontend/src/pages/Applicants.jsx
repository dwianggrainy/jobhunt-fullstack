import { useParams } from "react-router-dom";
import Badge from "../components/atoms/Badge";
import Select from "../components/atoms/Select";
import useApplications from "../hooks/useApplications";

function Applicants() {
  const { id } = useParams();

  const { applications, loading, error, updateStatus } = useApplications({
    jobId: id,
    mode: "applicants",
  });

  const getStatusVariant = (status) => {
    if (status === "pending") return "warning";
    if (status === "reviewed") return "success";
    if (status === "rejected") return "danger";

    return "default";
  };

  if (loading) {
    return <p>Memuat pelamar...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-2xl font-bold text-slate-900">Pelamar</h1>

        <p className="mt-2 text-sm text-slate-500">Lihat dan kelola pelamar untuk lowongan ini.</p>

        {applications.length === 0 ? (
          <div className="mt-8 rounded-xl bg-white p-8 text-center">
            <p className="text-slate-500">Belum ada pelamar.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {applications.map((applicant) => (
              <div key={applicant.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{applicant.applicant?.name}</h2>

                    <p className="mt-1 text-sm text-slate-600">{applicant.applicant?.email}</p>
                  </div>

                  <Badge variant={getStatusVariant(applicant.status)}>{applicant.status}</Badge>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-700">Cover Letter</p>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{applicant.cover_letter || "Tidak ada cover letter."}</p>
                </div>

                <div className="mt-5 max-w-xs">
                  <Select
                    value={applicant.status}
                    onChange={(event) => updateStatus(applicant.id, event.target.value)}
                    options={[
                      {
                        value: "pending",
                        label: "Pending",
                      },
                      {
                        value: "reviewed",
                        label: "Reviewed",
                      },
                      {
                        value: "rejected",
                        label: "Rejected",
                      },
                    ]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;
