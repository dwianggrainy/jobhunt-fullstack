import Button from "../atoms/Button";
import Container from "../atoms/Container";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, handleLogout } = useAuth();

  return (
    <nav className="border-b border-slate-800 bg-[#031B36] text-white">
      <Container className="flex items-center justify-between py-3.5">
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          <span className="text-blue-400">J</span>obHunt
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-slate-300 transition hover:text-white">
            Beranda
          </Link>

          <Link to="/jobs" className="text-sm font-medium text-slate-300 transition hover:text-white">
            Lowongan
          </Link>

          {user?.role === "job_seeker" && (
            <Link to="/applications" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Lamaran Saya
            </Link>
          )}

          {user?.role === "recruiter" && (
            <Link to="/recruiter/dashboard" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Dashboard
            </Link>
          )}

          <a href="#" className="text-sm font-medium text-slate-300 transition hover:text-white">
            Perusahaan
          </a>

          <a href="#" className="text-sm font-medium text-slate-300 transition hover:text-white">
            Tentang
          </a>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile" className="text-sm font-medium text-slate-200 transition hover:text-white">
                {user.name}
              </Link>

              <Button onClick={handleLogout} className="bg-blue-600 px-4 py-2 hover:bg-blue-500">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-200 transition hover:text-white">
                Masuk
              </Link>

              <Link to="/register">
                <Button className="bg-blue-600 px-5 py-2 hover:bg-blue-500">Daftar</Button>
              </Link>
            </>
          )}
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
