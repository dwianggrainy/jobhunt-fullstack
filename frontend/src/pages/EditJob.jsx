import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import Input from "../components/atoms/Input";
import Select from "../components/atoms/Select";
import Button from "../components/atoms/Button";

function EditJob() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        const job = data.job;

        setForm({
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          description: job.description,
          requirements: job.requirements || "",
          salary_min: job.salary_min || "",
          salary_max: job.salary_max || "",
        });
      } catch (error) {
        console.error("Gagal mengambil job:", error);
        setError("Gagal mengambil data lowongan.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      await updateJob(id, {
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
      });

      navigate("/recruiter/dashboard");
    } catch (error) {
      console.error("Gagal update job:", error);
      setError("Gagal memperbarui lowongan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Memuat data lowongan...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Edit Lowongan</h1>

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
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Deskripsi</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
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
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input type="number" name="salary_min" value={form.salary_min} onChange={handleChange} placeholder="Gaji minimum" />

              <Input type="number" name="salary_max" value={form.salary_max} onChange={handleChange} placeholder="Gaji maksimum" />
            </div>

            <Button type="submit" disabled={saving} className="w-full">
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditJob;
