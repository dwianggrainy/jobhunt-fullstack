import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../atoms/Button";

function RecruiterLayout() {
  const { user, handleLogout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-[#061D38] px-7 py-8 text-white">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-blue-500">J</span>obHunt
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-14 space-y-2">
          <NavLink to="/recruiter/dashboard" className={({ isActive }) => `flex items-center rounded-xl px-5 py-4 font-semibold transition ${isActive ? "bg-blue-600 text-white" : "text-slate-200 hover:bg-white/10"}`}>
            Dashboard
          </NavLink>

          <NavLink to="/recruiter/company" className={({ isActive }) => `flex items-center rounded-xl px-5 py-4 font-semibold transition ${isActive ? "bg-blue-600 text-white" : "text-slate-200 hover:bg-white/10"}`}>
            Profil Perusahaan
          </NavLink>
        </nav>

        {/* Recruiter Info */}
        <div className="mt-auto border-t border-white/10 pt-6">
          <p className="font-semibold">{user?.name || "Recruiter"}</p>

          <p className="mt-1 text-sm text-slate-400">Recruiter</p>

          <Button variant="danger" onClick={handleLogout} className="mt-5 w-full">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default RecruiterLayout;
