import { IMAGE_UPLOAD_URL } from "./consts";
import { apiFetch } from "./fetch";

export const postJobPostings = async (jobPosting: object) => {
  return apiFetch("/job-postings", "POST", jobPosting);
};

export const uploadJobPostingImage = async (image: File) => {
  const formData = new FormData();
  const url = `${IMAGE_UPLOAD_URL}/api/v1/uploads/job-postings/stores`;
  formData.append("image", image);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {}
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return response.json();
};
