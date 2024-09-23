import { apiFetch } from "./fetch";

export const postJobPostings = async (jobPosting: object) => {
  return apiFetch("/job-postings", "POST", jobPosting);
};

export const uploadJobPostingImage = async (image: File) => {
  const formData = new FormData();
  const url = `http://13.125.169.213:80/api/v1/uploads/job-postings/stores`;
  formData.append("image", image);

  const request = new Request(url, {
    method: "POST",
    body: formData,
    headers: {
      // Authorization: `jwt ${TEST_JWT}`
    }
  });

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      // Authorization: `jwt ${TEST_JWT}`
    }
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return response.json();
};
