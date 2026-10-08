function CompanyLogo({ name }) {
  const initial = name?.charAt(0).toUpperCase() || "?";

  return <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-600">{initial}</div>;
}

export default CompanyLogo;
