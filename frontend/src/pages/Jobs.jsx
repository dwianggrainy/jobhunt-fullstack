import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import JobCard from "../components/molecules/JobCard";
import SearchBar from "../components/molecules/SearchBar";
import Select from "../components/atoms/Select";
import Input from "../components/atoms/Input";
import useJobs from "../hooks/useJobs";

function Jobs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  const { jobs, loading, error, pagination } = useJobs({
    search,
    type,
    location,
    salaryMin,
    salaryMax,
    sort,
    page,
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Search Header */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <SearchBar
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Filter */}
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Filter</h2>

              {(type || location || salaryMin || salaryMax) && (
                <button
                  type="button"
                  onClick={() => {
                    setType("");
                    setLocation("");
                    setSalaryMin("");
                    setSalaryMax("");
                    setPage(1);
                  }}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Lokasi */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Lokasi</h3>

              <Select
                name="location"
                value={location}
                onChange={(e) => {
                  setPage(1);
                  setLocation(e.target.value);
                }}
                options={[
                  { value: "Jakarta", label: "Jakarta" },
                  { value: "Bandung", label: "Bandung" },
                  { value: "Surabaya", label: "Surabaya" },
                  { value: "Remote", label: "Remote" },
                ]}
                placeholder="Semua Lokasi"
              />
            </div>

            {/* Tipe pekerjaan */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Tipe Pekerjaan</h3>

              <Select
                name="type"
                value={type}
                onChange={(e) => {
                  setPage(1);
                  setType(e.target.value);
                }}
                options={[
                  { value: "full-time", label: "Full-time" },
                  { value: "part-time", label: "Part-time" },
                  { value: "contract", label: "Contract" },
                  { value: "internship", label: "Internship" },
                ]}
                placeholder="Semua Tipe"
              />
            </div>

            {/* Range Gaji */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Range Gaji</h3>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => {
                    setPage(1);
                    setSalaryMin(e.target.value);
                  }}
                  placeholder="Min"
                />

                <Input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => {
                    setPage(1);
                    setSalaryMax(e.target.value);
                  }}
                  placeholder="Max"
                />
              </div>
            </div>
          </aside>

          {/* Job Listing */}
          <main>
            {/* Listing Header */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">{pagination.total} lowongan tersedia</p>

                <h1 className="mt-1 text-xl font-bold text-slate-900">Lowongan Pekerjaan</h1>
              </div>

              <div className="w-full sm:w-48">
                <Select
                  name="sort"
                  value={sort}
                  onChange={(e) => {
                    setPage(1);
                    setSort(e.target.value);
                  }}
                  options={[
                    { value: "newest", label: "Terbaru" },
                    {
                      value: "most_applicants",
                      label: "Paling Banyak Pelamar",
                    },
                  ]}
                  placeholder="Urutkan"
                />
              </div>
            </div>

            {/* Content */}
            {loading ? (
              <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
                <p className="text-sm text-slate-500">Memuat lowongan...</p>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-100 bg-white py-16 text-center">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
                <p className="text-sm font-medium text-slate-700">Tidak ada lowongan yang ditemukan.</p>

                <p className="mt-1 text-xs text-slate-400">Coba ubah kata kunci atau filter pencarian.</p>
              </div>
            ) : (
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
            )}

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ←
              </button>

              <span className="text-sm text-slate-600">
                Halaman <span className="font-semibold text-slate-900">{pagination.currentPage}</span> dari <span className="font-semibold text-slate-900">{pagination.lastPage}</span>
              </span>

              <button
                type="button"
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.lastPage}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
