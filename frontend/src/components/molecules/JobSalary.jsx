function JobSalary({ salaryMin, salaryMax }) {
  return (
    <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Gaji yang ditawarkan</p>

      <p className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        Rp {salaryMin?.toLocaleString("id-ID")} - Rp {salaryMax?.toLocaleString("id-ID")}
      </p>
    </div>
  );
}

export default JobSalary;
