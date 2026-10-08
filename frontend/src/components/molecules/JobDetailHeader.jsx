import CompanyLogo from "../atoms/CompanyLogo";
import Badge from "../atoms/Badge";

function JobDetailHeader({ title, company, location, type }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-5">
        <CompanyLogo name={company} />

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>

          <p className="mt-2 text-sm font-medium text-slate-600 sm:text-base">{company}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <span>📍</span>
              {location}
            </span>

            <Badge>{type}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailHeader;
