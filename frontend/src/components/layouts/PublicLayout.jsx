import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
