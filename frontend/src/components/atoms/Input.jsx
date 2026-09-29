function Input({ type = "text", name, value, onChange, placeholder = "", disabled = false, className = "" }) {
  const baseStyle = "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100";

  return <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} className={`${baseStyle} ${className}`} />;
}

export default Input;
