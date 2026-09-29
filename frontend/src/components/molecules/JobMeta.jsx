function JobMeta({ location, type, workMode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
      <span>{location}</span>

      <span>{type}</span>

      {workMode && <span>{workMode}</span>}
    </div>
  );
}

export default JobMeta;
