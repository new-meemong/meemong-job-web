import { useAuthStore } from "@/stores/auth-store";
import { apiFetch } from "./fetch";
import { JobPostingType } from "@/types/job-posting-type";
import { PRODUCTION_API } from "./consts";

export const getJobPosting = async (id: string) => {
  try {
    const defaultParams: Record<string, string> = {
      __include: "JobPostingsStoreImages"
    };
    const queryString = new URLSearchParams(defaultParams).toString();
    return await apiFetch(`/api/v1/job-postings/${id}?${queryString}`, "GET");
  } catch (e) {
    console.error("[getJobPosting] failed", e);
    return { error: e || "Failed to get job posting" };
  }
};

export const getJobPostings = async (queryParams?: Record<string, string>) => {
  try {
    const defaultParams: Record<string, string> = {
      __include: "JobPostingsStoreImages"
    };

    const combinedParams = { ...defaultParams, ...(queryParams || {}) };
    const queryString = new URLSearchParams(combinedParams).toString();
    const url = `/api/v1/job-postings?${queryString}`;

    return await apiFetch(url, "GET");
  } catch (e) {
    console.error("[getJobPostings] failed", e);
    return { error: e || "Failed to fetch job postings" };
  }
};

export const postJobPosting = async (jobPosting: JobPostingType) => {
  try {
    return await apiFetch("/api/v1/job-postings", "POST", jobPosting);
  } catch (e) {
    console.error("[postJobPosting] failed", e);
    return { error: e || "Failed to post job posting" };
  }
};

export const putJobPosting = async (id: string, jobPosting: JobPostingType) => {
  try {
    return await apiFetch(`/api/v1/job-postings/${id}`, "PUT", jobPosting);
  } catch (e) {
    console.error("[putJobPosting] failed", e);
    return { error: e || "Failed to put job posting" };
  }
};

export const deleteJobPosting = async (id: string) => {
  try {
    return await apiFetch(`/api/v1/job-postings/${id}`, "DELETE");
  } catch (e) {
    console.error("[deleteJobPosting] failed", e);
    return { error: e || "Failed to delete job posting" };
  }
};

export const uploadJobPostingImage = async (image: File) => {
  try {
    const jwt = useAuthStore.getState().jwt;

    const formData = new FormData();
    const url = `${PRODUCTION_API}/api/v1/uploads/job-postings/stores`;
    formData.append("image", image);

    const request = new Request(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `${jwt}`
      }
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    return response.json();
  } catch (e) {
    console.error("[uploadJobPostingImage] Image upload failed:", e);
    return { error: e || "Failed to upload image" };
  }
};
