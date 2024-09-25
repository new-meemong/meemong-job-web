import { useAuthStore } from "@/stores/auth-store";
import { apiFetch } from "./fetch";
import { JobPostingType } from "@/types/job-posting-type";

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
  }
};

export const postJobPostings = async (jobPosting: JobPostingType) => {
  try {
    return await apiFetch("/api/v1/job-postings", "POST", jobPosting);
  } catch (e) {
    console.error("[postJobPostings] failed", e);
  }
};

export const putJobPostings = async (
  id: string,
  jobPosting: JobPostingType
) => {
  try {
    return await apiFetch(`/api/v1/job-postings/${id}`, "PUT", jobPosting);
  } catch (e) {
    console.error("[putJobPosting] failed", e);
  }
};

export const deleteJobPostings = async (id: string) => {
  try {
    return await apiFetch(`/api/v1/job-postings/${id}`, "DELETE");
  } catch (e) {
    console.error("[deleteJobPostings] failed", e);
  }
};

export const uploadJobPostingImage = async (image: File) => {
  try {
    const jwt = useAuthStore.getState().jwt;

    const formData = new FormData();
    const url = `http://13.125.169.213:80/api/v1/uploads/job-postings/stores`;
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
  }
};
