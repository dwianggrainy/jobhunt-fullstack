import { useAuth } from "../context/AuthContext";
import CompanyLogo from "../components/atoms/CompanyLogo";
import Button from "../components/atoms/Button";

function CompanyProfile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-8 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Company</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Profil Perusahaan</h1>

          <p className="mt-2 text-sm text-slate-500">Kelola informasi perusahaan kamu.</p>
        </div>

        {/* Company Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-8">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <CompanyLogo name="JobHunt Tech" />

                <div>
                  <h2 className="text-xl font-bold text-slate-900">JobHunt Tech</h2>

                  <p className="mt-1 text-sm text-slate-500">Informasi perusahaan</p>
                </div>
              </div>

              <Button variant="secondary">Edit Profil</Button>
            </div>
          </div>

          {/* Information */}
          <div className="grid gap-6 p-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Nama Perusahaan</p>

              <p className="mt-2 text-sm font-medium text-slate-800">JobHunt Tech</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Recruiter</p>

              <p className="mt-2 text-sm font-medium text-slate-800">{user?.name || "-"}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>

              <p className="mt-2 text-sm font-medium text-slate-800">{user?.email || "-"}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Role</p>

              <p className="mt-2 text-sm font-medium capitalize text-slate-800">{user?.role?.replace("_", " ") || "-"}</p>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm text-blue-700">Informasi perusahaan dapat dilengkapi lebih lanjut pada tahap pengembangan berikutnya.</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
