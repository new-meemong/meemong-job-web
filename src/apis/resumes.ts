import { useAuthStore } from "@/stores/auth-store";
import { apiFetch } from "./fetch";
import { ResumeType } from "@/types/resume-type";
import { PRODUCTION_API } from "./consts";

export const getResumes = async (queryParams?: Record<string, string>) => {
  try {
    const defaultParams: Record<string, string> = {};

    const combinedParams = { ...defaultParams, ...(queryParams || {}) };
    const queryString = new URLSearchParams(combinedParams).toString();
    const url = `/api/v1/resumes?${queryString}`;

    return await apiFetch(url, "GET");
  } catch (e) {
    console.error("[getResumes] failed", e);
  }
};

export const postResume = async (resume: ResumeType) => {
  try {
    return await apiFetch("/api/v1/resumes", "POST", resume);
  } catch (e) {
    console.error("[postResume] failed", e);
  }
};

export const putResume = async (id: string, resume: ResumeType) => {
  try {
    return await apiFetch(`/api/v1/resumes/${id}`, "PUT", resume);
  } catch (e) {
    console.error("[putResume] failed", e);
  }
};

export const deleteResume = async (id: string) => {
  try {
    return await apiFetch(`/api/v1/resumes/${id}`, "DELETE");
  } catch (e) {
    console.error("[deleteResume] failed", e);
  }
};

export const uploadResumeProfileImage = async (image: File) => {
  try {
    const jwt = useAuthStore.getState().jwt;

    const formData = new FormData();
    const url = `${PRODUCTION_API}/api/v1/uploads/resumes/profiles`;
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
    console.error("[uploadResumeProfileImage] Image upload failed:", e);
  }
};
