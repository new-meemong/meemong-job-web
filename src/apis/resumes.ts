import { PRODUCTION_API } from "./consts";
import { ResumeType } from "@/types/resume-type";
import { apiFetch } from "./fetch";
import { useAuthStore } from "@/stores/auth-store";

export const getResumeById = async (userId: string) => {
  try {
    const defaultParams: Record<string, string> = {
      userId,
    };

    const queryString = new URLSearchParams(defaultParams).toString();
    const url = `/api/v1/resumes?${queryString}`;
    return await apiFetch(url, "GET");
  } catch (e) {
    console.error("[getResumeById] failed", e);
    return { error: e || "Failed to get my resume" };
  }
};

export const getMyResume = async () => {
  try {
    return await apiFetch(`/api/v1/resumes/me`, "GET");
  } catch (e) {
    console.error("[getMyResume] failed", e);
    return { error: e || "Failed to get my resume" };
  }
};
export const getResume = async (id: string) => {
  try {
    return await apiFetch(`/api/v1/resumes/${id}`, "GET");
  } catch (e) {
    console.error("[getResume] failed", e);
    return { error: e || "Failed to fetch resume" };
  }
};

export const getResumes = async (queryParams?: Record<string, string>) => {
  try {
    const defaultParams: Record<string, string> = {};

    const combinedParams = { ...defaultParams, ...(queryParams || {}) };
    const queryString = new URLSearchParams(combinedParams).toString();
    const url = `/api/v1/resumes?${queryString}`;

    return await apiFetch(url, "GET");
  } catch (e) {
    console.error("[getResumes] failed", e);
    return { error: e || "Failed to fetch resumes" };
  }
};

export const postResume = async (resume: ResumeType) => {
  try {
    return await apiFetch("/api/v1/resumes", "POST", resume);
  } catch (e) {
    console.error("[postResume] failed", e);
    return { error: e || "Failed to post resume" };
  }
};

export const putResume = async (id: string, resume: ResumeType) => {
  try {
    return await apiFetch(`/api/v1/resumes/${id}`, "PUT", resume);
  } catch (e) {
    console.error("[putResume] failed", e);
    return { error: e || "Failed to put resume" };
  }
};

export const deleteResume = async (id: string) => {
  try {
    return await apiFetch(`/api/v1/resumes/${id}`, "DELETE");
  } catch (e) {
    console.error("[deleteResume] failed", e);
    return { error: e || "Failed to delete resume" };
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
        Authorization: `${jwt}`,
      },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    return response.json();
  } catch (e) {
    console.error("[uploadResumeProfileImage] Image upload failed:", e);
    return { error: e || "Failed to upload resume profile" };
  }
};

export const postResumeViewCount = async (resumeId: string) => {
  try {
    return await apiFetch(`/api/v1/resumes/${resumeId}/view`, "POST");
  } catch (e) {
    console.error("[postResumeViewCount] failed", e);
    return { error: e || "Failed to post resume view count" };
  }
};
