import { useAuthStore } from "@/stores/auth-store";
import { apiFetch } from "./fetch";

export const postJobPostings = async (jobPosting: object) => {
  return apiFetch("/job-postings", "POST", jobPosting);
};

export const uploadJobPostingImage = async (image: File) => {
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
  console.log(response);
  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return response.json();
};
