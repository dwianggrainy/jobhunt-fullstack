import JobMeta from "./JobMeta";
import Badge from "../atoms/Badge";
import CompanyLogo from "../atoms/CompanyLogo";
import BookmarkButton from "../atoms/BookmarkButton";

function JobCard({ title, company, location, type, salaryMin, salaryMax, postedAt, onClick }) {
  return (
    <article onClick={onClick} className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <CompanyLogo name={company} />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-blue-600">{title}</h3>

            <p className="mt-1 text-xs font-medium text-slate-500">{company}</p>
          </div>
        </div>

        <BookmarkButton />
      </div>

      {/* Job info */}
      <div className="mt-4">
        <JobMeta location={location} />

        <div className="mt-3 flex items-center justify-between gap-2">
          <Badge>{type}</Badge>

          {postedAt && <span className="text-[11px] text-slate-400">{postedAt}</span>}
        </div>
      </div>

      {/* Salary */}
      <div className="mt-4 border-t border-slate-100 pt-3">
        <p className="text-xs font-semibold text-slate-700">
          Rp {salaryMin?.toLocaleString("id-ID")} - Rp {salaryMax?.toLocaleString("id-ID")}
        </p>
      </div>
    </article>
  );
}

export default JobCard;
