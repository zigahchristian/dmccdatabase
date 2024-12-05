import { AxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface UploadResponse {
  url: string;
  fileId: string;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to upload image");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to upload image"
      );
    }
    throw error;
  }
}
