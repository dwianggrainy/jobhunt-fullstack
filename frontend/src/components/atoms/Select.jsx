function Select({ name, value, onChange, options = [], placeholder = "Pilih...", className = "" }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
