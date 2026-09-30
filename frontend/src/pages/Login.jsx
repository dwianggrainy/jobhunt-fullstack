import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const data = await login(form);

      localStorage.setItem("token", data.token);
      setUser(data.user);

      console.log("Login berhasil:", data);

      if (data.user.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login gagal:", error);
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
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">Job Board</p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-white">Temukan peluang baru untuk kariermu.</h2>

              <p className="mt-5 text-base leading-7 text-slate-300">Cari pekerjaan yang sesuai dengan kemampuanmu dan mulai langkah baru bersama JobHunt.</p>
            </div>
          </div>

          <p className="text-sm text-slate-500">© 2026 JobHunt</p>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <h1 className="text-2xl font-bold text-[#031B36]">
                <span className="text-blue-600">J</span>obHunt
              </h1>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Welcome Back</p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Masuk ke JobHunt</h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">Masuk untuk melanjutkan ke akunmu.</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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

                <Button type="submit" className="w-full bg-blue-600 py-2.5 hover:bg-blue-500">
                  Masuk
                </Button>
              </form>
            </div>

            <p className="mt-5 text-center text-sm text-slate-500">
              Belum punya akun?{" "}
              <button type="button" onClick={() => navigate("/register")} className="font-semibold text-blue-600 transition hover:text-blue-700">
                Daftar sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
