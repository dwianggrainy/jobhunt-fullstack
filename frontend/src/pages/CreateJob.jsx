import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/atoms/Input";
import Select from "../components/atoms/Select";
import Button from "../components/atoms/Button";
import { createJob } from "../services/jobService";

function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    description: "",
    requirements: "",
    salary_min: "",
    salary_max: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await createJob({
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
      });

      console.log("Job berhasil dibuat:", data);

      navigate("/recruiter/dashboard");
    } catch (error) {
      console.error("Gagal membuat job:", error);
      setError("Gagal membuat lowongan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Buat Lowongan</h1>

          <p className="mt-2 text-sm text-slate-500">Tambahkan lowongan pekerjaan baru.</p>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <Input name="title" value={form.title} onChange={handleChange} placeholder="Judul pekerjaan" />

            <Input name="company" value={form.company} onChange={handleChange} placeholder="Nama perusahaan" />

            <Input name="location" value={form.location} onChange={handleChange} placeholder="Lokasi" />

            <Select
              name="type"
              value={form.type}
              onChange={handleChange}
              options={[
                { value: "full-time", label: "Full-time" },
                { value: "part-time", label: "Part-time" },
                { value: "contract", label: "Contract" },
                { value: "internship", label: "Internship" },
              ]}
              placeholder="Pilih tipe pekerjaan"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Deskripsi</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="Deskripsikan pekerjaan..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Persyaratan</label>

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows={6}
                placeholder="Tuliskan persyaratan pekerjaan..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input type="number" name="salary_min" value={form.salary_min} onChange={handleChange} placeholder="Gaji minimum" />

              <Input type="number" name="salary_max" value={form.salary_max} onChange={handleChange} placeholder="Gaji maksimum" />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Menyimpan..." : "Publikasikan Lowongan"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;
