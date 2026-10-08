import { useEffect, useState } from "react";
import { getMyApplications, getApplicants, updateApplicationStatus } from "../services/applicationService";

function useApplications({ jobId = null, mode = "mine" } = {}) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError("");

      try {
        if (mode === "mine") {
          const data = await getMyApplications();
          setApplications(data.applications);
        }

        if (mode === "applicants" && jobId) {
          const data = await getApplicants(jobId);
          setApplications(data.applications);
        }
      } catch (error) {
        console.error("Gagal mengambil data aplikasi:", error);
        setError("Gagal mengambil data lamaran.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId, mode]);

  const updateStatus = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);

      setApplications((prevApplications) => prevApplications.map((application) => (application.id === applicationId ? { ...application, status } : application)));
    } catch (error) {
      console.error("Gagal mengubah status:", error);
      setError("Gagal mengubah status lamaran.");
    }
  };

  return {
    applications,
    loading,
    error,
    updateStatus,
  };
}

export default useApplications;
