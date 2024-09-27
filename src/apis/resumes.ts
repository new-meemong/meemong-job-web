import { useAuthStore } from "@/stores/auth-store";

export const uploadResumeProfileImage = async (image: File) => {
  try {
    const jwt = useAuthStore.getState().jwt;

    const formData = new FormData();
    const url = `http://13.125.169.213:80/api/v1/uploads/resumes/profiles`;
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
