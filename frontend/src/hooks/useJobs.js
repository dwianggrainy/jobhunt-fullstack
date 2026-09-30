import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";

function useJobs({ search = "", type = "", location = "", salaryMin = "", salaryMax = "", sort = "", page = 1 }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchJobs = async () => {
        setLoading(true);
        setError("");

        try {
          const data = await getJobs({
            search,
            type,
            location,
            salary_min: salaryMin,
            salary_max: salaryMax,
            sort,
            page,
          });

          setJobs(data.jobs.data);

          setPagination({
            currentPage: data.jobs.current_page,
            lastPage: data.jobs.last_page,
            total: data.jobs.total,
          });
        } catch (error) {
          console.error("Gagal mengambil data jobs:", error);
          setError("Gagal mengambil lowongan.");
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, type, location, salaryMin, salaryMax, sort, page]);

  return {
    jobs,
    loading,
    error,
    pagination,
  };
}

export default useJobs;
