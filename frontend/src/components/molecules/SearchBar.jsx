import Input from "../atoms/Input";
import Button from "../atoms/Button";

function SearchBar({ value, onChange, onSearch, placeholder = "Cari pekerjaan atau perusahaan..." }) {
  return (
    <div className="flex w-full gap-2">
      <Input value={value} onChange={onChange} placeholder={placeholder} className="flex-1" />

      <Button onClick={onSearch}>Cari</Button>
    </div>
  );
}

export default SearchBar;
