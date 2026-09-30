import apiClient from "./apiClient";

export const applyJob = async (jobId, data) => {
  const response = await apiClient.post(`/jobs/${jobId}/apply`, data);

  return response.data;
};
export const getMyApplications = async () => {
  const response = await apiClient.get("/applications/mine");

  return response.data;
};
export const getApplicants = async (jobId) => {
  const response = await apiClient.get(`/jobs/${jobId}/applicants`);

  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await apiClient.patch(`/applications/${id}/status`, {
    status,
  });

  return response.data;
};
