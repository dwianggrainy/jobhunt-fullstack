import apiClient from "./apiClient";

export const getJobs = async (params = {}) => {
  const response = await apiClient.get("/jobs", {
    params,
  });

  return response.data;
};
export const getJobById = async (id) => {
  const response = await apiClient.get(`/jobs/${id}`);

  return response.data;
};
export const getMyJobs = async () => {
  const response = await apiClient.get("/jobs/mine");

  return response.data;
};
export const createJob = async (data) => {
  const response = await apiClient.post("/jobs", data);

  return response.data;
};
export const updateJob = async (id, data) => {
  const response = await apiClient.put(`/jobs/${id}`, data);

  return response.data;
};

export const deleteJob = async (id) => {
  const response = await apiClient.delete(`/jobs/${id}`);

  return response.data;
};
