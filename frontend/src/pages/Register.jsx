import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/atoms/Input";
import Select from "../components/atoms/Select";
import Button from "../components/atoms/Button";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "job_seeker",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await register(form);

      localStorage.setItem("token", data.token);
      setUser(data.user);

      console.log("Register berhasil:", data);

      navigate("/");
    } catch (error) {
      console.error("Register gagal:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Branding */}
        <div className="hidden bg-[#031B36] lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div>
            <h1 className="text-2xl font-bold text-white">
              <span className="text-blue-400">J</span>obHunt
            </h1>

            <div className="mt-24 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">Start Your Journey</p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-white">Bangun langkah baru untuk kariermu.</h2>

              <p className="mt-5 text-base leading-7 text-slate-300">Buat akun JobHunt dan temukan peluang kerja yang sesuai dengan tujuan kariermu.</p>
            </div>
          </div>

          <p className="text-sm text-slate-500">© 2026 JobHunt</p>
        </div>

        {/* Register Form */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <h1 className="text-2xl font-bold text-[#031B36]">
                <span className="text-blue-600">J</span>obHunt
              </h1>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Get Started</p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Buat Akun</h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">Daftar untuk mulai menggunakan JobHunt.</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                    Nama Lengkap
                  </label>

                  <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Masukkan nama lengkap" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <Input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Masukkan email" />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <Input id="password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Masukkan password" />
                </div>

                <div>
                  <label htmlFor="role" className="mb-2 block text-sm font-semibold text-slate-700">
                    Daftar Sebagai
                  </label>

                  <Select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    options={[
                      {
                        value: "job_seeker",
                        label: "Job Seeker",
                      },
                      {
                        value: "recruiter",
                        label: "Recruiter",
                      },
                    ]}
                    placeholder="Pilih role"
                  />
                </div>

                <Button type="submit" className="mt-2 w-full bg-blue-600 py-2.5 hover:bg-blue-500">
                  Daftar
                </Button>
              </form>
            </div>

            <p className="mt-5 text-center text-sm text-slate-500">
              Sudah punya akun?{" "}
              <button type="button" onClick={() => navigate("/login")} className="font-semibold text-blue-600 transition hover:text-blue-700">
                Masuk sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
