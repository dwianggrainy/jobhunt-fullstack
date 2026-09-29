import JobMeta from "./JobMeta";
import Badge from "../atoms/Badge";
import CompanyLogo from "../atoms/CompanyLogo";
import BookmarkButton from "../atoms/BookmarkButton";

function JobCard({ title, company, location, type, salaryMin, salaryMax, postedAt, onClick }) {
  return (
    <article onClick={onClick} className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <CompanyLogo name={company} />

          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>

            <p className="mt-1 text-sm text-slate-600">{company}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge>{type}</Badge>

          <BookmarkButton />
        </div>
      </div>
      <JobMeta location={location} />

      <p className="mt-4 text-sm font-medium text-slate-700">
        Rp {salaryMin?.toLocaleString("id-ID")} - Rp {salaryMax?.toLocaleString("id-ID")}
      </p>

      {postedAt && <p className="mt-2 text-xs text-slate-400">{postedAt}</p>}
    </article>
  );
}

export default JobCard;
