function PopularSearches() {
  const searches = ["Frontend Developer", "UI/UX Designer", "Product Manager", "Data Analyst", "Marketing"];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-sm text-slate-500">Pencarian populer:</span>

      {searches.map((search) => (
        <button key={search} type="button" className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">
          {search}
        </button>
      ))}
    </div>
  );
}

export default PopularSearches;
